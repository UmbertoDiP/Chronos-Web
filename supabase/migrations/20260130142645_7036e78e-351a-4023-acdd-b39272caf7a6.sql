-- Create a table for Pro waitlist email collection
CREATE TABLE public.pro_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'annual')),
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint on email to prevent duplicates
CREATE UNIQUE INDEX idx_pro_waitlist_email ON public.pro_waitlist (email);

-- Enable Row Level Security
ALTER TABLE public.pro_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can join the waitlist"
ON public.pro_waitlist
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read (for admin purposes)
CREATE POLICY "Only admins can view waitlist"
ON public.pro_waitlist
FOR SELECT
USING (false);