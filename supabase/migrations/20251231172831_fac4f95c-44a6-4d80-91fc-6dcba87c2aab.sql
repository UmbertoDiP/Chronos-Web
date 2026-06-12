-- Create enum for request status
CREATE TYPE public.hr_request_status AS ENUM ('pending', 'approved', 'denied');

-- Create table for HR access requests
CREATE TABLE public.hr_access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_id UUID NOT NULL REFERENCES public.published_cvs(id) ON DELETE CASCADE,
  cv_owner_id UUID NOT NULL,
  hr_user_id UUID NOT NULL,
  hr_email TEXT NOT NULL,
  hr_name TEXT,
  message TEXT,
  status hr_request_status NOT NULL DEFAULT 'pending',
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(cv_id, hr_user_id)
);

-- Enable RLS
ALTER TABLE public.hr_access_requests ENABLE ROW LEVEL SECURITY;

-- CV owners can view requests for their CVs
CREATE POLICY "CV owners can view requests for their CVs"
ON public.hr_access_requests
FOR SELECT
USING (auth.uid() = cv_owner_id);

-- CV owners can update (approve/deny) requests for their CVs
CREATE POLICY "CV owners can update requests for their CVs"
ON public.hr_access_requests
FOR UPDATE
USING (auth.uid() = cv_owner_id);

-- HR users can view their own requests
CREATE POLICY "HR can view own requests"
ON public.hr_access_requests
FOR SELECT
USING (auth.uid() = hr_user_id);

-- HR users can create requests (only if CV allows HR copy)
CREATE POLICY "HR can create requests"
ON public.hr_access_requests
FOR INSERT
WITH CHECK (
  auth.uid() = hr_user_id 
  AND EXISTS (
    SELECT 1 FROM public.published_cvs 
    WHERE id = cv_id 
    AND is_public = true 
    AND allow_hr_copy = true
  )
);

-- HR can delete their pending requests
CREATE POLICY "HR can delete own pending requests"
ON public.hr_access_requests
FOR DELETE
USING (auth.uid() = hr_user_id AND status = 'pending');

-- Update trigger for updated_at
CREATE TRIGGER update_hr_access_requests_updated_at
BEFORE UPDATE ON public.hr_access_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster queries
CREATE INDEX idx_hr_access_requests_cv_owner ON public.hr_access_requests(cv_owner_id);
CREATE INDEX idx_hr_access_requests_hr_user ON public.hr_access_requests(hr_user_id);
CREATE INDEX idx_hr_access_requests_status ON public.hr_access_requests(status);