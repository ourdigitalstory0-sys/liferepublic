-- SQL Script to insert new projects (Universe, Bungalows, Villas)
-- Run this in Supabase SQL Editor to bypass RLS

INSERT INTO public.projects (id, title, category, location, price, image, description, overview, features, amenities, master_layout, floor_plans, theme_color)
VALUES
(
  'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
  'Kolte Patil Life Republic Township Universe',
  'Residential',
  'Sector R10 (The Universe)',
  '₹45 Lakhs*',
  'https://liferepublic.in/images/slider/1.webp',
  'Smart 1 & 2 BHK homes designed for modern living. Perfect for first-time homebuyers.',
  'The Universe (R10) is a futuristic residential cluster within Life Republic offering smart 1 & 2 BHK apartments. Designed for the dynamic modern generation, it provides a perfect entry into the township lifestyle. The project features smart infrastructure, high-speed connectivity options, and a vibrant community atmosphere. Residents enjoy access to all township facilities including the 5-acre entrance avenue and global school, making it an ideal choice for ambitious starters.',
  ARRAY['1 & 2 BHK', 'Possession: Dec 2026', 'Smart Infrastructure'],
  ARRAY['Gymnasium', 'Kids Play Area', 'Garden', 'Security', 'Clubhouse', 'Multi-purpose Court'],
  '',
  ARRAY[]::text[],
  '#8e44ad'
),
(
  'kolte-patil-life-republic-bungalows-hinjewadi',
  'Kolte Patil Life Republic Township Bungalows',
  'Luxury',
  'Sector R2 & R9',
  '₹2.5 Cr*',
  'https://liferepublic.in/images/home/sound-of-soul-thumb.webp',
  'Exclusive bungalows offering privacy and luxury. A statement of your success.',
  'Experience the ultimate in bespoke luxury with our exclusive range of bungalows at Life Republic. These homes are designed for those who have arrived in life and seek a residence that reflects their stature. Offering expansive living areas, private gardens, and premium specifications, these bungalows provide the privacy of an independent estate with the supreme security and maintenance of a gated township. A true legacy for generations to come.',
  ARRAY['4 & 5 BHK', 'Private Garden', 'Gated Community'],
  ARRAY['Private Pool', 'Clubhouse Access', 'Landscaped Gardens', '24/7 Security', 'Concierge'],
  '',
  ARRAY[]::text[],
  '#d35400'
),
(
  'kolte-patil-life-republic-villas-hinjewadi',
  'Kolte Patil Life Republic Township Villas',
  'Ultra Luxury',
  'Sector R9',
  '₹3.0 Cr*',
  'https://liferepublic.in/images/home/24k-espada-thumb.webp',
  'Premium villas designed for a lavish lifestyle. Unmatched elegance and comfort.',
  'Our Villas at Life Republic redefine the essence of lavish living. Crafted with meticulous attention to detail, these homes feature expansive layouts, double-height ceilings, and sophisticated interiors. Located in the most premium sector of the township, they offer unmatched elegance and comfort. Residents enjoy exclusive access to the 24K clubhouse, private elevators, and home automation systems, ensuring a lifestyle that is truly extraordinary.',
  ARRAY['4 & 5 BHK Villas', 'World-class Amenities', 'Premium Location'],
  ARRAY['Luxury Clubhouse', 'Swimming Pool', 'Concierge', 'Spa', 'Golf Putting Green'],
  '',
  ARRAY[]::text[],
  '#2c3e50'
);
