-- Fix function search_path for generate_cv_slug
CREATE OR REPLACE FUNCTION public.generate_cv_slug()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_slug TEXT;
  slug_exists BOOLEAN;
BEGIN
  LOOP
    new_slug := lower(substr(md5(random()::text), 1, 8));
    SELECT EXISTS(SELECT 1 FROM public.published_cvs WHERE slug = new_slug) INTO slug_exists;
    EXIT WHEN NOT slug_exists;
  END LOOP;
  RETURN new_slug;
END;
$$;