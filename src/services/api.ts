import { supabase } from '../lib/supabase';
import type { Banner, Project, Lead, Amenity } from '../lib/types';
import { emailService } from './email';



// Map DB IDs (short) to SEO IDs (long)
const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi'
};

// Map SEO IDs (long) to DB IDs (short)
const SLUG_TO_ID: Record<string, string> = Object.entries(ID_TO_SLUG).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {} as Record<string, string>);

export const api = {
    banners: {
        getAll: async (page = 1, limit = 50) => {
            const start = (page - 1) * limit;
            const end = start + limit - 1;
            const { data, error } = await supabase
                .from('banners')
                .select('*')
                .order('order', { ascending: true })
                .range(start, end);
            if (error) throw error;
            return data as Banner[];
        },
        getCount: async () => {
            const { count, error } = await supabase
                .from('banners')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        },
        create: async (banner: Omit<Banner, 'id'>) => {
            const { data, error } = await supabase.from('banners').insert(banner).select().single();
            if (error) throw error;
            return data;
        },
        update: async (id: number, updates: Partial<Banner>) => {
            const { data, error } = await supabase.from('banners').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        delete: async (id: number) => {
            const { error } = await supabase.from('banners').delete().eq('id', id);
            if (error) throw error;
        }
    },
    projects: {
        getAll: async (page = 1, limit = 50) => {
            const start = (page - 1) * limit;
            const end = start + limit - 1;
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .range(start, end);
            if (error) throw error;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return data.map((p: any) => ({
                ...p,
                id: ID_TO_SLUG[p.id] || p.id, // Use mapped slug if available, else original ID
                masterLayout: p.master_layout,
                floorPlans: p.floor_plans,
                themeColor: p.theme_color
            })) as Project[];
        },
        getFeatured: async (limit = 3) => {
            const { data, error } = await supabase
                .from('projects')
                .select('id, title, category, location, price, image, overview, status, features, amenities, rera, theme_color')
                .limit(limit);

            if (error) throw error;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return data.map((p: any) => ({
                ...p,
                id: ID_TO_SLUG[p.id] || p.id,
                themeColor: p.theme_color
            })) as Project[];
        },
        getById: async (id: string) => {
            // Check if input is a slug that needs mapping to a short ID
            const dbId = SLUG_TO_ID[id] || id;

            const { data, error } = await supabase.from('projects').select('*').eq('id', dbId).single();
            if (error) throw error;

            const project = {
                ...data,
                id: ID_TO_SLUG[data.id] || data.id, // Ensure returned object has the long slug
                masterLayout: data.master_layout,
                floorPlans: data.floor_plans,
                themeColor: data.theme_color
            } as Project;

            return project;
        },
        create: async (project: Project) => {
            // Transform frontend camelCase to DB snake_case
            const dbProject = {
                id: project.id,
                title: project.title,
                category: project.category,
                location: project.location,
                price: project.price,
                image: project.image,
                description: project.description,
                overview: project.overview,
                features: project.features,
                amenities: project.amenities,
                master_layout: project.masterLayout,
                floor_plans: project.floorPlans,
                gallery: project.gallery,
                status: project.status,
                rera: project.rera,
                theme_color: project.themeColor
            };
            const { data, error } = await supabase.from('projects').insert(dbProject).select().single();
            if (error) throw error;
            return data;
        },
        update: async (id: string, project: Partial<Project>) => {
            // Transform partial update
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dbProject: any = { ...project };
            if (project.masterLayout) {
                dbProject.master_layout = project.masterLayout;
                delete dbProject.masterLayout;
            }
            if (project.floorPlans) {
                dbProject.floor_plans = project.floorPlans;
                delete dbProject.floorPlans;
            }
            if (project.themeColor) {
                dbProject.theme_color = project.themeColor;
                delete dbProject.themeColor;
            }

            const { data, error } = await supabase.from('projects').update(dbProject).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        delete: async (id: string) => {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
        },
        getCount: async () => {
            const { count, error } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        }
    },
    leads: {
        getAll: async (page = 1, limit = 50) => {
            const start = (page - 1) * limit;
            const end = start + limit - 1;
            const { data, error } = await supabase
                .from('leads')
                .select('*, projects(title)')
                .order('created_at', { ascending: false })
                .range(start, end);
            if (error) throw error;
            return data;
        },
        getCount: async () => {
            const { count, error } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        },
        create: async (lead: Omit<Lead, 'id' | 'created_at' | 'status'>) => {
            const { error } = await supabase.from('leads').insert({ ...lead, status: 'New' });
            if (error) throw error;

            // Send email notification (non-blocking)
            emailService.sendLeadNotification({
                name: lead.name,
                phone: lead.phone,
                email: lead.email,
                message: lead.message,
                project: (lead as any).project_id ? `Project ID: ${(lead as any).project_id}` : undefined
            });

            return null;
        },
        updateStatus: async (id: number, status: 'New' | 'Contacted' | 'Closed') => {
            const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        delete: async (id: number) => {
            const { error } = await supabase.from('leads').delete().eq('id', id);
            if (error) throw error;
        }
    },
    amenities: {
        getAll: async () => {
            const { data, error } = await supabase
                .from('amenities')
                .select('*')
                .order('order', { ascending: true });
            if (error) throw error;
            return data as Amenity[];
        },
        create: async (amenity: Omit<Amenity, 'id' | 'created_at'>) => {
            const { data, error } = await supabase.from('amenities').insert(amenity).select().single();
            if (error) throw error;
            return data;
        },
        update: async (id: number, updates: Partial<Amenity>) => {
            const { data, error } = await supabase.from('amenities').update(updates).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        delete: async (id: number) => {
            const { error } = await supabase.from('amenities').delete().eq('id', id);
            if (error) throw error;
        }
    },
    upload: {
        image: async (file: File, bucket: 'projects' | 'banners' = 'projects') => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error } = await supabase.storage.from(bucket).upload(filePath, file);
            if (error) throw error;

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
            return data.publicUrl;
        }
    }
};
