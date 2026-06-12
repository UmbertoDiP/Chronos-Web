-- Add size constraint to saved_cvs.cv_data (max 500KB)
ALTER TABLE public.saved_cvs 
ADD CONSTRAINT cv_data_size_limit 
CHECK (octet_length(cv_data::text) < 512000);

-- Add size constraint to published_cvs.cv_data (max 500KB)
ALTER TABLE public.published_cvs 
ADD CONSTRAINT published_cv_data_size_limit 
CHECK (octet_length(cv_data::text) < 512000);

-- Add size constraint to hr_cloned_cvs.cv_data (max 500KB)
ALTER TABLE public.hr_cloned_cvs 
ADD CONSTRAINT hr_cv_data_size_limit 
CHECK (octet_length(cv_data::text) < 512000);

-- Add basic structure validation for saved_cvs (must have personalInfo)
ALTER TABLE public.saved_cvs 
ADD CONSTRAINT cv_data_has_structure 
CHECK (cv_data ? 'personalInfo');

-- Add basic structure validation for published_cvs
ALTER TABLE public.published_cvs 
ADD CONSTRAINT published_cv_data_has_structure 
CHECK (cv_data ? 'personalInfo');

-- Add basic structure validation for hr_cloned_cvs
ALTER TABLE public.hr_cloned_cvs 
ADD CONSTRAINT hr_cv_data_has_structure 
CHECK (cv_data ? 'personalInfo');