import type { Project } from '../lib/types';

export const projectsRegistry: Project[] = [
    {
        id: 'kolte-patil-life-republic-nora-bungalow-plots-hinjewadi',
        title: 'Kolte Patil Life Republic Nora | Premium Bungalow Plots Hinjewadi',
        category: 'Plots',
        location: 'Sector R11 (Nora)',
        price: '₹1.80Cr*',
        image: '/images/gallery/eros/master-layout.webp',
        description: 'Build your dream home at Nora in Kolte Patil Life Republic Township. Exclusive premium bungalow plots offering the ultimate luxury of customizing your own space in Hinjewadi.',
        features: ['Bungalow Plots', 'Sector R11', 'Customizable Luxury'],
        overview: 'Nora at Kolte Patil Life Republic Township offers an exclusive opportunity to build your own masterpiece. These premium bungalow plots provide the perfect canvas for your bespoke residence with world-class township infrastructure.',
        amenities: ['Exclusive Gated Community', 'Lush Green Landscapes', 'Wide Internal Roads', 'Dedicated Utilities Infrastructure', 'Clubhouse Access', '24/7 Security'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: 'Premium Plot', size: 'Various Sizes', image: '/images/home/master-layout-full.jpg', details: ['Build to Suit', 'Vastu Compliant Layouts', 'Premium Location'] }
        ],
        specifications: [
            { title: 'Infrastructure', items: ['Concrete Internal Roads', 'Underground Cabling', 'Water Supply Connection'] },
            { title: 'Security', items: ['Gated Community', 'CCTV Surveillance at entry', '24x7 Security Personnel'] }
        ],
        faqs: [
            { question: "What is the starting price for Nora Plots?", answer: "The premium bungalow plots at Nora start from ₹1.80Cr*." },
            { question: "Can I build my own design?", answer: "Yes, Nora offers the flexibility to build your custom bungalow design adhering to township guidelines." }
        ],
        themeColor: '#7e6d57'
    },
    {
        id: 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
        title: 'Kolte Patil Life Republic Atmos | Modern 2, 2.5 & 3 BHK Hinjewadi',
        category: 'Lifestyle',
        location: 'Sector R22 (Atmos)',
        price: '₹82 Lakhs*',
        image: '/images/home/atmos-thumb.jpg',
        description: 'Experience the Atmos lifestyle at Kolte Patil Life Republic Township Hinjewadi. Modern 2, 2.5 & 3 BHK apartments with high-rise luxury and smart amenities.',
        features: ['2, 2.5 & 3 BHK', 'Sector R22', 'Smart Home Ready'],
        overview: 'Atmos at Kolte Patil Life Republic Township Hinjewadi is the latest chapter in our architectural monograph. Designed with tectonic precision, these towers offer panoramic views and optimized spatial flow.',
        amenities: ['Clubhouse Atmos', 'Infinity Edge Pool', 'Gymnasium', 'Landscaped Garden', 'Children\'s Play Area', 'Multi-purpose Hall', 'Yoga Deck', 'Jogging Track'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Optima', size: '682 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 682 sq.ft.', 'Modern Kitchen Layout', 'Spacious Balcony'] },
            { type: '2 BHK Grande', size: '800 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 800 sq.ft.', 'Master Bedroom with Ensuite', 'Extra Utility Space'] },
            { type: '2.5 BHK', size: '943 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 943 sq.ft.', 'Additional Study Room', 'Premium Living Area'] },
            { type: '3 BHK', size: '1037 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 1037 sq.ft.', 'Triple Balcony System', 'Luxury Finishes'] }
        ],
        specifications: [
            { title: 'Structure & Walls', items: ['Earthquake resistant R.C.C. structure', 'Gypsum finished internal walls', 'OBD paint in all rooms'] },
            { title: 'Flooring', items: ['800x800 Vitrified tiles in all rooms', 'Anti-skid tiles in terraces and toilets'] },
            { title: 'Doors & Windows', items: ['Decorative main door with both side laminate', 'Internal flush doors with laminate', 'Powder coated aluminum sliding windows'] },
            { title: 'Kitchen & Bath', items: ['Granite kitchen platform with SS sink', 'Wall tiles up to 7ft in toilets', 'Branded CP & Sanitary fittings (Kohler/Jaquar)'] }
        ],
        faqs: [
            { question: "What is the possession date for Life Republic Atmos?", answer: "Life Republic Atmos Phase 1 is expected to be handed over by December 2026." },
            { question: "Are there 3 BHK flats in Atmos?", answer: "Yes, Atmos offers premium 3 BHK configurations with carpet areas up to 1037 sq.ft." }
        ],
        themeColor: '#2c3e50'
    },
    {
        id: 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
        title: 'Kolte Patil Life Republic Aros | Premium 2 & 3 BHK Hinjewadi',
        category: 'Executive',
        location: 'Sector R13 (Aros)',
        price: '₹85 Lakhs*',
        image: '/images/home/atmos-thumb.jpg',
        description: 'Discover Aros at Kolte Patil Life Republic Township Hinjewadi. Premium 2 & 3 BHK homes adjacent to the 3.5-acre Urban Park and jogging spine.',
        features: ['2 & 3 BHK', 'MahaRERA: P52100079623', 'Premium Sector R13'],
        overview: 'Aros at Kolte Patil Life Republic Township Hinjewadi represents the peak of residential synthesis. Located in Sector R13, it offers unparalleled access to nature and fitness infrastructure.',
        amenities: ['Private Clubhouse', 'Olympic Size Pool', 'Urban Park Access', 'Pet Park', 'Amphitheatre', 'Co-working Space'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Executive', size: '718 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 718 sq.ft.', 'Optimized Living-Dining', 'Large Master Bedroom'] },
            { type: '3 BHK Royal', size: '1176 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 1176 sq.ft.', 'Wrap-around Balcony', 'Premium Bath Fittings'] }
        ],
        specifications: [
            { title: 'Architectural Synthesis', items: ['R.C.C. frame with blockwork', 'Smooth internal gypsum finish', 'External acrylic texture paint'] },
            { title: 'Tectonic Finishes', items: ['Large format vitrified tiles', 'Heat-reflective glass in windows'] }
        ],
        themeColor: '#16a085'
    },
    {
        id: 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
        title: 'Kolte Patil Life Republic 24K Espada | Ultra-Luxury Row Houses Hinjewadi',
        category: 'Elite',
        location: 'Sector R31 (24K Espada)',
        price: '₹3.4 Cr*',
        image: '/images/home/24k-espada-thumb.jpg',
        description: 'Elite living at 24K Espada, Kolte Patil Life Republic Hinjewadi. Ultra-luxury 4 & 5 BHK row houses with private gardens and club access.',
        features: ['4 & 5 BHK', 'MahaRERA: P52100002646', '24K Signature Club'],
        overview: '24K Espada at Kolte Patil Life Republic Township Hinjewadi is the ultimate statement of sovereignty. These limited-edition row houses offer private terraces, internal lifts, and the exclusive 24K lifestyle.',
        amenities: ['Exclusive 24K Club', 'Internal Private Lift', 'Private Garden', 'Home Automation', 'Valet Service', 'Concierge'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '4 BHK Row House', size: '1876 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 1876 sq.ft.', 'G+2 Structure', 'Private Backyard'] },
            { type: '5 BHK Estate', size: '2274 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 2274 sq.ft.', 'Double Height Living', 'Private Terrace Garden'] }
        ],
        specifications: [
            { title: '24K Premium Synthesis', items: ['Imported Marble flooring in Living Room', 'Premium UPVC Windows', 'Modular Kitchen with Hob & Chimney'] },
            { title: 'Luxury Tech', items: ['Integrated Smart Home System', 'Digital Door Locks (Yale/Samsung)', 'Premium CP fittings (Kohler/Grohe)'] }
        ],
        themeColor: '#C5A059'
    },
    {
        id: 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
        title: 'Kolte Patil Life Republic Universe | Luxury 1 & 2 BHK Hinjewadi',
        category: 'Modern',
        location: 'Sector R10 (Universe)',
        price: 'Sold Out (₹72 Lakhs*)',
        image: '/images/home/atmos-thumb.jpg',
        description: 'Modern living at Universe, Kolte Patil Life Republic Hinjewadi. Planet-themed luxury 1 & 2 BHK homes near the upcoming Metro Phase 3.',
        features: ['1 & 2 BHK', 'MahaRERA: P52100027629', 'Metro Connectivity'],
        overview: 'Universe at Kolte Patil Life Republic Township Hinjewadi is designed for the modern millennial. With smart infrastructure and proximity to the Town Center, it offers the perfect balance of work and play.',
        amenities: ['Central Planet Park', 'Digital Library', 'EV Charging Station', 'Multi-sport Courts', 'Sunset Deck'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '1 BHK Smart', size: '445 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 445 sq.ft.', 'Efficient Space Planning', 'Smart Kitchen Hub'] },
            { type: '2 BHK Smart', size: '629 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 629 sq.ft.', 'Dual Balcony Layout', 'Optimized Master Bedroom'] }
        ],
        specifications: [
            { title: 'Modern Synthesis', items: ['Quality vitrified tiles', 'Aluminum sliding windows', 'Branded electrical switches'] }
        ],
        themeColor: '#8e44ad'
    },
    {
        id: 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
        title: 'Kolte Patil Life Republic Echoes | New Launch 2, 2.5 & 3 BHK Hinjewadi',
        category: 'New Launch',
        location: 'Sector R17/R18 (Echoes)',
        price: '₹85 Lakhs*',
        image: '/images/project/banner/echoes-main.jpg',
        description: 'Echoes at Kolte Patil Life Republic Hinjewadi. The latest architectural monograph by Hafeez Contractor, featuring premium 2, 2.5 & 3 BHK homes.',
        features: ['2, 2.5 & 3 BHK', 'MahaRERA: P52100079424', 'Near Urban Park'],
        overview: 'Echoes at Kolte Patil Life Republic Township Hinjewadi is where architectural legacy meets modern tectonic design. These towers are optimized for air-flow and natural light, creating a harmonious living volume.',
        amenities: ['Hafeez Contractor Signature Clubhouse', 'Reflection Pool', 'Zen Garden', 'Rooftop Lounge', 'Star Gazing Deck'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Moment', size: '840 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 840 sq.ft.', 'Architectural Living Space', 'Premium Flooring'] },
            { type: '2.5 BHK Memoria', size: '866 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 866 sq.ft.', 'Additional Study/Guest Room'] },
            { type: '3 BHK', size: '1231 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 1231 sq.ft.', 'Grand Balcony System'] }
        ],
        specifications: [
            { title: 'Signature Synthesis', items: ['High-end Vitrified tiles', 'Premium sanitary ware', 'Hafeez Contractor curated materials'] }
        ],
        themeColor: '#e67e22'
    },
    {
        id: 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
        title: 'Kolte Patil Life Republic Duet | Premium 2 BHK Hinjewadi',
        category: 'Compact',
        location: 'Sector R10 (Duet)',
        price: '₹75 Lakhs*',
        image: '/images/project/banner/1747221516duat-main-banner.jpg',
        description: 'Compact luxury at Duet, Kolte Patil Life Republic Hinjewadi. Premium 2 BHK apartments designed for couples and young families.',
        features: ['2 BHK', 'MahaRERA: P52100018539', 'High Rental Yield'],
        overview: 'Duet at Kolte Patil Life Republic Township Hinjewadi offers efficient 2 BHK units that maximize every square foot. Perfect for first-time buyers and savvy investors.',
        amenities: ['Rooftop Gym', 'Community Garden', 'Smart Entrance', 'Library', 'EV Charging'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Smart', size: '660 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 660 sq.ft.', 'Minimalist Design Flow'] },
            { type: '2 BHK Plus', size: '766 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 766 sq.ft.', 'Extended Balcony Space'] }
        ],
        specifications: [
            { title: 'Efficient Synthesis', items: ['Standard vitrified tiles', 'Branded sanitary fittings', 'Quality electric switches'] }
        ],
        themeColor: '#3498db'
    },
    {
        id: 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
        title: 'Kolte Patil Life Republic Arezo | Efficient 2 BHK Hinjewadi',
        category: 'Premium',
        location: 'Sector R16 (Arezo)',
        price: 'Sold Out (₹78 Lakhs*)',
        image: '/images/home/arezo-thumb.jpg',
        description: 'Modern 2 BHK flats at Arezo, Kolte Patil Life Republic Hinjewadi. 16th Avenue architectural luxury with multi-tier security.',
        features: ['2 BHK', 'MahaRERA: P52100018539', 'Sector R16'],
        overview: 'Arezo at Kolte Patil Life Republic Township Hinjewadi is the embodiment of efficient architectural luxury. Located in Sector R16, these 2 BHK units offer the best value-to-luxury ratio in the township.',
        amenities: ['16th Avenue Plaza', 'Health Club', 'Children\'s Play Zone', 'Jogging Track', 'Security Command Center'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Efficient', size: '610 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 610 sq.ft.', 'Zero Space Wastage'] }
        ],
        specifications: [
            { title: 'Value Synthesis', items: ['Reliable R.C.C. structure', 'Modern tiling in all rooms'] }
        ],
        themeColor: '#d35400'
    },
    {
        id: 'kolte-patil-life-republic-villas-hinjewadi',
        title: 'Kolte Patil Life Republic Villas | Signature Luxury Villas Hinjewadi',
        category: 'Luxury',
        location: 'Sector R9 (Villas)',
        price: '₹3.5 Cr*',
        image: '/images/home/24k-espada-thumb.jpg',
        description: 'Elite villa living at Kolte Patil Life Republic Hinjewadi. Limited edition 4 & 5 BHK villas with private lawns and tectonic design.',
        features: ['4 & 5 BHK', 'MahaRERA: P52100002646', 'Private Lawns'],
        overview: 'The Villas at Kolte Patil Life Republic Township Hinjewadi are the crowning jewels of the 390-acre ecosystem. Each villa is a standalone architectural monograph, offering privacy, luxury, and infinite space.',
        amenities: ['Private Pool (Select)', 'Signature Clubhouse', 'Personal Concierge', 'Estate Management', 'Organic Kitchen Garden'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '5 BHK Grand Villa', size: '3200 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Private Driveway', 'Double Height Living', 'Private Home Theatre Space'] }
        ],
        specifications: [
            { title: 'Elite Synthesis', items: ['Imported Italian Marble', 'Premium German Kitchen Fittings', 'Full Home Automation'] }
        ],
        themeColor: '#f1c40f'
    },
    {
        id: 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
        title: 'Kolte Patil Life Republic Sound of Soul | Luxury 4 BHK Row Houses Hinjewadi',
        category: 'Premium',
        location: 'Sector R17A (Sound of Soul)',
        price: 'Sold Out (₹2.9 Cr*)',
        image: '/images/home/sound-of-soul-thumb.jpg',
        description: 'Peaceful living at Sound of Soul, Kolte Patil Life Republic Hinjewadi. Luxury 4 BHK row houses with curated soundscapes and tectonic design.',
        features: ['4 BHK Row Houses', 'MahaRERA: P52100079424', 'Zen Tectonic Design'],
        overview: 'Sound of Soul at Kolte Patil Life Republic Township Hinjewadi is designed to offer a peaceful residential synthesis. These row houses feature architecture that harmonizes with the surrounding landscape and curated acoustic environments.',
        amenities: ['Zen Garden', 'Acoustic Lounge', 'Community Plaza', 'Wellness Center', 'Library'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '4 BHK Row House', size: '1650 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 1650 sq.ft.', 'Private Garden Pocket'] }
        ],
        specifications: [
            { title: 'Zen Synthesis', items: ['Sound-insulated windows', 'Premium natural stone flooring'] }
        ],
        themeColor: '#7f8c8d'
    },
    {
        id: 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
        title: 'Kolte Patil Life Republic First Avenue | Premium 2 & 3 BHK Hinjewadi',
        category: 'Premium',
        location: 'Sector R1 (First Avenue)',
        price: '₹75 Lakhs*',
        image: '/images/project/banner/first-avenue-main.jpg',
        description: 'The foundation of the township: Kolte Patil Life Republic First Avenue Hinjewadi. Premium 2 & 3 BHK homes with a proven community lifestyle.',
        features: ['2 & 3 BHK', 'MahaRERA: P52100051765', 'Prime Sector R1'],
        overview: 'First Avenue at Kolte Patil Life Republic Township Hinjewadi is one of the most established sectors, offering immediate possession and a vibrant community life.',
        amenities: ['Clubhouse', 'Swimming Pool', 'Gymnasium', 'Landscaped Gardens', 'Children\'s Play Area', '24/7 Security'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Ready', size: '780 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Ready to Move', 'Spacious Living Area'] },
            { type: '3 BHK Ready', size: '1050 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Immediate Possession', 'Premium Finishes'] }
        ],
        specifications: [
            { title: 'Standard Synthesis', items: ['Vitrified flooring in all rooms', 'Granite kitchen platform', 'Branded sanitary ware'] }
        ],
        themeColor: '#2980b9'
    },
    {
        id: 'kolte-patil-life-republic-oro-avenue-smart-1-2-bhk-hinjewadi',
        title: 'Kolte Patil Life Republic ORO Avenue | Smart 1 & 2 BHK Hinjewadi',
        category: 'Smart',
        location: 'Sector R9 (ORO Avenue)',
        price: 'Sold Out',
        image: '/images/home/arezo-thumb.jpg',
        description: 'Smart living at ORO Avenue, Kolte Patil Life Republic Hinjewadi. Optimized 1 & 2 BHK apartments designed for high-yield investment and modern comfort.',
        features: ['1 & 2 BHK', 'MahaRERA: P52100017116', 'Sector R9'],
        overview: 'ORO Avenue at Kolte Patil Life Republic Township Hinjewadi offers smart urban apartments with high rental demand in the growing Sector R9.',
        amenities: ['Gymnasium', 'Walking Track', 'Retail Plaza', 'CCTV Security', 'Power Backup', 'Landscaped Garden'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '1 BHK Smart', size: '445 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 445 sq.ft.', 'Optimized Floor Space', 'Modern Kitchen Hub'] },
            { type: '2 BHK Smart', size: '610 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 610 sq.ft.', 'Dual Balcony', 'Smart Room Layout'] }
        ],
        specifications: [
            { title: 'Smart Engineering', items: ['Vitrified tiles in all rooms', 'Concealed copper wiring', 'Quality CP fittings'] }
        ],
        themeColor: '#f39c12'
    },
    {
        id: 'kolte-patil-life-republic-i-towers-smart-homes-hinjewadi',
        title: 'Kolte Patil Life Republic i-Towers | Smart Tech Homes Hinjewadi',
        category: 'Smart',
        location: 'Sector R7 (i-Towers)',
        price: 'Sold Out',
        image: '/images/home/canvas-thumb.jpg',
        description: 'Tech-enabled living at i-Towers, Kolte Patil Life Republic Hinjewadi. Smart 2 & 3 BHK homes with integrated multi-sport courts.',
        features: ['2 & 3 BHK', 'MahaRERA: P52100022154', 'Sector R7'],
        overview: 'i-Towers at Kolte Patil Life Republic Township Hinjewadi is designed for the modern professional, featuring smart home features and active sports infrastructure.',
        amenities: ['Sports Arena', 'Digital Clubhouse', 'Smart Security', 'Yoga Deck', 'Swimming Pool', 'Co-working Space'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '2 BHK Tech', size: '785 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Smart Lock Integration', 'Voice Command Ready'] }
        ],
        specifications: [
            { title: 'Digital Synthesis', items: ['Fiber-to-the-home connectivity', 'Modular switches with automation support'] }
        ],
        themeColor: '#2980b9'
    },
    {
        id: 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
        title: 'Kolte Patil Life Republic Canvas | Premium 3, 3.5 & 4 BHK Hinjewadi',
        category: 'Ultra Luxury',
        location: 'Sector R3 (Canvas)',
        price: '₹1.49 Cr*',
        image: '/images/home/canvas-thumb.jpg',
        description: 'Ultra-luxury living at Canvas, Kolte Patil Life Republic Hinjewadi. Premium 3, 3.5 & 4 BHK residences in 40-storey high-rise towers with elite specifications.',
        features: ['3, 3.5 & 4 BHK', 'MahaRERA: P52100077008', '40-Storey Towers'],
        overview: 'Canvas at Kolte Patil Life Republic Township represents the zenith of ultra-luxury living. Spanning 6.34 acres, it features four iconic G+4P+40 storey towers offering panoramic views, an infinity-edge pool, and a massive 21,000 sq.ft. indoor recreation zone.',
        amenities: ['Infinity-edge Pool', '21,000 sq.ft. Clubhouse', 'Pickleball & Padel Tennis', 'Fitness Plaza', 'Co-working Spaces', 'Extensive Open Spaces'],
        masterLayout: '/images/home/master-layout-full.jpg',
        floorPlans: [
            { type: '3 BHK Premium', size: '1332 - 1452 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: 1332-1452 sq.ft.', 'Dual Master Bedrooms', 'Large Deck'] },
            { type: '3.5 BHK Luxury', size: '1700 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: ~1700 sq.ft.', 'Expansive Layout', 'Premium Finishes'] },
            { type: '4 BHK Ultra', size: '2024 sq.ft.', image: '/images/home/master-layout-full.jpg', details: ['Carpet Area: ~2024 sq.ft.', 'Grand Entrance Lobby', 'Maximum Privacy'] }
        ],
        specifications: [
            { title: 'Elite Finishes', items: ['Italian Marble Flooring', 'Home Automation', 'Premium Fittings', 'Heat-reflective glass'] }
        ],
        faqs: [
            { question: "What is the possession date for Canvas?", answer: "Target possession is June 2028, with RERA possession by December 2028." },
            { question: "How tall are the Canvas towers?", answer: "Canvas features 4 high-rise towers reaching G+4P+40 floors." }
        ],
        themeColor: '#9b59b6'
    }
];
