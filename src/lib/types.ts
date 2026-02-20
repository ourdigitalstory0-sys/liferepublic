export interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    price: string;
    image: string;
    description: string;
    features: string[];
    overview?: string;
    amenities?: string[];
    masterLayout?: string;
    floorPlans?: string[];
    status?: string; // Added for DB
    gallery?: (string | { url: string; alt?: string })[]; // Added for DB
    rera?: string; // Added for RERA compliance
    themeColor?: string; // Added for UI Theme Logic
}

export interface Banner {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    image_url: string;
    link?: string;
    order: number;
}

export interface Lead {
    id: number;
    created_at: string;
    name: string;
    phone: string;
    email?: string;
    project_id?: string;
    message?: string;
    status: 'New' | 'Contacted' | 'Closed';
}

export interface Amenity {
    id: number;
    title: string;
    description: string;
    icon: string;
    image_url?: string;
    order: number;
    created_at?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    image?: string;
    author: string;
    published: boolean;
    published_at?: string;
    created_at: string;
    updated_at: string;
    tags?: string[];
    meta_title?: string;
    meta_description?: string;
}
