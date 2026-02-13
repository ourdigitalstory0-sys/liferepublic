
-- SQL Migration Script to Update Project Slugs (Run in Supabase SQL Editor)

-- Disable the foreign key constraint on leads momentarily OR update leads first if cascade is not set.
-- Safest approach: Update leads to new ID, then update project ID.

BEGIN;

-- 1. Update 'Duet'
-- Create new record or update? Since ID is PK, we can't just UPDATE if there are dependent leads without Cascade.
-- Let's try to UPDATE the Project ID directly. If it fails due to FK, we'll know.
-- Assuming standard setup, we might need to handle leads.

-- Strategy:
-- A. Insert new record with NEW ID (copying data from OLD ID)
-- B. Update leads to point to NEW ID
-- C. Delete OLD ID

-- 1. Duet
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'duet';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi' WHERE project_id = 'duet';

DELETE FROM public.projects WHERE id = 'duet';


-- 2. Arezo
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'arezo';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi' WHERE project_id = 'arezo';

DELETE FROM public.projects WHERE id = 'arezo';


-- 3. Canvas
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'canvas';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi' WHERE project_id = 'canvas';

DELETE FROM public.projects WHERE id = 'canvas';


-- 4. Atmos
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'atmos';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi' WHERE project_id = 'atmos';

DELETE FROM public.projects WHERE id = 'atmos';


-- 5. 24K Espada
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = '24k-espada';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi' WHERE project_id = '24k-espada';

DELETE FROM public.projects WHERE id = '24k-espada';


-- 6. Sound of Soul
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'sound-of-soul';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi' WHERE project_id = 'sound-of-soul';

DELETE FROM public.projects WHERE id = 'sound-of-soul';


-- 7. Aros
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'aros';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi' WHERE project_id = 'aros';

DELETE FROM public.projects WHERE id = 'aros';


-- 8. Qrious
INSERT INTO public.projects (id, title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color)
SELECT 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi', title, category, location, price, status, image, description, overview, features, amenities, master_layout, floor_plans, gallery, theme_color
FROM public.projects WHERE id = 'qrious';

UPDATE public.leads SET project_id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi' WHERE project_id = 'qrious';

DELETE FROM public.projects WHERE id = 'qrious';


-- 9. Update Titles to match exact keywords if needed (Optional, but good for consistency)
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Duet' WHERE id = 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Qrious' WHERE id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Canvas' WHERE id = 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Atmos' WHERE id = 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Aros' WHERE id = 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township 24K Espada' WHERE id = 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Sound of Soul' WHERE id = 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi';
UPDATE public.projects SET title = 'Kolte Patil Life Republic Township Arezo' WHERE id = 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi';

COMMIT;
