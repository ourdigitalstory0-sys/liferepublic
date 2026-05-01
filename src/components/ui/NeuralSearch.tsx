import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, ArrowRight, Sparkles, MapPin, Building, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchSynthesis, type SearchResult } from '../../lib/search-synthesis';
import { personalizationStore } from '../../lib/personalizationStore';

export const NeuralSearch: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const history = personalizationStore.getHistory();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const performSearch = async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setIsSearching(true);
            const res = await searchSynthesis.query(query);
            setResults(res);
            setIsSearching(false);
            setSelectedIndex(0);
        };

        const timer = setTimeout(performSearch, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const handleSelect = (result: SearchResult) => {
        personalizationStore.trackSearchQuery(query);
        navigate(result.slug);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 bg-secondary/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100"
                        onKeyDown={handleKeyDown}
                    >
                        {/* Search Input */}
                        <div className="relative p-6 border-b border-gray-100 flex items-center gap-4">
                            <Search className={`${isSearching ? 'animate-pulse text-accent' : 'text-gray-400'}`} size={24} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Township (e.g. '3 BHK near School', 'Echoes')..."
                                className="flex-1 bg-transparent border-none outline-none text-xl font-medium text-secondary placeholder:text-gray-300"
                            />
                            <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <Command size={10} /> K
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {results.length > 0 ? (
                                <div className="space-y-2">
                                    {results.map((result, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelect(result)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${idx === selectedIndex ? 'bg-accent/5 border-accent/20 border' : 'bg-transparent border border-transparent'}`}
                                        >
                                            <div className={`p-3 rounded-xl ${idx === selectedIndex ? 'bg-accent text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                {result.type === 'project' && <Building size={20} />}
                                                {result.type === 'sector' && <MapPin size={20} />}
                                                {result.type === 'config' && <Sparkles size={20} />}
                                                {(result.type === 'avenue' || result.type === 'locality') && <Info size={20} />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-bold transition-colors ${idx === selectedIndex ? 'text-secondary' : 'text-gray-700'}`}>
                                                    {result.title}
                                                </h4>
                                                <p className="text-xs text-gray-400">{result.subtitle}</p>
                                            </div>
                                            <ArrowRight className={`transition-all ${idx === selectedIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} size={16} />
                                        </button>
                                    ))}
                                </div>
                            ) : query.length > 0 ? (
                                <div className="py-12 text-center">
                                    <div className="text-gray-300 mb-2 font-serif italic text-lg">No tectonic matches found...</div>
                                    <p className="text-xs text-gray-400">Try searching for a sector name, configuration, or local landmark.</p>
                                </div>
                            ) : (
                                <div className="py-8 px-4">
                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Recent Intelligence Searches</h5>
                                    <div className="space-y-3">
                                        {(history.searchQueries && history.searchQueries.length > 0) ? history.searchQueries.map((q, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setQuery(q)}
                                                className="flex items-center gap-3 text-sm text-gray-500 hover:text-accent transition-colors"
                                            >
                                                <Search size={14} /> {q}
                                            </button>
                                        )) : (
                                            <div className="text-sm text-gray-400 italic">No recent searches. Try '2 BHK' or 'Universe'.</div>
                                        )}
                                    </div>

                                    <div className="mt-10 grid grid-cols-2 gap-4">
                                        <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10">
                                            <Sparkles className="text-accent mb-3" size={20} />
                                            <h6 className="font-bold text-secondary text-sm mb-1">PSEO Hubs</h6>
                                            <p className="text-[10px] text-gray-400 leading-relaxed">Instantly access 73+ hyper-local sector landing pages.</p>
                                        </div>
                                        <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10">
                                            <Command className="text-accent mb-3" size={20} />
                                            <h6 className="font-bold text-secondary text-sm mb-1">Power Queries</h6>
                                            <p className="text-[10px] text-gray-400 leading-relaxed">Search by configuration, price bracket, or infrastructure layer.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Info */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] font-medium text-gray-400">
                            <div className="flex gap-4">
                                <span><kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white">↑↓</kbd> Navigate</span>
                                <span><kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white">Enter</kbd> Select</span>
                                <span><kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white">Esc</kbd> Close</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Sparkles size={10} className="text-accent" />
                                Neural Search v1.0
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
