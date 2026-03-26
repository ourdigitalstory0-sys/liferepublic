-- Synchronize all project images from local data

-- Upserting Kolte Patil Life Republic Township Duet
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Duet',
  'Premium',
  'Sector R10 (34th Avenue)',
  '₹72 Lakhs*',
  'Premium 2 BHK flats specifically designed for modern couples and young professionals. A perfect blend of work, leisure, and community.',
  'Duet at Life Republic is specifically designed for modern couples, young professionals, and small families who aspire to a lifestyle of convenience and class. These premium 2 BHK flats in Hinjewadi blend thoughtfully crafted living spaces with world-class amenities within Pune''s most celebrated integrated township. The project focuses on providing a balanced lifestyle that integrates work, leisure, and community connection seamlessly. Residents enjoy proximity to the commercial hubs of Hinjewadi while retreating to a serene environment filled with lush greenery, dedicated sports zones, and social avenues.',
  '["2 BHK","Possession: Oct 2029","34th Avenue"]'::jsonb,
  '/images/project/banner/1747221516duat-main-banner.jpg',
  NULL,
  '[]'::jsonb,
  '["/images/project/gallery/1747221661duet-interior-1.jpg","/images/project/gallery/1747221668duet-interior-2.jpg","/images/project/gallery/1747221674duet-interior-3.jpg"]'::jsonb,
  '["Jogging Track","Gymnasium","Swimming Pool","Multi-sports Court","Kid''s Play Zone","BBQ Area","Multipurpose Hall","Reflexology Path"]'::jsonb,
  '[{"question":"What is the price of 2 BHK in Life Republic Duet?","answer":"The 2 BHK flats in Life Republic Duet start from ₹72 Lakhs*."},{"question":"When is the possession for Life Republic Duet?","answer":"The expected possession for Life Republic Duet is October 2029."}]'::jsonb,
  '#C5A059',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Qrious
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
  'Kolte Patil Life Republic Township Qrious',
  'Smart',
  'Sector R1',
  '₹72 Lakhs*',
  'Spacious 2 & 3 BHK homes for the curious minds. A perfect blend of comfort and innovation.',
  'Qrious is an ode to the modern, inquisitive generation that seeks more from their living spaces. These smart 2 & 3 BHK homes in Sector R1 offer intelligent layouts, futuristic amenities, and integrated smart home features. It is a vibrant community where innovation meets everyday comfort, featuring the unique "Planet App" for seamless community management. With co-working spaces, digital libraries, and tech-enabled zones, Qrious is the perfect home for the forward-thinking professional.',
  '["2 & 3 BHK","Possession: April 2030","Smart Homes"]'::jsonb,
  'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.8122513965070959.avif',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Smart Home Automations","Co-working Space","Fitness Center","Rooftop Lounge","Library","Indoor Games"]'::jsonb,
  '[{"question":"What are Qrious Smart Homes?","answer":"Qrious at Life Republic offers tech-enabled 2 & 3 BHK smart homes with Planet App integration."},{"question":"Where is Sector R1 located in Life Republic?","answer":"Sector R1 is a centrally located residential zone within the Life Republic township."}]'::jsonb,
  '#3498db',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Canvas
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Canvas',
  'Luxury',
  'Sector R3',
  '₹1.68 Cr*',
  'Premium 3 & 4 BHK residences that are a canvas for your dreams. Luxury living redefined.',
  'Canvas represents the pinnacle of luxury living within the Life Republic township. These expansive 3 & 4 BHK residences in Sector R3 are crafted for connoisseurs of fine living. With bespoke designs, premium fittings, and over 70% open spaces, every corner of Canvas is a masterpiece. The project offers an exclusive lifestyle with private amenities, grand entrance lobbies, and a community of like-minded achievers, making it the ultimate address for success.',
  '["3 & 4 BHK","Possession: Oct 2026","Luxury Specifications"]'::jsonb,
  '/images/home/canvas-thumb.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Infinity Pool","Spa & Sauna","Private Theatre","Banquet Hall","Tennis Court","Landscaped Gardens"]'::jsonb,
  '[{"question":"What is the carpet area for 4 BHK in Canvas?","answer":"Canvas offers expansive 3 & 4 BHK residences. Please contact us for specific carpet area details."},{"question":"Is Kolte Patil Canvas a luxury project?","answer":"Yes, Canvas is the ultra-luxury segment of Life Republic with premium specifications and 70% open spaces."}]'::jsonb,
  '#9b59b6',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Atmos
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Atmos',
  'Modern',
  'Sector R22',
  '₹75 Lakhs*',
  'Modern 2, 2.5 & 3 BHK flats offering a breath of fresh air. Designed for those who value openness.',
  'Atmos brings you closer to nature without compromising on urban conveniences. These modern 2, 2.5 & 3 BHK flats in Sector R4 are architecturally designed to maximize natural light and cross-ventilation, ensuring a healthy living environment. The project emphasizes open spaces, with acres of landscaped gardens, walking trails, and oxygen-rich zones. Directly connected to the 150ft wide spine road, Atmos offers the perfect balance of connectivity and tranquility.',
  '["2, 2.5 & 3 BHK","Possession: Oct 2027","Open Spaces"]'::jsonb,
  'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.44653224666085267.png',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Yoga Deck","Open Air Gym","Meditation Zone","Cycling Track","Amphitheatre","Organic Garden"]'::jsonb,
  '[{"question":"How much green space does Atmos have?","answer":"Life Republic Atmos is designed with maximum open spaces and is close to the 3.5-acre Urban Park."},{"question":"Is Atmos connected to the spine road?","answer":"Yes, Atmos is directly connected to the 150ft wide spine road of Life Republic."}]'::jsonb,
  '#2ecc71',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Aros
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Aros',
  'Premium',
  'Sector R13',
  '₹82 Lakhs*',
  '2 & 3 BHK flats crafted for a seamless lifestyle. Connect with nature and community.',
  'Aros is where community living comes alive. Located in the vibrant Sector R16, these 2 & 3 BHK flats offer a seamless lifestyle where neighbours become family. The project features a massive central greenspace, dedicated zones for seniors and children, and a host of social amenities. Aros is designed to foster connections, making it the perfect place to build lasting memories with your loved ones while enjoying the security and scale of a township.',
  '["2 & 3 BHK","Possession: Dec 2026","Community Living"]'::jsonb,
  'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.0852377534066876.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Community Hall","Sports Complex","Pet Park","Senior Citizen Zone","BBQ Area","Swimming Pool"]'::jsonb,
  '[{"question":"What are the amenities in Life Republic Aros?","answer":"Aros features a sports complex, pet park, senior citizen zone, and a massive central greenspace."},{"question":"Is Aros suitable for families?","answer":"Yes, Aros is designed as a community-centric project perfect for families and children."}]'::jsonb,
  '#e67e22',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township 24K Espada
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
  'Kolte Patil Life Republic Township 24K Espada',
  'Ultra Luxury',
  'Sector R9',
  '₹2.60 Cr*',
  'Ultra-luxury 4 & 5 Bed rare row houses. The epitome of exclusivity and grandeur.',
  '24K Espada redefines the concept of luxury living in Pune. These ultra-luxury 4 & 5 Bed row houses in Sector R9 are limited-edition homes for the select few. Each residence comes with a private garden, personal parking, and access to exclusive 24K services. Espada offers the privacy of an independent bungalow with the security and conveniences of a gated community, setting a new benchmark for opulence in Hinjewadi.',
  '["4 & 5 Bed Row Houses","Possession: Oct 2026","Private Garden"]'::jsonb,
  '/images/home/24k-espada-thumb.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Private Clubhouse","Concierge Service","Heated Pool","Golf Simulator","Fine Dining","Wellness Centre"]'::jsonb,
  '[]'::jsonb,
  '#2c3e50',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Sound of Soul
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
  'Kolte Patil Life Republic Township Sound of Soul',
  'Luxury',
  'Sector R2',
  '₹2.45 Cr*',
  'Luxury 4 BHK row houses designed to resonate with your soul. Peaceful and private.',
  'Sound of Soul is a sanctuary of peace amidst the city''s hustle. These luxury 4 BHK row houses in Sector R2 are designed to resonate with your inner self, offering a tranquil environment surrounded by music and nature. The architecture promotes sound-proofing and acoustic excellence, creating a quiet retreat for your family. With exclusive amenities like a meditation hall and reflexology paths, it is a home that nurtures your soul.',
  '["4 BHK Row Houses","Possession: Dec 2025","Serene Environment"]'::jsonb,
  '/images/home/sound-of-soul-thumb.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Meditation Hall","Reflexology Path","Nature Trails","Acoustic Lounge","Library","Spa"]'::jsonb,
  '[]'::jsonb,
  '#16a085',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Arezo
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Arezo',
  'Residential',
  'Sector R1',
  '₹72 Lakhs*',
  'Focus on 2 BHK flats with efficient layouts and modern amenities.',
  'Arezo is the epitome of smart and efficient urban living. These 2 BHK flats in Sector R1 offer intelligently designed layouts that maximize space usage and minimize wastage. Perfect for young families and first-time homebuyers, Arezo provides a modern lifestyle with essential amenities, great connectivity, and the vibrant community atmosphere of Life Republic, all at an attractive value proposition.',
  '["2 BHK","Possession: Oct 2025","Efficient Design"]'::jsonb,
  '/images/home/arezo-thumb.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Gymnasium","Kids Play Area","Party Lawn","Walking Track","CCTV Surveillance","Power Backup"]'::jsonb,
  '[]'::jsonb,
  '#e74c3c',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Universe
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Universe',
  'Residential',
  'Sector R10 (The Universe)',
  '₹45 Lakhs*',
  'Smart 1 & 2 BHK homes designed for modern living. Perfect for first-time homebuyers.',
  'The Universe (R10) is a futuristic residential cluster within Life Republic offering smart 1 & 2 BHK apartments. Designed for the dynamic modern generation, it provides a perfect entry into the township lifestyle. The project features smart infrastructure, high-speed connectivity options, and a vibrant community atmosphere. Residents enjoy access to all township facilities including the 5-acre entrance avenue and global school, making it an ideal choice for ambitious starters.',
  '["1 & 2 BHK","Possession: Dec 2026","Smart Infrastructure"]'::jsonb,
  '/images/slider/1.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Gymnasium","Kids Play Area","Garden","Security","Clubhouse","Multi-purpose Court"]'::jsonb,
  '[]'::jsonb,
  '#8e44ad',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Bungalows
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-bungalows-hinjewadi',
  'Kolte Patil Life Republic Township Bungalows',
  'Luxury',
  'Sector R2 & R9',
  '₹2.5 Cr*',
  'Exclusive bungalows offering privacy and luxury. A statement of your success.',
  'Experience the ultimate in bespoke luxury with our exclusive range of bungalows at Life Republic. These homes are designed for those who have arrived in life and seek a residence that reflects their stature. Offering expansive living areas, private gardens, and premium specifications, these bungalows provide the privacy of an independent estate with the supreme security and maintenance of a gated township. A true legacy for generations to come.',
  '["4 & 5 BHK","Private Garden","Gated Community"]'::jsonb,
  '/images/home/sound-of-soul-thumb.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Private Pool","Clubhouse Access","Landscaped Gardens","24/7 Security","Concierge"]'::jsonb,
  '[]'::jsonb,
  '#d35400',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Villas
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-villas-hinjewadi',
  'Kolte Patil Life Republic Township Villas',
  'Ultra Luxury',
  'Sector R9',
  '₹3.0 Cr*',
  'Premium villas designed for a lavish lifestyle. Unmatched elegance and comfort.',
  'Our Villas at Life Republic redefine the essence of lavish living. Crafted with meticulous attention to detail, these homes are designed for those who have arrived in life and seek a residence that reflects their stature. Located in the most premium sector of the township, they offer unmatched elegance and comfort. Residents enjoy exclusive access to the 24K clubhouse, private elevators, and home automation systems, ensuring a lifestyle that is truly extraordinary.',
  '["4 & 5 BHK Villas","World-class Amenities","Premium Location"]'::jsonb,
  '/images/home/24k-espada-thumb.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Luxury Clubhouse","Swimming Pool","Concierge","Spa","Golf Putting Green"]'::jsonb,
  '[{"question":"What is the location of villas in Life Republic?","answer":"The villas are located in the premium Sector R9 of Kolte Patil Life Republic Hinjewadi."},{"question":"Are these ready to move villas?","answer":"These are ultra-luxury villas with possession dates varying by cluster. Please contact us for details."}]'::jsonb,
  '#2c3e50',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township First Avenue
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
  'Kolte Patil Life Republic Township First Avenue',
  'Premium',
  'Sector R1 (First Avenue)',
  '₹78 Lakhs*',
  'Prime connectivity meet premium living. 2 & 3 BHK apartments at the township entrance.',
  'First Avenue is strategically located at the gateway of the Life Republic township. Offering premium 2 & 3 BHK apartments, it provides unparalleled connectivity to the 150ft wide spine road and the upcoming metro. Residents enjoy immediate access to the global school, commercial hubs, and the 5-acre entrance avenue, making it one of the most convenient residential addresses within the 390-acre township.',
  '["2 & 3 BHK","Possession: Oct 2027","Entrance Avenue"]'::jsonb,
  '/images/project/banner/first-avenue-main.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["Clubhouse","Gymnasium","Swimming Pool","Kids Play Area","Senior Citizen Zone","Jogging Track"]'::jsonb,
  '[{"question":"What is the possession date for First Avenue?","answer":"The expected possession for Kolte Patil Life Republic First Avenue is October 2027."}]'::jsonb,
  '#e67e22',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

