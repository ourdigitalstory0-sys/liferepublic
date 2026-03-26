-- Synchronize all project images from local data

-- Updating Kolte Patil Life Republic Township Duet
UPDATE public.projects
SET
  image = '/images/project/banner/1747221516duat-main-banner.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '["/images/project/gallery/1747221661duet-interior-1.jpg","/images/project/gallery/1747221668duet-interior-2.jpg","/images/project/gallery/1747221674duet-interior-3.jpg"]'::jsonb,
  amenities = '["Jogging Track","Gymnasium","Swimming Pool","Multi-sports Court","Kid''s Play Zone","BBQ Area","Multipurpose Hall","Reflexology Path"]'::jsonb,
  faqs = '[{"question":"What is the price of 2 BHK in Life Republic Duet?","answer":"The 2 BHK flats in Life Republic Duet start from ₹72 Lakhs*."},{"question":"When is the possession for Life Republic Duet?","answer":"The expected possession for Life Republic Duet is October 2029."}]'::jsonb,
  theme_color = '#C5A059'
WHERE id = 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Qrious
UPDATE public.projects
SET
  image = 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Smart Home Automations","Co-working Space","Fitness Center","Rooftop Lounge","Library","Indoor Games"]'::jsonb,
  faqs = '[{"question":"What are Qrious Smart Homes?","answer":"Qrious at Life Republic offers tech-enabled 2 & 3 BHK smart homes with Planet App integration."},{"question":"Where is Sector R1 located in Life Republic?","answer":"Sector R1 is a centrally located residential zone within the Life Republic township."}]'::jsonb,
  theme_color = '#3498db'
WHERE id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';

-- Updating Kolte Patil Life Republic Township Canvas
UPDATE public.projects
SET
  image = '/images/home/canvas-thumb.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Infinity Pool","Spa & Sauna","Private Theatre","Banquet Hall","Tennis Court","Landscaped Gardens"]'::jsonb,
  faqs = '[{"question":"What is the carpet area for 4 BHK in Canvas?","answer":"Canvas offers expansive 3 & 4 BHK residences. Please contact us for specific carpet area details."},{"question":"Is Kolte Patil Canvas a luxury project?","answer":"Yes, Canvas is the ultra-luxury segment of Life Republic with premium specifications and 70% open spaces."}]'::jsonb,
  theme_color = '#9b59b6'
WHERE id = 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Atmos
UPDATE public.projects
SET
  image = 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.44653224666085267.png',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Yoga Deck","Open Air Gym","Meditation Zone","Cycling Track","Amphitheatre","Organic Garden"]'::jsonb,
  faqs = '[{"question":"How much green space does Atmos have?","answer":"Life Republic Atmos is designed with maximum open spaces and is close to the 3.5-acre Urban Park."},{"question":"Is Atmos connected to the spine road?","answer":"Yes, Atmos is directly connected to the 150ft wide spine road of Life Republic."}]'::jsonb,
  theme_color = '#2ecc71'
WHERE id = 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Aros
UPDATE public.projects
SET
  image = 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.0852377534066876.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Community Hall","Sports Complex","Pet Park","Senior Citizen Zone","BBQ Area","Swimming Pool"]'::jsonb,
  faqs = '[{"question":"What are the amenities in Life Republic Aros?","answer":"Aros features a sports complex, pet park, senior citizen zone, and a massive central greenspace."},{"question":"Is Aros suitable for families?","answer":"Yes, Aros is designed as a community-centric project perfect for families and children."}]'::jsonb,
  theme_color = '#e67e22'
WHERE id = 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township 24K Espada
UPDATE public.projects
SET
  image = '/images/home/24k-espada-thumb.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Private Clubhouse","Concierge Service","Heated Pool","Golf Simulator","Fine Dining","Wellness Centre"]'::jsonb,
  faqs = '[]'::jsonb,
  theme_color = '#2c3e50'
WHERE id = 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi';

-- Updating Kolte Patil Life Republic Township Sound of Soul
UPDATE public.projects
SET
  image = '/images/home/sound-of-soul-thumb.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Meditation Hall","Reflexology Path","Nature Trails","Acoustic Lounge","Library","Spa"]'::jsonb,
  faqs = '[]'::jsonb,
  theme_color = '#16a085'
WHERE id = 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi';

-- Updating Kolte Patil Life Republic Township Arezo
UPDATE public.projects
SET
  image = '/images/home/arezo-thumb.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Gymnasium","Kids Play Area","Party Lawn","Walking Track","CCTV Surveillance","Power Backup"]'::jsonb,
  faqs = '[]'::jsonb,
  theme_color = '#e74c3c'
WHERE id = 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Universe
UPDATE public.projects
SET
  image = '/images/slider/1.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Gymnasium","Kids Play Area","Garden","Security","Clubhouse","Multi-purpose Court"]'::jsonb,
  faqs = '[]'::jsonb,
  theme_color = '#8e44ad'
WHERE id = 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi';

-- Updating Kolte Patil Life Republic Township Bungalows
UPDATE public.projects
SET
  image = '/images/home/sound-of-soul-thumb.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Private Pool","Clubhouse Access","Landscaped Gardens","24/7 Security","Concierge"]'::jsonb,
  faqs = '[]'::jsonb,
  theme_color = '#d35400'
WHERE id = 'kolte-patil-life-republic-bungalows-hinjewadi';

-- Updating Kolte Patil Life Republic Township Villas
UPDATE public.projects
SET
  image = '/images/home/24k-espada-thumb.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Luxury Clubhouse","Swimming Pool","Concierge","Spa","Golf Putting Green"]'::jsonb,
  faqs = '[{"question":"What is the location of villas in Life Republic?","answer":"The villas are located in the premium Sector R9 of Kolte Patil Life Republic Hinjewadi."},{"question":"Are these ready to move villas?","answer":"These are ultra-luxury villas with possession dates varying by cluster. Please contact us for details."}]'::jsonb,
  theme_color = '#2c3e50'
WHERE id = 'kolte-patil-life-republic-villas-hinjewadi';

-- Updating Kolte Patil Life Republic Township First Avenue
UPDATE public.projects
SET
  image = '/images/project/banner/first-avenue-main.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["Clubhouse","Gymnasium","Swimming Pool","Kids Play Area","Senior Citizen Zone","Jogging Track"]'::jsonb,
  faqs = '[{"question":"What is the possession date for First Avenue?","answer":"The expected possession for Kolte Patil Life Republic First Avenue is October 2027."}]'::jsonb,
  theme_color = '#e67e22'
WHERE id = 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi';

-- Updating Kolte Patil Life Republic Township Echoes
UPDATE public.projects
SET
  image = '/images/project/banner/echoes-main.jpg',
  master_layout = NULL,
  floor_plans = '[]'::jsonb,
  gallery = '[]'::jsonb,
  amenities = '["2 Grand Clubhouses","Infinity Edge Pool","Work Pods","Gymnasium","Yoga Lawn","Amphitheatre","Cricket Net","BBQ Area"]'::jsonb,
  faqs = '[{"question":"What is the starting price for Echoes?","answer":"Prices at Kolte Patil Life Republic Echoes start from ₹82 Lakhs* for premium 2 BHK residences."},{"question":"Who is the architect for Echoes?","answer":"Life Republic Echoes is designed by the world-renowned architect Hafeez Contractor."}]'::jsonb,
  theme_color = '#1abc9c'
WHERE id = 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi';

