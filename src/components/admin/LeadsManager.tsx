import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Trash2, Phone, Mail, CheckCircle, Clock, ChevronLeft, ChevronRight, BrainCircuit, Activity, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { DemandAnalytics } from './DemandAnalytics';

interface Lead {
    id: number;
    created_at: string;
    name: string;
    phone: string;
    email?: string;
    project_id?: string;
    projects?: { title: string };
    message?: string;
    status: 'New' | 'Contacted' | 'Closed';
    score?: number;
    metadata?: {
        entry_page?: string;
        intent_score?: number;
        sectors_viewed?: string[];
        synthesis_completed?: boolean;
    };
}

export const LeadsManager: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 10;

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const [data, count] = await Promise.all([
                api.leads.getAll(page, LIMIT),
                api.leads.getCount()
            ]);
            setLeads(data as unknown as Lead[]);
            setTotalPages(Math.ceil(count / LIMIT));
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page]);

    // Analytics Summary
    const stats = {
        avgIntent: leads.length ? Math.round(leads.reduce((acc, l) => acc + (l.metadata?.intent_score || 0), 0) / leads.length) : 0,
        synthesisRate: leads.length ? Math.round((leads.filter(l => l.metadata?.synthesis_completed).length / leads.length) * 100) : 0,
        highUrgency: leads.filter(l => (l.metadata?.intent_score || 0) > 100).length
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;
        try {
            await api.leads.delete(id);
            setLeads(leads.filter(l => l.id !== id));
        } catch (error) {
            console.error('Failed to delete lead:', error);
            alert('Failed to delete lead');
        }
    };

    const handleStatusUpdate = async (id: number, status: 'New' | 'Contacted' | 'Closed') => {
        try {
            await api.leads.updateStatus(id, status);
            setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-800';
            case 'Contacted': return 'bg-yellow-100 text-yellow-800';
            case 'Closed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getLeadSegment = (lead: Lead) => {
        const msg = (lead.message || '').toLowerCase();
        const projectId = (lead.project_id || '').toLowerCase();
        if (msg.includes('nri') || msg.includes('international') || msg.includes('gmt')) return { label: 'NRI', color: 'bg-purple-100 text-purple-700' };
        if (projectId.includes('24k') || projectId.includes('canvas') || msg.includes('luxury')) return { label: 'Luxury', color: 'bg-amber-100 text-amber-700' };
        if (projectId.includes('duet') || projectId.includes('arezo') || msg.includes('budget')) return { label: 'First-Time', color: 'bg-blue-100 text-blue-700' };
        return { label: 'General', color: 'bg-gray-100 text-gray-600' };
    };

    if (loading) return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest animate-pulse">Syncing Sovereign Ledger...</div>;

    return (
        <div className="space-y-6">
            {/* Analytics Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Avg User Intent', value: stats.avgIntent, icon: BrainCircuit, color: 'text-accent' },
                    { label: 'Synthesis Rate', value: `${stats.synthesisRate}%`, icon: Zap, color: 'text-amber-500' },
                    { label: 'High Urgency', value: stats.highUrgency, icon: Activity, color: 'text-red-500' }
                ].map((s, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
                    >
                        <div className={`p-4 rounded-xl bg-gray-50 ${s.color}`}>
                            <s.icon size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-serif font-bold text-gray-900">{s.value}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <DemandAnalytics leads={leads} />

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900">Sovereign Ledger</h2>
                        <p className="text-xs text-gray-400 font-medium">Real-time township behavioral analytics</p>
                    </div>
                    <div className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
                        Page {page} of {totalPages}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                            <tr>
                                <th className="px-8 py-6">Timeline</th>
                                <th className="px-8 py-6">Citizen Profile</th>
                                <th className="px-8 py-6">Behaviors</th>
                                <th className="px-8 py-6">Intent Map</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Synthesis</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-16 text-center text-gray-400 italic">
                                        No inquiries detected in the neural field.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6 text-xs text-gray-500 whitespace-nowrap">
                                            <div className="font-bold text-gray-900">{new Date(lead.created_at).toLocaleDateString()}</div>
                                            <div className="text-[10px] text-gray-400">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-gray-900 mb-1">{lead.name}</div>
                                            <div className="flex flex-col gap-1 text-[11px]">
                                                <a href={`tel:${lead.phone}`} className="text-gray-500 hover:text-accent font-medium">{lead.phone}</a>
                                                {lead.email && <span className="text-gray-400 truncate max-w-[150px]">{lead.email}</span>}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-wrap gap-2">
                                                {(() => {
                                                    const segment = getLeadSegment(lead);
                                                    return (
                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${segment.color}`}>
                                                            {segment.label}
                                                        </span>
                                                    );
                                                })()}
                                                {(lead.metadata?.intent_score || 0) > 100 && (
                                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-600">
                                                        High Urgency
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-[11px] font-bold text-gray-700 mb-1">{lead.projects?.title || 'Township Gen'}</div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden w-20">
                                                    <div 
                                                        className="h-full bg-accent" 
                                                        style={{ width: `${Math.min((lead.metadata?.intent_score || 0) / 2, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400">{lead.metadata?.intent_score || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select 
                                                value={lead.status}
                                                onChange={(e) => handleStatusUpdate(lead.id, e.target.value as any)}
                                                className={`text-[10px] font-bold uppercase tracking-widest border-none focus:ring-0 rounded-full px-3 py-1 cursor-pointer ${getStatusColor(lead.status)}`}
                                            >
                                                <option value="New">New</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-4">
                                                {lead.metadata?.synthesis_completed ? (
                                                    <div className="flex items-center gap-2 text-accent" title="Thesis Generated">
                                                        <Star size={16} fill="currentColor" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Thesis</span>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-200" title="Discovery Phase">
                                                        <Star size={16} />
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-3 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 transition-all border border-transparent hover:border-gray-100"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Neural Page <span className="text-secondary">{page}</span> / {totalPages}
                    </div>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-3 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 transition-all border border-transparent hover:border-gray-100"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
