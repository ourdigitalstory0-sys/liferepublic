import { supabase } from '../lib/supabase';
import type { Banner, Project, Lead, Amenity } from '../lib/types';
import { projectsRegistry } from '../data/projects';
import { ID_TO_SLUG } from '../data/slug-registry';
import { emailService } from './email';
import townshipKB from '../data/township_kb.json';


const normalizeUrl = (url: string | null | undefined): string => {
    if (!url || typeof url !== 'string') return '';
    return url.replace(/https?:\/\/(life-republic\.in|liferepublic\.in)\//g, '/');
};

// Centralized Error Handling & Logging
const handleApiError = (error: any, context: string) => {
    console.error(`[API Error] ${context}:`, error);
    // Future: Integrate with Sentry or LogRocket
    throw error;
};

// Sovereign Vault: Local persistence for leads to prevent data loss
const sovereignVault = {
    saveLead: (lead: any) => {
        try {
            const vault = JSON.parse(localStorage.getItem('lr_sovereign_vault') || '[]');
            vault.push({ ...lead, timestamp: new Date().toISOString(), synced: false });
            localStorage.setItem('lr_sovereign_vault', JSON.stringify(vault));
        } catch (e) {
            console.error("Vault Error:", e);
        }
    },
    getUnsynced: () => {
        try {
            const vault = JSON.parse(localStorage.getItem('lr_sovereign_vault') || '[]');
            return vault.filter((l: any) => !l.synced);
        } catch (e) { return []; }
    }
};

export const api = {
    banners: {
        getAll: async (page = 1, limit = 50) => {
            try {
                const start = (page - 1) * limit;
                const end = start + limit - 1;
                const { data, error } = await supabase
                    .from('banners')
                    .select('*')
                    .order('order', { ascending: true })
                    .range(start, end);
                if (error) throw error;
                return (data as Banner[]).map(b => ({
                    ...b,
                    image_url: normalizeUrl(b.image_url)
                }));
            } catch (e) { return handleApiError(e, 'banners.getAll'); }
        },
        getCount: async () => {
            try {
                const { count, error } = await supabase
                    .from('banners')
                    .select('*', { count: 'exact', head: true });
                if (error) throw error;
                return count || 0;
            } catch (e) { return handleApiError(e, 'banners.getCount'); }
        },
        create: async (banner: Omit<Banner, 'id'>) => {
            try {
                const { data, error } = await supabase.from('banners').insert(banner).select().single();
                if (error) throw error;
                return data;
            } catch (e) { return handleApiError(e, 'banners.create'); }
        },
        update: async (id: number, updates: Partial<Banner>) => {
            try {
                const { data, error } = await supabase.from('banners').update(updates).eq('id', id).select().single();
                if (error) throw error;
                return data;
            } catch (e) { return handleApiError(e, 'banners.update'); }
        },
        delete: async (id: number) => {
            try {
                const { error } = await supabase.from('banners').delete().eq('id', id);
                if (error) throw error;
            } catch (e) { return handleApiError(e, 'banners.delete'); }
        }
    },
    projects: {
        getAll: async (page?: number, limit?: number, search?: string) => {
            try {
                // FORCE Sovereign Local Registry for SEO-perfect image paths and schema compliance
                let results = [...projectsRegistry];
                
                if (search) {
                    const searchLower = search.toLowerCase();
                    results = results.filter(p => 
                        p.title.toLowerCase().includes(searchLower) || 
                        p.location.toLowerCase().includes(searchLower)
                    );
                }
                
                if (page && limit) {
                    const start = (page - 1) * limit;
                    results = results.slice(start, start + limit);
                }
                
                return results;
            } catch (e) { 
                console.log('[Sovereign Critical Fail-safe] Serving all projects from local registry after catch block.');
                return projectsRegistry;
            }
        },
        getFeatured: async (limit = 3) => {
            try {
                // FORCE Sovereign Local Registry
                return projectsRegistry.slice(0, limit);
            } catch (e) { 
                console.log('[Sovereign Critical Fail-safe] Serving featured projects from local registry after catch block.');
                return projectsRegistry.slice(0, limit);
            }
        },
        getById: async (id: string) => {
            const rawId = id.trim().replace(/\/$/, '');
            
            try {
                const mappedId = ID_TO_SLUG[rawId] || rawId;
                const localProject = projectsRegistry.find((p: Project) => p.id === mappedId) || 
                                     projectsRegistry.find((p: Project) => ID_TO_SLUG[p.id] === mappedId);
                
                if (!localProject) throw new Error('Project not found');
                
                // Track Recently Viewed
                if (typeof window !== 'undefined') {
                    try {
                        const recentlyViewed = JSON.parse(localStorage.getItem('lr_recently_viewed') || '[]');
                        const filtered = recentlyViewed.filter((vid: string) => vid !== localProject.id);
                        localStorage.setItem('lr_recently_viewed', JSON.stringify([localProject.id, ...filtered].slice(0, 4)));
                    } catch (e) { /* ignore */ }
                }

                return localProject;
            } catch (e) {
                return handleApiError(e, `projects.getById(${rawId})`);
            }
        },
        create: async (project: Project) => {
            try {
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
            } catch (e) { return handleApiError(e, 'projects.create'); }
        },
        update: async (id: string, project: Partial<Project>) => {
            try {
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
            } catch (e) { return handleApiError(e, 'projects.update'); }
        },
        delete: async (id: string) => {
            try {
                const { error } = await supabase.from('projects').delete().eq('id', id);
                if (error) throw error;
            } catch (e) { return handleApiError(e, 'projects.delete'); }
        },
        getCount: async (search?: string) => {
            try {
                let query = supabase.from('projects').select('*', { count: 'exact', head: true });
                if (search) {
                    query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
                }
                const { count, error } = await query;
                if (error) throw error;
                return count || 0;
            } catch (e) { return handleApiError(e, 'projects.getCount'); }
        }
    },
    leads: {
        getAll: async (page = 1, limit = 50) => {
            try {
                const start = (page - 1) * limit;
                const end = start + limit - 1;
                const { data, error } = await supabase
                    .from('leads')
                    .select('*, projects(title)')
                    .order('created_at', { ascending: false })
                    .range(start, end);
                if (error) throw error;
                return data;
            } catch (e) { return handleApiError(e, 'leads.getAll'); }
        },
        getCount: async () => {
            try {
                const { count, error } = await supabase
                    .from('leads')
                    .select('*', { count: 'exact', head: true });
                if (error) throw error;
                return count || 0;
            } catch (e) { return handleApiError(e, 'leads.getCount'); }
        },
        create: async (lead: Omit<Lead, 'id' | 'created_at' | 'status'>) => {
            // Save to Vault first (Local Persistence)
            sovereignVault.saveLead(lead);

            // Attribution Intelligence
            const attribution = {
                entry_page: sessionStorage.getItem('lr_entry_page') || 'Direct',
                referrer: document.referrer || 'Direct',
                user_journey: JSON.parse(localStorage.getItem('lr_recently_viewed') || '[]').join(' -> ')
            };

            const personalHistory = typeof window !== 'undefined' 
                ? JSON.parse(localStorage.getItem('lr_user_history') || '{}')
                : {};
            
            const sessionIntentScore = personalHistory.intentScore || 0;

            let score = sessionIntentScore;
            const message = (lead.message || '').toLowerCase();
            const recentlyViewed = JSON.parse(localStorage.getItem('lr_recently_viewed') || '[]');
            
            // Content Scoring
            if (message.includes('crore') || message.includes('cr') || message.includes('luxury')) score += 50;
            if (message.includes('immediate') || message.includes('visit')) score += 30;
            
            // Journey Velocity Scoring
            if (recentlyViewed.length > 2) score += 40; // Deep interest in multiple sectors
            if (lead.project_id) score += 20;

            // 1. Fire email notification (Primary Fail-safe)
            let emailSent = false;
            try {
                await emailService.sendLeadNotification({
                    name: lead.name,
                    phone: lead.phone,
                    email: lead.email,
                    message: `${lead.message} [Score: ${score}] [Journey: ${attribution.user_journey}]`,
                    project: lead.project_id ? `Project ID: ${lead.project_id}` : `Attribution: ${attribution.entry_page}`
                });
                emailSent = true;
            } catch (e) {
                console.error("Email dispatch failed.");
            }

            // 2. Try Supabase Insert
            try {
                const { error } = await supabase.from('leads').insert({ 
                    ...lead, 
                    status: 'New',
                    score: score,
                    metadata: {
                        ...attribution,
                        interest_score: score,
                        sectors_viewed: recentlyViewed
                    }
                });
                
                if (error) throw error;

                // Mark as synced in vault
                const vault = JSON.parse(localStorage.getItem('lr_sovereign_vault') || '[]');
                const last = vault[vault.length - 1];
                if (last) last.synced = true;
                localStorage.setItem('lr_sovereign_vault', JSON.stringify(vault));
                
                return null;
            } catch (e) {
                console.error("Database connection failed.", e);
                // If DB fails AND email fails, we MUST throw so UI can show WhatsApp fallback
                if (!emailSent) {
                    throw new Error("Both Database and Email systems failed.");
                }
                return null; // DB failed but email succeeded, so treat as UI success
            }
        },
        updateStatus: async (id: number, status: 'New' | 'Contacted' | 'Closed') => {
            try {
                const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select().single();
                if (error) throw error;
                return data;
            } catch (e) { return handleApiError(e, 'leads.updateStatus'); }
        },
        delete: async (id: number) => {
            try {
                const { error } = await supabase.from('leads').delete().eq('id', id);
                if (error) throw error;
            } catch (e) { return handleApiError(e, 'leads.delete'); }
        }
    },
    amenities: {
        getAll: async () => {
            try {
                const { data, error } = await supabase
                    .from('amenities')
                    .select('*')
                    .order('order', { ascending: true });
                if (error) throw error;
                return (data as Amenity[]).map(a => ({
                    ...a,
                    image_url: normalizeUrl(a.image_url)
                }));
            } catch (e) { return handleApiError(e, 'amenities.getAll'); }
        },
        create: async (amenity: Omit<Amenity, 'id' | 'created_at'>) => {
            try {
                const { data, error } = await supabase.from('amenities').insert(amenity).select().single();
                if (error) throw error;
                return data;
            } catch (e) { return handleApiError(e, 'amenities.create'); }
        },
        update: async (id: number, updates: Partial<Amenity>) => {
            try {
                const { data, error } = await supabase.from('amenities').update(updates).eq('id', id).select().single();
                if (error) throw error;
                return data;
            } catch (e) { return handleApiError(e, 'amenities.update'); }
        },
        delete: async (id: number) => {
            try {
                const { error } = await supabase.from('amenities').delete().eq('id', id);
                if (error) throw error;
            } catch (e) { return handleApiError(e, 'amenities.delete'); }
        }
    },
    upload: {
        image: async (file: File, bucket: 'projects' | 'banners' = 'projects') => {
            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error } = await supabase.storage.from(bucket).upload(filePath, file);
                if (error) throw error;

                const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
                return data.publicUrl;
            } catch (e) { return handleApiError(e, 'upload.image'); }
        }
    },
    township: {
        searchKnowledgeBase: async (query: string) => {
            try {
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
            } catch (e) { return handleApiError(e, 'township.searchKnowledgeBase'); }
        }
    }
};
