-- Create storage bucket for CV profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-photos', 'cv-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their own photos
CREATE POLICY "Users can upload own photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'cv-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to update their own photos
CREATE POLICY "Users can update own photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'cv-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own photos
CREATE POLICY "Users can delete own photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'cv-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to photos (for CV display)
CREATE POLICY "Public can view cv photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'cv-photos');