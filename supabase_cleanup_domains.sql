-- Sovereign Security Protocol v6.0
-- Run this in the Supabase SQL Editor to permanently harden data integrity

-- 1. Asset Domain Synthesis (Replace legacy absolute URLs with relative paths)
-- This ensures zero-latency local caching and PWA authority

-- Update Banners
UPDATE banners SET image_url = REPLACE(image_url, 'https://liferepublic.in/', '/');

-- Update Amenities
UPDATE amenities SET image_url = REPLACE(image_url, 'https://liferepublic.in/', '/');

-- Update Projects (Main Image & Master Layout)
UPDATE projects SET image = REPLACE(image, 'https://liferepublic.in/', '/');
UPDATE projects SET master_layout = REPLACE(master_layout, 'https://liferepublic.in/', '/');

-- Update Projects (Gallery - JSONB Array Synthesis)
UPDATE projects 
SET gallery = (
  SELECT jsonb_agg(REPLACE(elem, 'https://liferepublic.in/', '/'))
  FROM jsonb_array_elements_text(gallery) AS elem
)
WHERE jsonb_typeof(gallery) = 'array';

-- Update Projects (Floor Plans - JSONB Array Synthesis)
UPDATE projects 
SET floor_plans = (
  SELECT jsonb_agg(REPLACE(elem, 'https://liferepublic.in/', '/'))
  FROM jsonb_array_elements_text(floor_plans) AS elem
)
WHERE jsonb_typeof(floor_plans) = 'array';

-- 2. Sovereign Vault Security (Access Control Guidelines)
-- NOTE: Execute these via the Supabase Auth/API settings dashboard
-- WHITELIST DOMAINS:
-- - life-republic.in (Production)
-- - staging.life-republic.in (Staging)
-- - localhost:5173 (Development)

-- 3. Technical Verification
SELECT COUNT(*) as cleaned_records FROM projects WHERE image NOT LIKE 'http%';
