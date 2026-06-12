import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { priceId, email, referralCode } = await req.json()
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Logica Referral: se l'utente fornisce un referral_code
    let couponId = undefined;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('referral_code', referralCode)
        .single();
        
      if (referrer) {
        // Applica coupon iniziale a chi acquista
        couponId = Deno.env.get('STRIPE_REFERRAL_COUPON_ID');
        
        // Registra il pending referral
        await supabase.from('referrals').upsert({
          referred_email: email,
          referred_by_code: referralCode,
          converted_to_premium: false
        }, { onConflict: 'referred_email' });
      }
    }

    // Crea Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/canceled`,
      customer_email: email,
      discounts: couponId ? [{ coupon: couponId }] : undefined,
      metadata: {
        referredByCode: referralCode || ''
      }
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
