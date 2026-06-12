-- 1. Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('user', 'hr', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Published CVs table (public CV hosting)
CREATE TABLE public.published_cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cv_data JSONB NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  allow_hr_copy BOOLEAN NOT NULL DEFAULT false,
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.published_cvs ENABLE ROW LEVEL SECURITY;

-- Anyone can view public CVs
CREATE POLICY "Anyone can view public CVs"
ON public.published_cvs
FOR SELECT
USING (is_public = true);

-- Users can manage their own published CVs
CREATE POLICY "Users can manage own published CVs"
ON public.published_cvs
FOR ALL
USING (auth.uid() = user_id);

-- 3. HR cloned CVs table
CREATE TABLE public.hr_cloned_cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hr_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  original_cv_id UUID REFERENCES public.published_cvs(id) ON DELETE SET NULL,
  original_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  cv_data JSONB NOT NULL,
  name TEXT NOT NULL DEFAULT 'CV Candidato',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hr_cloned_cvs ENABLE ROW LEVEL SECURITY;

-- HR users can manage their cloned CVs
CREATE POLICY "HR can manage own cloned CVs"
ON public.hr_cloned_cvs
FOR ALL
USING (auth.uid() = hr_user_id);

-- 4. Function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_cv_slug()
RETURNS TEXT
LANGUAGE plpgsql
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

-- 5. Function to increment view count
CREATE OR REPLACE FUNCTION public.increment_cv_views(cv_slug TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.published_cvs
  SET views_count = views_count + 1
  WHERE slug = cv_slug;
END;
$$;

-- 6. Trigger to auto-assign 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_role();

-- 7. Update triggers for updated_at
CREATE TRIGGER update_published_cvs_updated_at
  BEFORE UPDATE ON public.published_cvs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hr_cloned_cvs_updated_at
  BEFORE UPDATE ON public.hr_cloned_cvs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Enable realtime for published_cvs
ALTER PUBLICATION supabase_realtime ADD TABLE public.published_cvs;