-- Upserting Kolte Patil Life Republic Township Echoes
INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)
VALUES (
  'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
  'Kolte Patil Life Republic Township Echoes',
  'New Launch',
  'Sector R17/R18',
  '₹83 Lakhs*',
  'New premium launch by Hafeez Contractor. 2 & 2.5 BHK timeless homes in the heart of Life Republic.',
  'Echoes is the latest premium milestone within the 390-acre Life Republic Integrated Township. Designed by the visionary Hafeez Contractor, Echoes offers timeless 2 & 2.5 BHK residences across Sector R17/R18. The project is centered around a massive 3.5-acre Urban Park and features over 40+ lifestyle amenities spread across three distinct levels. Residents benefit from two grand clubhouses, secure gated living, and the intuitive "Planet App" integration. Perfectly positioned for Hinjewadi professionals seeking a balance of luxury and ecosystem living.',
  '["2 & 2.5 BHK","Possession: June 2029","RERA: PM1261012502409"]'::jsonb,
  '/images/project/banner/echoes-main.jpg',
  NULL,
  '[]'::jsonb,
  '[]'::jsonb,
  '["3.5-Acre Urban Park","2 Grand Clubhouses","Infinity Edge Pool","40+ Lifestyle Amenities","Yoga & Meditation Lawn","Cricket Net & Multipurpose Court","Work Pods","Reflexology Path"]'::jsonb,
  '[{"question":"What is the RERA number for Life Republic Echoes?","answer":"The RERA registration number for Kolte Patil Life Republic Echoes is PM1261012502409."},{"question":"What are the configuration options in Echoes?","answer":"Echoes offers premium 2 BHK (~735 sq.ft.) and 2.5 BHK (~866 sq.ft.) timeless residences."},{"question":"What is the starting price for Echoes?","answer":"Prices for Echoes at Life Republic start from ₹83 Lakhs* plus govt taxes."}]'::jsonb,
  '#00A89E',
  ''
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  location = EXCLUDED.location,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  overview = EXCLUDED.overview,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  master_layout = EXCLUDED.master_layout,
  floor_plans = EXCLUDED.floor_plans,
  gallery = EXCLUDED.gallery,
  amenities = EXCLUDED.amenities,
  faqs = EXCLUDED.faqs,
  theme_color = EXCLUDED.theme_color,
  rera = EXCLUDED.rera;

