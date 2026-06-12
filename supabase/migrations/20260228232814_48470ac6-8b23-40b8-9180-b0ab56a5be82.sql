-- Fix permissive RLS policy on pro_waitlist
DROP POLICY "Anyone can join the waitlist" ON public.pro_waitlist;

CREATE POLICY "Anyone can join the waitlist with valid data"
ON public.pro_waitlist
FOR INSERT
WITH CHECK (
  email IS NOT NULL 
  AND email ~ '^[^@]+@[^@]+\.[^@]+$'
  AND plan_type IN ('starter', 'pro', 'team')
  AND length(email) <= 320
);

-- Fix admin SELECT policy on pro_waitlist (currently uses false, should use has_role)
DROP POLICY "Only admins can view waitlist" ON public.pro_waitlist;

CREATE POLICY "Only admins can view waitlist"
ON public.pro_waitlist
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));