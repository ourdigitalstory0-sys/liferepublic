/**
 * Personalization Store (Neural Intelligence v6.5)
 * Manages deep user behavioral history and intent scoring with temporal decay.
 */

const STORAGE_KEY = 'lr_sovereign_intelligence';
const MAX_RECENT_PROJECTS = 12;
const DECAY_FACTOR = 0.90; // Accelerated daily interest decay for 2026
const RETENTION_DAYS = 90;

interface SectorMetric {
    id: string;
    visitCount: number;
    lastVisit: number;
    dwellFactor: number; // 0.0 to 1.0 weight based on interaction intensity
    intentMultiplier: number;
}

interface UserHistory {
    recentlyViewed: string[]; // project IDs/slugs
    lastSector?: string;
    sectorMetrics: Record<string, SectorMetric>;
    visitCount: number;
    lastVisit: number;
    searchQueries: string[];
    intentScore: number;
    hasGeneratedThesis: boolean;
    sentiment: 'curious' | 'intent' | 'high-intent' | 'advocate';
    lastToolUsed?: string;
    lastInteractionType?: 'VIEW' | 'SEARCH' | 'TOOL' | 'CONVERSION';
}

export const personalizationStore = {
    getHistory(): UserHistory {
        if (typeof window === 'undefined') return this.getDefaultHistory();
        
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return this.getDefaultHistory();
        
        try {
            const parsed = JSON.parse(data);
            const history: UserHistory = {
                ...this.getDefaultHistory(),
                ...parsed,
                recentlyViewed: parsed.recentlyViewed || [],
                searchQueries: parsed.searchQueries || [],
                sectorMetrics: parsed.sectorMetrics || {}
            };

            // 1. Apply Temporal Intent Decay (Sovereign Recency Bias)
            const now = Date.now();
            const daysSinceLastVisit = (now - history.lastVisit) / (1000 * 60 * 60 * 24);
            
            if (daysSinceLastVisit > 1) {
                // Exponential decay for inactive leads
                history.intentScore = Math.floor(history.intentScore * Math.pow(DECAY_FACTOR, daysSinceLastVisit));
                
                // Also decay sector metrics to prioritize fresh interest
                Object.keys(history.sectorMetrics).forEach(sid => {
                    const m = history.sectorMetrics[sid];
                    m.intentMultiplier = Math.max(1.0, m.intentMultiplier * Math.pow(DECAY_FACTOR, daysSinceLastVisit));
                });
            }

            // 2. Data Retention Cleanup
            if (daysSinceLastVisit > RETENTION_DAYS) {
                return this.getDefaultHistory();
            }

            return history;
        } catch {
            return this.getDefaultHistory();
        }
    },

    getDefaultHistory(): UserHistory {
        return {
            recentlyViewed: [],
            visitCount: 0,
            lastVisit: Date.now(),
            searchQueries: [],
            intentScore: 0,
            hasGeneratedThesis: false,
            sectorMetrics: {},
            sentiment: 'curious'
        };
    },

    saveHistory(history: UserHistory) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        window.dispatchEvent(new Event('storage'));
    },

    updateIntentScore(points: number, interaction?: UserHistory['lastInteractionType']) {
        const history = this.getHistory();
        const currentScore = history.intentScore || 0;
        
        // Multiplier based on interaction velocity
        let multiplier = 1.0;
        if (interaction === 'CONVERSION') multiplier = 2.5;
        if (interaction === 'TOOL') multiplier = 1.8;
        
        const newScore = Math.min(2000, currentScore + Math.floor(points * multiplier));
        
        // Sentiment Synthesis Protocol v6.5
        let sentiment: UserHistory['sentiment'] = history.sentiment;
        if (newScore > 1200) sentiment = 'advocate';
        else if (newScore > 600) sentiment = 'high-intent';
        else if (newScore > 200) sentiment = 'intent';
        
        this.saveHistory({
            ...history,
            intentScore: newScore,
            sentiment,
            lastInteractionType: interaction || history.lastInteractionType,
            lastVisit: Date.now()
        });
    },

    trackProjectView(projectId: string) {
        const history = this.getHistory();
        const updatedRecent = [
            projectId,
            ...history.recentlyViewed.filter(id => id !== projectId)
        ].slice(0, MAX_RECENT_PROJECTS);

        this.saveHistory({
            ...history,
            recentlyViewed: updatedRecent,
            visitCount: (history.visitCount || 0) + 1,
            lastVisit: Date.now(),
            intentScore: (history.intentScore || 0) + 25,
            lastInteractionType: 'VIEW'
        });
    },

    trackSectorVisit(sectorId: string) {
        const history = this.getHistory();
        const metrics = { ...(history.sectorMetrics || {}) };
        
        const existing = metrics[sectorId] || { 
            id: sectorId, 
            visitCount: 0, 
            lastVisit: Date.now(), 
            dwellFactor: 0.1,
            intentMultiplier: 1.0
        };

        metrics[sectorId] = {
            ...existing,
            visitCount: existing.visitCount + 1,
            lastVisit: Date.now(),
            dwellFactor: Math.min(existing.dwellFactor + 0.1, 1.0),
            intentMultiplier: Math.min(existing.intentMultiplier + 0.15, 2.5)
        };

        this.saveHistory({
            ...history,
            lastSector: sectorId,
            sectorMetrics: metrics,
            lastVisit: Date.now(),
            intentScore: (history.intentScore || 0) + 15
        });
    },

    trackSearchQuery(query: string) {
        if (!query) return;
        const history = this.getHistory();
        const queries = [query, ...history.searchQueries.filter(q => q !== query)].slice(0, 10);
        
        this.saveHistory({
            ...history,
            searchQueries: queries,
            lastVisit: Date.now(),
            intentScore: (history.intentScore || 0) + 10,
            lastInteractionType: 'SEARCH'
        });
    },

    clearHistory() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event('storage'));
    }
};

// Hook for real-time UI synchronization
import { useState, useEffect } from 'react';

export const usePersonalizationStore = () => {
    const [history, setHistory] = useState<UserHistory>(personalizationStore.getHistory());

    useEffect(() => {
        const handleStorage = () => setHistory(personalizationStore.getHistory());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return {
        history,
        ...personalizationStore
    };
};
