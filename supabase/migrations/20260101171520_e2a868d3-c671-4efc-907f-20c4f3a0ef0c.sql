-- Create function to permanently delete CVs in trash for more than 30 days
CREATE OR REPLACE FUNCTION public.cleanup_old_deleted_cvs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.saved_cvs
  WHERE deleted_at IS NOT NULL
    AND deleted_at < now() - interval '30 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;

-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Schedule the cleanup to run daily at 3 AM UTC
SELECT cron.schedule(
  'cleanup-deleted-cvs-daily',
  '0 3 * * *',
  $$SELECT public.cleanup_old_deleted_cvs()$$
);