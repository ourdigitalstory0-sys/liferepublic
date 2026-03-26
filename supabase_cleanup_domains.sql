-- Cleanup legacy domain references in Supabase
-- Run this in the Supabase SQL Editor to permanently fix broken images

-- Update Banners
UPDATE banners 
SET image_url = REPLACE(image_url, 'https://liferepublic.in/', '/');

-- Update Amenities
UPDATE amenities 
SET image_url = REPLACE(image_url, 'https://liferepublic.in/', '/');

-- Update Projects (Main Image)
UPDATE projects 
SET image = REPLACE(image, 'https://liferepublic.in/', '/');

-- Update Projects (Master Layout)
UPDATE projects 
SET master_layout = REPLACE(master_layout, 'https://liferepublic.in/', '/');

-- Update Projects (Gallery - JSONB Array)
UPDATE projects 
SET gallery = (
  SELECT jsonb_agg(REPLACE(elem, 'https://liferepublic.in/', '/'))
  FROM jsonb_array_elements_text(gallery) AS elem
)
WHERE jsonb_typeof(gallery) = 'array';

-- Update Projects (Floor Plans - JSONB Array)
UPDATE projects 
SET floor_plans = (
  SELECT jsonb_agg(REPLACE(elem, 'https://liferepublic.in/', '/'))
  FROM jsonb_array_elements_text(floor_plans) AS elem
)
WHERE jsonb_typeof(floor_plans) = 'array';
