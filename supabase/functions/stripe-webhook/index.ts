import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('No signature', { status: 400 })

  const body = await req.text()
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') as string
    )
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const referredByCode = session.metadata?.referredByCode;

    // Genera wallet per il nuovo utente
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    const cleanEmail = email?.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const newReferralCode = `CHR-${cleanEmail}-${randomStr}`;

    const { data: wallet } = await supabase.from('user_wallets').upsert({
      email: email,
      stripe_customer_id: session.customer as string,
      referral_code: newReferralCode
    }, { onConflict: 'email' }).select().single();

    // Applica Cashback allo sponsor (Referrer)
    if (referredByCode) {
      const { data: referrer } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('referral_code', referredByCode)
        .single();

      if (referrer && referrer.stripe_customer_id) {
        // Marca referral come convertito
        await supabase.from('referrals').update({ converted_to_premium: true })
          .eq('referred_email', email);

        // Calcola rimborso (Es: 1.50 EUR)
        const creditAmount = 1.50; 

        // Registra transazione DB
        await supabase.from('referral_credit_transactions').insert({
          wallet_id: referrer.id,
          stripe_event_id: event.id,
          amount_euros: creditAmount,
          reason: `Referral from ${email}`
        });

        // Aggiorna totali
        await supabase.rpc('increment_referral_credits', {
            wallet_id: referrer.id,
            amount: creditAmount
        });

        // Applica a Stripe Customer Balance
        await stripe.customers.createBalanceTransaction(referrer.stripe_customer_id, {
          amount: -Math.round(creditAmount * 100), // Valore negativo in centesimi applica lo sconto sulla proxima fattura
          currency: 'eur',
          description: `Chronos Referral Reward: ${email}`
        });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})
