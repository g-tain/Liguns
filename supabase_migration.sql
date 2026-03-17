-- SQL Migration for Phase 37: Talent Application Persistence & Media Upload

-- 1. Create the applicants table
CREATE TABLE IF NOT EXISTS applicants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  height INTEGER NOT NULL,
  whatsapp_number TEXT NOT NULL,
  position TEXT NOT NULL,
  selfie_url TEXT,
  body_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow public to insert applications
CREATE POLICY "Public can insert applications" 
ON applicants FOR INSERT 
WITH CHECK (true);

-- 4. Create Policy: Allow authenticated users (admin) to view all applications
CREATE POLICY "Admins can view all applications" 
ON applicants FOR SELECT 
TO authenticated 
USING (true);

-- 5. Storage Setup (Note: Bucket creation usually done via Dashboard or API)
-- Instruction: Create a public bucket named 'talent-assets' in Supabase Storage.
-- Then apply the following RLS for the bucket:

-- Allow public to upload to talent-assets bucket
-- INSERT into storage.objects
-- Rule: bucket_id = 'talent-assets'
