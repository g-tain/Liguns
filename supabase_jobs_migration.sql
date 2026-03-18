-- SQL Migration for Phase 38: Job Management

-- 1. Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_range TEXT,
  description TEXT,
  qualifications JSONB DEFAULT '[]',
  facilities JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active',
  image_url TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow public to view active jobs
CREATE POLICY "Public can view active jobs" 
ON jobs FOR SELECT 
USING (status = 'active');

-- 4. Create Policy: Allow authenticated users (admin) to manage all jobs
CREATE POLICY "Admins can manage all jobs" 
ON jobs FOR ALL 
TO authenticated 
USING (true);

-- 5. Update applicants status policy/validation if needed
-- (Assuming 'applicants' table already exists from Phase 37)
