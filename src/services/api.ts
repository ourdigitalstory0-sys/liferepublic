import { supabase } from '../lib/supabase';
import type { Banner, Project, Lead, Amenity } from '../lib/types';
import { projects as projectsRegistry } from '../data/projects';
import { emailService } from './email';
import townshipKB from '../data/township_kb.json';


const normalizeUrl = (url: string | null | undefined): string => {
    if (!url || typeof url !== 'string') return '';
    return url.replace(/https?:\/\/liferepublic\.in\//g, '/');
};

export const api = {
    banners: {
        getAll: async (page = 1, limit = 50) => {
            const start = (page - 1) * limit;
            const end = start + limit - 1;
            const { data } = await supabase
                .from('banners')
                .select('*')
                .order('order', { ascending: true })
                .range(start, end);
            return (data as Banner[]).map(b => ({
                ...b,
                image_url: normalizeUrl(b.image_url)
            }));
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
        getAll: async (page?: number, limit?: number, search?: string) => {
            let query = supabase.from('projects').select('*').order('id');
            if (search) {
                query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
            }
            if (page && limit) {
                const from = (page - 1) * limit;
                const to = from + limit - 1;
                query = query.range(from, to);
            }
            const { data, error } = await query;
            if (error) throw error;

            return (data || []).map((p) => ({
                ...p,
                image: normalizeUrl(p.image),
                masterLayout: normalizeUrl(p.master_layout),
                floorPlans: (p.floor_plans || []).map((fp: string) => normalizeUrl(fp)),
                gallery: (p.gallery || []).map((g: string) => normalizeUrl(g)),
                themeColor: p.theme_color
            })) as Project[];
        },
        getFeatured: async (limit = 3) => {
            const { data, error } = await supabase
                .from('projects')
                .select('id, title, category, location, price, image, overview, status, features, amenities, rera, theme_color')
                .limit(limit);

            if (error) throw error;

            return (data || []).map((p) => ({
                ...p,
                image: normalizeUrl(p.image),
                themeColor: p.theme_color,
                description: p.overview // Fallback description
            })) as Project[];
        },
        getById: async (id: string) => {
            const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
            if (error) throw error;
 
            const registryProject = projectsRegistry.find(p => p.id === id);

            const project = {
                ...data,
                image: normalizeUrl(data.image),
                masterLayout: normalizeUrl(data.master_layout),
                floorPlans: (data.floor_plans || []).map((fp: string) => normalizeUrl(fp)),
                gallery: (data.gallery || []).map((g: string) => normalizeUrl(g)),
                themeColor: data.theme_color || registryProject?.themeColor,
                faqs: data.faqs || registryProject?.faqs
            } as Project;

            // Track Recently Viewed
            if (typeof window !== 'undefined') {
                try {
                    const recentlyViewed = JSON.parse(localStorage.getItem('lr_recently_viewed') || '[]');
                    const filtered = recentlyViewed.filter((id: string) => id !== project.id);
                    localStorage.setItem('lr_recently_viewed', JSON.stringify([project.id, ...filtered].slice(0, 4)));
                } catch (e) { /* ignore */ }
            }
 
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
            const dbProject: Record<string, unknown> = { ...project };
            if ('masterLayout' in project) {
                dbProject.master_layout = project.masterLayout;
                delete dbProject.masterLayout;
            }
            if ('floorPlans' in project) {
                dbProject.floor_plans = project.floorPlans;
                delete dbProject.floorPlans;
            }
            if ('themeColor' in project) {
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
        getCount: async (search?: string) => {
            let query = supabase.from('projects').select('*', { count: 'exact', head: true });
            if (search) {
                query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
            }
            const { count, error } = await query;
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
            // Advanced Lead Scoring
            let score = 0;
            const message = (lead.message || '').toLowerCase();
            if (message.includes('crore') || message.includes('cr') || message.includes('luxury')) score += 50;
            if (message.includes('immediate') || message.includes('visit')) score += 30;
            if (lead.project_id) score += 20;

            const { error } = await supabase.from('leads').insert({ 
                ...lead, 
                status: 'New',
                score: score // Assuming score column exists or handling in metadata
            });
            if (error) throw error;

            // Send email notification (non-blocking)
            emailService.sendLeadNotification({
                name: lead.name,
                phone: lead.phone,
                email: lead.email,
                message: lead.message,
                project: lead.project_id ? `Project ID: ${lead.project_id} (Score: ${score})` : `Score: ${score}`
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
            return (data as Amenity[]).map(a => ({
                ...a,
                image_url: normalizeUrl(a.image_url)
            }));
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
    },
    township: {
        searchKnowledgeBase: async (query: string) => {
            const q = query.toLowerCase();
            const facts = [
                ...townshipKB.township.key_infrastructure,
                ...townshipKB.township.hospitals_nearby.map(h => ({ name: h.name, description: `Distance: ${h.distance}` }))
            ];
            
            const matches = facts.filter(f => 
                f.name.toLowerCase().includes(q) || 
                (f as any).description?.toLowerCase().includes(q) ||
                (f as any).type?.toLowerCase().includes(q)
            );

            return matches.length > 0 ? matches : null;
        }
    }
};
