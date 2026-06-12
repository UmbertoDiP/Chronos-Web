-- Create enum for subscription tier
CREATE TYPE public.subscription_tier AS ENUM ('free', 'premium');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  tier public.subscription_tier NOT NULL DEFAULT 'free',
  premium_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Create saved CVs table for premium users
CREATE TABLE public.saved_cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_data JSONB NOT NULL,
  name TEXT NOT NULL DEFAULT 'Il mio CV',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_cvs ENABLE ROW LEVEL SECURITY;

-- Saved CVs policies
CREATE POLICY "Users can view own CVs"
ON public.saved_cvs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own CVs"
ON public.saved_cvs FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
ON public.saved_cvs FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
ON public.saved_cvs FOR DELETE
USING (auth.uid() = user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, tier)
  VALUES (new.id, new.email, 'free');
  RETURN new;
END;
$$;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for saved_cvs updated_at
CREATE TRIGGER update_saved_cvs_updated_at
BEFORE UPDATE ON public.saved_cvs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();