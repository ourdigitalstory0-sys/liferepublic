-- SUPER-HARDENED RLS POLICIES FOR LIFE REPUBLIC PRODUCTION

-- 1. Leads Table: Public can only INSERT, Admins can do everything
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads" ON public.leads
    FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;
CREATE POLICY "Admins can manage leads" ON public.leads
    FOR ALL 
    USING (auth.role() = 'authenticated');

-- 2. Projects Table: Public can only SELECT, Admins can manage
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects
    FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
CREATE POLICY "Admins can manage projects" ON public.projects
    FOR ALL 
    USING (auth.role() = 'authenticated');

-- 3. Banners Table: Public can only SELECT, Admins can manage
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view banners" ON public.banners;
CREATE POLICY "Public can view banners" ON public.banners
    FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Admins can manage banners" ON public.banners;
CREATE POLICY "Admins can manage banners" ON public.banners
    FOR ALL 
    USING (auth.role() = 'authenticated');

-- 4. Amenities Table: Public can only SELECT, Admins can manage
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view amenities" ON public.amenities;
CREATE POLICY "Public can view amenities" ON public.amenities
    FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Admins can manage amenities" ON public.amenities;
CREATE POLICY "Admins can manage amenities" ON public.amenities
    FOR ALL 
    USING (auth.role() = 'authenticated');

-- 5. Storage Buckets (Projects/Banners)
-- Assuming Supabase storage policies are handled in the UI, but here's the SQL logic:
-- Policy: Public READ, Auth WRITE
