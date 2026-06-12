-- Add updated_at column to pro_waitlist table

-- Add the column with default value
ALTER TABLE public.pro_waitlist
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before each update
CREATE TRIGGER update_pro_waitlist_updated_at
    BEFORE UPDATE ON public.pro_waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Set updated_at = created_at for existing rows
UPDATE public.pro_waitlist
SET updated_at = created_at
WHERE updated_at IS NULL;
