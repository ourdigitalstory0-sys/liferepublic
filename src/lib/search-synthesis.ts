import sectorsData from '../data/sectors.json';
import { api } from '../services/api';

export interface SearchResult {
    type: 'sector' | 'project' | 'avenue' | 'locality' | 'config';
    title: string;
    subtitle: string;
    slug: string;
    relevance: number;
}

export const searchSynthesis = {
    async query(text: string): Promise<SearchResult[]> {
        const query = text.toLowerCase().trim();
        if (query.length < 2) return [];

        const results: SearchResult[] = [];

        // 1. Check Sector Registry (PSEO Silos)
        sectorsData.sectors.forEach(s => {
            if (s.name.toLowerCase().includes(query) || s.slug.toLowerCase().includes(query) || s.id.toLowerCase().includes(query)) {
                results.push({
                    type: 'sector',
                    title: s.name,
                    subtitle: `Sector ${s.id} Intelligence Hub`,
                    slug: `/location/${s.slug}`,
                    relevance: 100
                });
            }
        });

        // 2. Check Avenues & Localities
        [...sectorsData.avenues, ...sectorsData.localities].forEach(item => {
            if (item.name.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query)) {
                results.push({
                    type: item.slug.includes('avenue') ? 'avenue' : 'locality',
                    title: item.name,
                    subtitle: 'Infrastructure Layer',
                    slug: `/location/${item.slug}`,
                    relevance: 80
                });
            }
        });

        // 3. Configuration / Type Parsing (e.g., "2 BHK", "Villas")
        const configs = [
            { key: '2 bhk', slug: '/2-bhk-flats-in-hinjewadi', title: '2 BHK Premium Flats' },
            { key: '3 bhk', slug: '/3-bhk-flats-in-hinjewadi', title: '3 BHK Luxury Flats' },
            { key: '4 bhk', slug: '/4-bhk-flats-in-hinjewadi', title: '4 BHK Ultra-Premium' },
            { key: 'villa', slug: '/luxury-villas-near-hinjewadi', title: 'Luxury Villas & Row Houses' }
        ];

        configs.forEach(c => {
            if (query.includes(c.key)) {
                results.push({
                    type: 'config',
                    title: c.title,
                    subtitle: 'Configuration Hub',
                    slug: c.slug,
                    relevance: 90
                });
            }
        });

        // 4. Project Search
        try {
            const projects = await api.projects.getAll();
            projects.forEach(p => {
                if (p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) {
                    results.push({
                        type: 'project',
                        title: p.title,
                        subtitle: p.category,
                        slug: `/projects/${p.id}`,
                        relevance: 95
                    });
                }
            });
        } catch (e) {
            console.error("Project search failed", e);
        }

        // 5. Price Bracket Synthesis (e.g., "under 80L", "cr")
        if (query.includes('cr') || query.includes('crore') || query.includes('80l') || query.includes('lakh')) {
             results.push({
                type: 'config',
                title: 'Investment Portfolio',
                subtitle: 'Filter by Price Bracket',
                slug: '/projects',
                relevance: 70
            });
        }

        // Deduplicate and Sort
        return results
            .filter((v, i, a) => a.findIndex(t => t.slug === v.slug) === i)
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 8);
    }
};
