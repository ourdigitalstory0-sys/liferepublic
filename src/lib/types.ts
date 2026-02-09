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
    gallery?: string[]; // Added for DB
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
