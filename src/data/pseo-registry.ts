export interface LandingConfig {
    title: string;
    description: string;
    keywords: string;
    infraScore: number;
    rentalYield: string;
    commutePhase1: string;
    highlights: string[];
}

export const pseoRegistry: Record<string, LandingConfig> = {
    'flats-near-marunji-road': {
        title: 'Premium Flats Near Marunji Road | Life Republic Hinjewadi',
        description: 'Discover luxury 2 & 3 BHK flats near Marunji Road in Kolte Patil Life Republic township Hinjewadi Pune.',
        keywords: 'flats near marunji road, life republic marunji, kolte patil marunji road',
        infraScore: 94, rentalYield: '5.8% - 6.5%', commutePhase1: '8 mins',
        highlights: ['Immediate access to Spine Road', 'Proximity to Anisha Global School', 'High appreciation corridor']
    },
    'ready-possession-flats-hinjewadi': {
        title: 'Ready Possession Flats in Hinjewadi Pune | Life Republic',
        description: 'Explore ready possession luxury flats in Kolte Patil Life Republic Hinjewadi. 2, 3, 4 BHK apartments with OC.',
        keywords: 'ready possession flats hinjewadi, immediate possession flats pune, ready to move life republic',
        infraScore: 98, rentalYield: '6.2% - 7.1%', commutePhase1: '10 mins',
        highlights: ['Zero GST benefits', 'Immediate rental income', 'Community of 12,000+ families']
    },
    'affordable-flats-in-hinjewadi': {
        title: 'Affordable Flats in Hinjewadi Pune | Kolte Patil Life Republic',
        description: 'Find affordable 1 & 2 BHK flats in Hinjewadi starting ₹45 Lakhs at Kolte Patil Life Republic township.',
        keywords: 'affordable flats hinjewadi, budget flats hinjewadi pune, cheap flats near hinjewadi',
        infraScore: 90, rentalYield: '5.5% - 6.2%', commutePhase1: '10 mins',
        highlights: ['Starting ₹45 Lakhs', 'PMAY eligible configurations', 'Metro connectivity coming']
    },
    'luxury-apartments-hinjewadi': {
        title: 'Luxury Apartments in Hinjewadi | Kolte Patil Life Republic',
        description: 'Ultra-luxury 3 & 4 BHK apartments in Hinjewadi Pune. Premium living at Kolte Patil Life Republic township.',
        keywords: 'luxury apartments hinjewadi, premium flats hinjewadi pune, luxury homes life republic',
        infraScore: 96, rentalYield: '5.2% - 5.8%', commutePhase1: '10 mins',
        highlights: ['Premium specifications', 'Private clubhouse access', 'Concierge services']
    },
    'new-launch-projects-hinjewadi': {
        title: 'New Launch Projects in Hinjewadi 2026 | Kolte Patil Life Republic',
        description: 'Latest new launch residential projects in Hinjewadi Pune 2026. Kolte Patil Life Republic Echoes & Duet.',
        keywords: 'new launch projects hinjewadi 2026, upcoming projects hinjewadi, new flats hinjewadi',
        infraScore: 92, rentalYield: '6.0% - 7.0%', commutePhase1: '10 mins',
        highlights: ['Pre-launch pricing advantage', 'Hafeez Contractor design', 'Early bird discounts']
    },
    'under-construction-flats-hinjewadi': {
        title: 'Under Construction Flats in Hinjewadi | Life Republic Pune',
        description: 'Under construction 2 & 3 BHK flats in Hinjewadi Pune with best prices. Kolte Patil Life Republic township.',
        keywords: 'under construction flats hinjewadi, ongoing projects hinjewadi pune',
        infraScore: 91, rentalYield: '5.8% - 6.5%', commutePhase1: '10 mins',
        highlights: ['Construction-linked payment plans', 'RERA registered', 'Track record of timely delivery']
    },
    'flats-near-rajiv-gandhi-infotech-park': {
        title: 'Flats Near Rajiv Gandhi Infotech Park Hinjewadi | Life Republic',
        description: 'Premium flats near Rajiv Gandhi IT Park Hinjewadi. Walk to work from Kolte Patil Life Republic township.',
        keywords: 'flats near rajiv gandhi infotech park, apartments near hinjewadi it park',
        infraScore: 95, rentalYield: '6.0% - 6.8%', commutePhase1: '5 mins',
        highlights: ['5 min to IT Park', 'Walk-to-work lifestyle', 'High rental demand from IT professionals']
    },
    'flats-near-mann-hinjewadi': {
        title: 'Flats Near Mann Hinjewadi | Kolte Patil Life Republic Pune',
        description: 'Explore premium flats near Mann village Hinjewadi. Kolte Patil Life Republic offers best connectivity.',
        keywords: 'flats near mann hinjewadi, property near mann pune, apartments mann hinjewadi',
        infraScore: 89, rentalYield: '5.5% - 6.2%', commutePhase1: '12 mins',
        highlights: ['Upcoming infrastructure development', 'Green corridor', 'Value appreciation zone']
    },
    'flats-near-maan-hinjewadi': {
        title: 'Flats Near Maan Hinjewadi Pune | Life Republic Township',
        description: 'Affordable and luxury flats near Maan village Hinjewadi Pune in Kolte Patil Life Republic.',
        keywords: 'flats near maan hinjewadi, property near maan pune',
        infraScore: 89, rentalYield: '5.5% - 6.2%', commutePhase1: '12 mins',
        highlights: ['Ring Road proximity', 'Emerging growth hub', 'Township infrastructure']
    },
    'property-in-hinjewadi-phase-3': {
        title: 'Property in Hinjewadi Phase 3 | Kolte Patil Life Republic',
        description: 'Best property options near Hinjewadi Phase 3 Pune. Kolte Patil Life Republic township with premium amenities.',
        keywords: 'property hinjewadi phase 3, flats near hinjewadi phase 3 pune',
        infraScore: 93, rentalYield: '6.0% - 7.0%', commutePhase1: '15 mins',
        highlights: ['Phase 3 IT corridor access', 'Upcoming metro station', 'High growth potential']
    },
    'flats-near-wakad-hinjewadi-road': {
        title: 'Flats Near Wakad Hinjewadi Road | Life Republic Pune',
        description: 'Premium flats on Wakad-Hinjewadi corridor. Kolte Patil Life Republic offers best township living.',
        keywords: 'flats near wakad hinjewadi road, apartments wakad hinjewadi pune',
        infraScore: 92, rentalYield: '5.8% - 6.5%', commutePhase1: '15 mins',
        highlights: ['Wakad social infrastructure', 'Dual road connectivity', 'Commercial hub proximity']
    },
    'kolte-patil-life-republic-price': {
        title: 'Kolte Patil Life Republic Price List 2026 | All Projects',
        description: 'price list for all Kolte Patil Life Republic projects. 1, 2, 3, 4 BHK flats starting ₹45 Lakhs.',
        keywords: 'kolte patil life republic price, life republic price list 2026, life republic hinjewadi price',
        infraScore: 97, rentalYield: '5.5% - 7.0%', commutePhase1: '10 mins',
        highlights: ['pricing from ₹45L to ₹3Cr+', 'Flexible payment plans', 'Home loan pre-approved']
    },
    'kolte-patil-life-republic-reviews': {
        title: 'Kolte Patil Life Republic Reviews 2026 | Resident Feedback',
        description: 'Genuine reviews and ratings for Kolte Patil Life Republic Hinjewadi from 12,000+ resident families.',
        keywords: 'kolte patil life republic reviews, life republic hinjewadi review, life republic pune feedback',
        infraScore: 96, rentalYield: '5.5% - 6.5%', commutePhase1: '10 mins',
        highlights: ['4.5★ average resident rating', '12,000+ families living', 'Award-winning township']
    },
    'kolte-patil-life-republic-master-plan': {
        title: 'Kolte Patil Life Republic Master Plan | 390 Acre Township Map',
        description: 'Explore the master plan of Kolte Patil Life Republic 390-acre township Hinjewadi with sector details.',
        keywords: 'life republic master plan, kolte patil hinjewadi master plan, life republic layout plan',
        infraScore: 97, rentalYield: '5.5% - 7.0%', commutePhase1: '10 mins',
        highlights: ['390 acres integrated township', '30+ residential sectors', 'Self-sustaining ecosystem']
    },
    'flats-in-hinjewadi-under-50-lakhs': {
        title: 'Flats in Hinjewadi Under 50 Lakhs | Life Republic Pune',
        description: 'Budget-friendly 1 BHK flats in Hinjewadi under ₹50 Lakhs at Kolte Patil Life Republic township.',
        keywords: 'flats in hinjewadi under 50 lakhs, cheap flats hinjewadi, budget apartments pune',
        infraScore: 88, rentalYield: '6.0% - 7.0%', commutePhase1: '10 mins',
        highlights: ['Starting ₹45 Lakhs', 'Smart home features', 'Township amenities included']
    },
    'flats-in-hinjewadi-under-80-lakhs': {
        title: 'Flats in Hinjewadi Under 80 Lakhs | 2 BHK Life Republic',
        description: 'Premium 2 BHK flats in Hinjewadi under ₹80 Lakhs at Kolte Patil Life Republic. Best value township.',
        keywords: 'flats hinjewadi under 80 lakhs, 2 bhk under 80 lakhs hinjewadi pune',
        infraScore: 92, rentalYield: '5.8% - 6.5%', commutePhase1: '10 mins',
        highlights: ['Premium 2 BHK from ₹72L', 'Multiple project options', 'Best amenities in budget']
    },
    'flats-in-hinjewadi-under-1-crore': {
        title: 'Flats in Hinjewadi Under 1 Crore | Life Republic Pune',
        description: 'Spacious 2 & 3 BHK flats in Hinjewadi under ₹1 Crore at Kolte Patil Life Republic township.',
        keywords: 'flats hinjewadi under 1 crore, apartments hinjewadi below 1 crore pune',
        infraScore: 93, rentalYield: '5.5% - 6.2%', commutePhase1: '10 mins',
        highlights: ['Large 2 & 3 BHK options', 'Premium specifications', 'Community living']
    },
    'township-in-hinjewadi-pune': {
        title: 'Township in Hinjewadi Pune | Kolte Patil Life Republic 390 Acres',
        description: 'Largest integrated township in Hinjewadi Pune - Kolte Patil Life Republic. 390 acres, 30+ sectors.',
        keywords: 'township hinjewadi pune, integrated township hinjewadi, life republic township',
        infraScore: 98, rentalYield: '5.5% - 7.0%', commutePhase1: '10 mins',
        highlights: ['Largest township in Pune West', '390 acres master-planned', 'Self-sustaining city within a city']
    },
    'rera-approved-flats-hinjewadi': {
        title: 'RERA Approved Flats in Hinjewadi Pune | Life Republic',
        description: 'All RERA approved and compliant flats in Hinjewadi at Kolte Patil Life Republic. 100% legal transparency.',
        keywords: 'rera approved flats hinjewadi, rera registered projects hinjewadi pune',
        infraScore: 97, rentalYield: '5.5% - 6.5%', commutePhase1: '10 mins',
        highlights: ['100% RERA compliant', 'Clear title properties', 'Kolte Patil trusted brand']
    },
    'flats-near-pimpri-chinchwad': {
        title: 'Flats Near Pimpri Chinchwad | Life Republic Hinjewadi',
        description: 'Premium flats near PCMC in Kolte Patil Life Republic Hinjewadi. Best connectivity to industrial belt.',
        keywords: 'flats near pimpri chinchwad, apartments near pcmc hinjewadi pune',
        infraScore: 88, rentalYield: '5.5% - 6.2%', commutePhase1: '20 mins',
        highlights: ['PCMC industrial belt access', 'Affordable pricing', 'Metro line connectivity']
    },
    'flats-near-baner-pune': {
        title: 'Flats Near Baner Pune | Kolte Patil Life Republic Hinjewadi',
        description: 'Premium flats near Baner at Kolte Patil Life Republic. Township living at Baner-adjacent pricing.',
        keywords: 'flats near baner pune, apartments near baner hinjewadi, property baner pune',
        infraScore: 90, rentalYield: '5.2% - 5.8%', commutePhase1: '20 mins',
        highlights: ['Baner lifestyle access', 'Better value than Baner', 'Township ecosystem advantage']
    },
    'flats-near-balewadi-pune': {
        title: 'Flats Near Balewadi Pune | Life Republic Township Hinjewadi',
        description: 'Luxury flats near Balewadi at Kolte Patil Life Republic Hinjewadi. Premium township living.',
        keywords: 'flats near balewadi pune, property near balewadi hinjewadi',
        infraScore: 89, rentalYield: '5.2% - 5.8%', commutePhase1: '18 mins',
        highlights: ['Balewadi High Street access', 'Sports infrastructure', 'Premium social circle']
    },
    'investment-property-hinjewadi-pune': {
        title: 'Best Investment Property in Hinjewadi Pune 2026 | Life Republic',
        description: 'Top investment opportunities in Hinjewadi Pune. Kolte Patil Life Republic offers highest ROI potential.',
        keywords: 'investment property hinjewadi, best investment hinjewadi pune 2026, real estate investment pune',
        infraScore: 95, rentalYield: '6.0% - 7.5%', commutePhase1: '10 mins',
        highlights: ['18% YoY appreciation', 'Rental yield up to 7.5%', 'Metro-driven value surge']
    },
    'nri-property-investment-pune': {
        title: 'NRI Property Investment in Pune | Kolte Patil Life Republic',
        description: 'Best NRI-friendly property investment in Pune. Kolte Patil Life Republic offers hassle-free ownership.',
        keywords: 'nri property investment pune, nri flats pune, overseas indian property hinjewadi',
        infraScore: 94, rentalYield: '5.5% - 7.0%', commutePhase1: '10 mins',
        highlights: ['NRI-friendly documentation', 'Rental management services', 'USD/INR arbitrage opportunity']
    },
    'smart-homes-hinjewadi-pune': {
        title: 'Smart Homes in Hinjewadi Pune | Kolte Patil Life Republic Qrious',
        description: 'Tech-enabled smart homes in Hinjewadi Pune. Kolte Patil Life Republic Qrious with Planet App.',
        keywords: 'smart homes hinjewadi pune, tech enabled flats hinjewadi, iot homes pune',
        infraScore: 93, rentalYield: '5.8% - 6.5%', commutePhase1: '10 mins',
        highlights: ['Planet App integration', 'IoT-enabled living', 'Smart security systems']
    },
    'row-houses-hinjewadi-pune': {
        title: 'Row Houses in Hinjewadi Pune | Life Republic 24K Espada',
        description: 'Exclusive row houses in Hinjewadi Pune. Kolte Patil Life Republic 24K Espada & Sound of Soul.',
        keywords: 'row houses hinjewadi pune, villa row houses hinjewadi, premium row houses pune',
        infraScore: 96, rentalYield: '4.5% - 5.5%', commutePhase1: '10 mins',
        highlights: ['Private gardens', 'Ultra-luxury specifications', 'Exclusive 24K Club access']
    },
    'penthouse-in-hinjewadi': {
        title: 'Penthouse in Hinjewadi Pune | Kolte Patil Life Republic',
        description: 'Exclusive penthouses in Hinjewadi Pune at Kolte Patil Life Republic. Sky-high luxury living.',
        keywords: 'penthouse hinjewadi pune, luxury penthouse hinjewadi, top floor apartments pune',
        infraScore: 95, rentalYield: '4.5% - 5.5%', commutePhase1: '10 mins',
        highlights: ['Panoramic township views', 'Private terrace', 'Ultra-premium specifications']
    },
    'flats-near-mumbai-pune-expressway': {
        title: 'Flats Near Mumbai Pune Expressway | Life Republic Hinjewadi',
        description: 'Premium flats near Mumbai-Pune Expressway at Kolte Patil Life Republic Hinjewadi township.',
        keywords: 'flats near mumbai pune expressway, apartments near expressway hinjewadi',
        infraScore: 93, rentalYield: '5.5% - 6.5%', commutePhase1: '12 mins',
        highlights: ['12 min to Expressway', 'Mumbai weekend connectivity', 'Dual-city lifestyle']
    },
    'flats-near-hinjewadi-metro-station': {
        title: 'Flats Near Hinjewadi Metro Station | Life Republic Pune',
        description: 'Flats near upcoming Hinjewadi Metro station. Kolte Patil Life Republic township Pune.',
        keywords: 'flats near hinjewadi metro, apartments hinjewadi metro station pune',
        infraScore: 96, rentalYield: '6.5% - 7.5%', commutePhase1: '5 mins',
        highlights: ['Metro station within 2 km', 'Highest appreciation potential', 'Transit-oriented development']
    },
    'gated-community-hinjewadi-pune': {
        title: 'Gated Community in Hinjewadi Pune | Life Republic Township',
        description: 'Best gated community in Hinjewadi Pune. Kolte Patil Life Republic 390-acre secure township.',
        keywords: 'gated community hinjewadi pune, secure township hinjewadi, gated society pune',
        infraScore: 97, rentalYield: '5.5% - 6.5%', commutePhase1: '10 mins',
        highlights: ['Multi-tier security', '24/7 CCTV surveillance', 'Gated township with controlled access']
    },
    'family-flats-hinjewadi': {
        title: 'Best Family Flats in Hinjewadi Pune | Life Republic Township',
        description: 'Family-friendly flats in Hinjewadi with schools, parks, and sports. Kolte Patil Life Republic.',
        keywords: 'family flats hinjewadi, family apartments pune, kid friendly township hinjewadi',
        infraScore: 96, rentalYield: '5.5% - 6.2%', commutePhase1: '10 mins',
        highlights: ['Anisha Global School inside', '40+ sports amenities', 'Safe play zones for kids']
    },
    'resale-flats-life-republic': {
        title: 'Resale Flats in Life Republic Hinjewadi | Best Deals 2026',
        description: 'Find the best resale flats in Kolte Patil Life Republic Hinjewadi Pune. Verified listings.',
        keywords: 'resale flats life republic, second hand flats life republic hinjewadi, resale property pune',
        infraScore: 95, rentalYield: '5.8% - 6.5%', commutePhase1: '10 mins',
        highlights: ['Ready-to-move options', 'Established community', 'Proven appreciation history']
    },
    'rental-flats-life-republic-hinjewadi': {
        title: 'Rental Flats in Life Republic Hinjewadi | Top Rentals 2026',
        description: 'Best rental flats in Kolte Patil Life Republic Hinjewadi. Fully furnished and semi-furnished.',
        keywords: 'rental flats life republic, rent flats hinjewadi, life republic rent apartments',
        infraScore: 95, rentalYield: '6.0% - 7.5%', commutePhase1: '10 mins',
        highlights: ['High rental demand', 'IT professional tenant base', 'Premium rental yields']
    },
    'kolte-patil-hinjewadi-pune': {
        title: 'Kolte Patil Hinjewadi Pune | Life Republic Site',
        description: 'Kolte Patil Developers Hinjewadi Pune. Life Republic - largest 390-acre integrated township.',
        keywords: 'kolte patil hinjewadi, kolte patil pune, kolte patil life republic hinjewadi',
        infraScore: 98, rentalYield: '5.5% - 7.0%', commutePhase1: '10 mins',
        highlights: ['Kolte Patil trusted legacy', '30+ years in Pune real estate', 'BSE-listed developer']
    },
};

// All expanded PSEO slugs for sitemap generation
export const pseoSlugs = Object.keys(pseoRegistry);
