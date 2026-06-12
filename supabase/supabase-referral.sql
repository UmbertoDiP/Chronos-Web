-- Schema per User Wallets e Referrals (Chronos)

CREATE TABLE public.user_wallets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT,
    referral_code TEXT UNIQUE NOT NULL,
    referral_credits NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referred_email TEXT UNIQUE NOT NULL,
    referred_by_code TEXT NOT NULL REFERENCES public.user_wallets(referral_code),
    converted_to_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.referral_credit_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_id UUID NOT NULL REFERENCES public.user_wallets(id),
    stripe_event_id TEXT UNIQUE NOT NULL,
    amount_euros NUMERIC(10, 2) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Se necessarie)
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own wallet" ON public.user_wallets
    FOR SELECT USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can read own referrals" ON public.referrals
    FOR SELECT USING (
        referred_by_code IN (
            SELECT referral_code FROM public.user_wallets WHERE email = auth.jwt() ->> 'email'
        )
    );

-- RPC per incrementare in modo sicuro i crediti
CREATE OR REPLACE FUNCTION public.increment_referral_credits(wallet_id UUID, amount NUMERIC)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE public.user_wallets
  SET referral_credits = referral_credits + amount,
      updated_at = NOW()
  WHERE id = wallet_id;
$$;
