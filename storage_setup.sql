-- Storage Setup Script
-- Run this in your Supabase SQL Editor

-- 1. Create the 'projects' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop existing policies to avoid conflicts (optional but safer)
DROP POLICY IF EXISTS "projects_public_select" ON storage.objects;
DROP POLICY IF EXISTS "projects_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "projects_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "projects_auth_delete" ON storage.objects;

-- 3. Create Policy: Allow public read access (SELECT)
CREATE POLICY "projects_public_select"
ON storage.objects FOR SELECT
USING ( bucket_id = 'projects' );

-- 4. Create Policy: Allow authenticated users to upload (INSERT)
CREATE POLICY "projects_auth_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'projects' );

-- 5. Create Policy: Allow authenticated users to update (UPDATE)
CREATE POLICY "projects_auth_update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'projects' );

-- 6. Create Policy: Allow authenticated users to delete (DELETE)
CREATE POLICY "projects_auth_delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'projects' );
