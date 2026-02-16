import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Trash2, Phone, Mail, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface Lead {
    id: number;
    created_at: string;
    name: string;
    phone: string;
    email?: string;
    project_id?: string;
    projects?: { title: string }; // Joined via Supabase
    message?: string;
    status: 'New' | 'Contacted' | 'Closed';
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
            // Cast or ensure type safety if needed, assuming API returns correct shape
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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading leads...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Recent Inquiries</h2>
                <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Contact</th>
                            <th className="px-6 py-4 font-medium">Interested In</th>
                            <th className="px-6 py-4 font-medium">Message</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-gray-400 italic">
                                    No inquiries found yet.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                        <br />
                                        <span className="text-xs text-gray-400">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-sm">
                                            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-primary">
                                                <Phone size={14} /> {lead.phone}
                                            </a>
                                            {lead.email && (
                                                <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-gray-600 hover:text-primary">
                                                    <Mail size={14} /> {lead.email}
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {lead.projects?.title || 'General Inquiry'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={lead.message}>
                                        {lead.message || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {lead.status === 'New' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(lead.id, 'Contacted')}
                                                    className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md"
                                                    title="Mark as Contacted"
                                                >
                                                    <Clock size={18} />
                                                </button>
                                            )}
                                            {lead.status !== 'Closed' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(lead.id, 'Closed')}
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-md"
                                                    title="Mark as Closed"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(lead.id)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                                                title="Delete Lead"
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
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="text-sm text-gray-600">
                    Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                </div>
                <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
