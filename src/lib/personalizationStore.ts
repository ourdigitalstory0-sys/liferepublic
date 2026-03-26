/**
 * Personalization Store
 * Manages user browsing history and preferences in localStorage
 */

const STORAGE_KEY = 'lr_personalization';
const MAX_RECENT_PROJECTS = 6;

interface UserHistory {
    recentlyViewed: string[]; // project slugs
    lastSector?: string;
    visitCount: number;
    lastVisit: number;
}

export const personalizationStore = {
    getHistory(): UserHistory {
        if (typeof window === 'undefined') return { recentlyViewed: [], visitCount: 0, lastVisit: Date.now() };
        
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return { recentlyViewed: [], visitCount: 0, lastVisit: Date.now() };
        }
        try {
            return JSON.parse(data);
        } catch {
            return { recentlyViewed: [], visitCount: 0, lastVisit: Date.now() };
        }
    },

    trackProjectView(slug: string) {
        if (typeof window === 'undefined') return;

        const history = this.getHistory();
        
        // Update recently viewed (move to front, remove duplicates, limit count)
        const updatedRecent = [
            slug,
            ...history.recentlyViewed.filter(s => s !== slug)
        ].slice(0, MAX_RECENT_PROJECTS);

        const newHistory: UserHistory = {
            ...history,
            recentlyViewed: updatedRecent,
            visitCount: history.visitCount + 1,
            lastVisit: Date.now()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    },

    trackSectorVisit(sectorId: string) {
        if (typeof window === 'undefined') return;

        const history = this.getHistory();
        const newHistory: UserHistory = {
            ...history,
            lastSector: sectorId,
            lastVisit: Date.now()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    },

    clearHistory() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
    }
};
