import { supabase } from '../lib/supabase';
import type { Banner, Project } from '../lib/types';

export const api = {
    banners: {
        getAll: async () => {
            const { data, error } = await supabase
                .from('banners')
                .select('*')
                .order('order', { ascending: true });
            if (error) throw error;
            return data as Banner[];
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
        getAll: async () => {
            const { data, error } = await supabase.from('projects').select('*');
            if (error) throw error;

            return data.map((p: any) => ({
                ...p,
                masterLayout: p.master_layout,
                floorPlans: p.floor_plans,
                themeColor: p.theme_color
            })) as Project[];
        },
        getById: async (id: string) => {
            const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
            if (error) throw error;

            return {
                ...data,
                masterLayout: data.master_layout,
                floorPlans: data.floor_plans,
                themeColor: data.theme_color
            } as Project;
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
                theme_color: project.themeColor
            };
            const { data, error } = await supabase.from('projects').insert(dbProject).select().single();
            if (error) throw error;
            return data;
        },
        update: async (id: string, project: Partial<Project>) => {
            // Transform partial update
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
