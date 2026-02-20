-- Synchronize all project images from local data

-- Updating Kolte Patil Life Republic Township Duet
UPDATE public.projects
SET
  image = '/images/project/banner/1747221516duat%20main%20banner.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '["/images/project/gallery/1747221661duet%20interior%201.jpg","/images/project/gallery/1747221668duet%20interior%202.jpg","/images/project/gallery/1747221674duet%20interior%203.jpg"]'::jsonb
WHERE id = 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Qrious
UPDATE public.projects
SET
  image = '/images/home/qrious-thumb.webp',
  master_layout = '/images/gallery/qrious/master-layout.webp',
  floor_plans = '["/images/gallery/qrious/2bhk-plan.webp","/images/gallery/qrious/3bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';

-- Updating Kolte Patil Life Republic Township Canvas
UPDATE public.projects
SET
  image = '/images/home/canvas-thumb.webp',
  master_layout = '/images/gallery/canvas/master-layout.webp',
  floor_plans = '["/images/gallery/canvas/3bhk-plan.webp","/images/gallery/canvas/4bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Atmos
UPDATE public.projects
SET
  image = '/images/home/atmos-thumb.webp',
  master_layout = '/images/gallery/atmos/master-layout.webp',
  floor_plans = '["/images/gallery/atmos/2bhk-plan.webp","/images/gallery/atmos/3bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Aros
UPDATE public.projects
SET
  image = '/images/home/aros-thumb.webp',
  master_layout = '/images/gallery/aros/master-layout.webp',
  floor_plans = '["/images/gallery/aros/2bhk-plan.webp","/images/gallery/aros/3bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township 24K Espada
UPDATE public.projects
SET
  image = '/images/home/24k-espada-thumb.webp',
  master_layout = '/images/gallery/24k-espada/master-layout.webp',
  floor_plans = '["/images/gallery/24k-espada/4bhk-plan.webp","/images/gallery/24k-espada/5bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi';

-- Updating Kolte Patil Life Republic Township Sound of Soul
UPDATE public.projects
SET
  image = '/images/home/sound-of-soul-thumb.webp',
  master_layout = '/images/gallery/sound-of-soul/master-layout.webp',
  floor_plans = '["/images/gallery/sound-of-soul/4bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi';

-- Updating Kolte Patil Life Republic Township Arezo
UPDATE public.projects
SET
  image = '/images/home/arezo-thumb.webp',
  master_layout = '/images/gallery/arezo/master-layout.webp',
  floor_plans = '["/images/gallery/arezo/2bhk-plan.webp"]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Universe
UPDATE public.projects
SET
  image = '/images/slider/1.webp',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Bungalows
UPDATE public.projects
SET
  image = '/images/home/sound-of-soul-thumb.webp',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-bungalows-hinjewadi';

-- Updating Kolte Patil Life Republic Township Villas
UPDATE public.projects
SET
  image = '/images/home/24k-espada-thumb.webp',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb
WHERE id = 'kolte-patil-life-republic-villas-hinjewadi';

