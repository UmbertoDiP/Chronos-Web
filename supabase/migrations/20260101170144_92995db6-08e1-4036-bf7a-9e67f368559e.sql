-- Add soft delete support for saved_cvs table
ALTER TABLE public.saved_cvs 
ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create index for efficient filtering of non-deleted CVs
CREATE INDEX idx_saved_cvs_deleted_at ON public.saved_cvs(deleted_at) WHERE deleted_at IS NULL;

-- Update RLS policies to filter out soft-deleted CVs by default
DROP POLICY IF EXISTS "Users can view own CVs" ON public.saved_cvs;
CREATE POLICY "Users can view own non-deleted CVs" 
ON public.saved_cvs 
FOR SELECT 
USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Policy for viewing deleted CVs (for restore functionality)
CREATE POLICY "Users can view own deleted CVs" 
ON public.saved_cvs 
FOR SELECT 
USING (auth.uid() = user_id AND deleted_at IS NOT NULL);

-- Update delete policy to allow soft delete (UPDATE to set deleted_at)
DROP POLICY IF EXISTS "Users can delete own CVs" ON public.saved_cvs;
CREATE POLICY "Users can soft delete own CVs" 
ON public.saved_cvs 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Keep insert policy as is
-- Users can still hard delete if needed (for GDPR compliance)
CREATE POLICY "Users can hard delete own CVs" 
ON public.saved_cvs 
FOR DELETE 
USING (auth.uid() = user_id);