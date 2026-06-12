import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
// Usiamo la libreria jose per JWT in Deno
import * as jose from 'https://deno.land/x/jose@v4.14.4/index.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing Authorization header')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verifica utente
    const { data: { user }, error } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (error || !user) throw new Error('Invalid user token')

    // Estrai la Private Key dalle env per firmare il JWT (RS256)
    const privateKeyPem = Deno.env.get('JWT_PRIVATE_KEY_PEM')
    if (!privateKeyPem) throw new Error('Missing private key in env')

    const privateKey = await jose.importPKCS8(privateKeyPem, 'RS256')

    // Crea payload licenza per Chronos
    const jwtPayload = {
      email: user.email,
      tier: 'pro', // In un'app reale leggeremmo il piano da Stripe/Supabase
      iss: 'Chronos-Web',
      sub: user.id
    }

    // Firma il JWT (validità 1 anno, da rinnovare)
    const licenseKey = await new jose.SignJWT(jwtPayload)
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('1y')
      .sign(privateKey)

    return new Response(JSON.stringify({ licenseKey }), {
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
