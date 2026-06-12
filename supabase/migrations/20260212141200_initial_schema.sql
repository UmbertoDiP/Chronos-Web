-- Initial schema for Folder2Text waitlist

-- Create pro_waitlist table
CREATE TABLE IF NOT EXISTS public.pro_waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'annual')),
    language TEXT,
    privacy_consent BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(email)
);

-- Enable RLS
ALTER TABLE public.pro_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous insert"
    ON public.pro_waitlist
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow service role to read all
CREATE POLICY "Allow service role read"
    ON public.pro_waitlist
    FOR SELECT
    TO service_role
    USING (true);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only service role can manage roles
CREATE POLICY "Service role only"
    ON public.user_roles
    FOR ALL
    TO service_role
    USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pro_waitlist_email ON public.pro_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_pro_waitlist_created_at ON public.pro_waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
