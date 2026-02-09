import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Banner } from '../../lib/types';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2, Save, Image as ImageIcon } from 'lucide-react';

export const BannersManager: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Banner>>({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadBanners();
    }, []);

    const loadBanners = async () => {
        try {
            const data = await api.banners.getAll();
            setBanners(data);
        } catch (error) {
            console.error('Error loading banners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.image_url || !formData.title) return alert('Image and Title are required');

        try {
            if (editingId) {
                await api.banners.update(editingId, formData);
            } else {
                await api.banners.create(formData as Omit<Banner, 'id'>);
            }
            setFormData({});
            setEditingId(null);
            loadBanners();
        } catch (error) {
            console.error('Error saving banner:', error);
            alert('Failed to save banner');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.banners.delete(id);
            loadBanners();
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        try {
            const url = await api.upload.image(e.target.files[0], 'projects'); // Using projects bucket for now
            setFormData({ ...formData, image_url: url });
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-serif text-gray-800">Home Banners</h2>
                <Button onClick={() => { setFormData({}); setEditingId(0); }} size="sm" className="gap-2">
                    <Plus size={16} /> Add Banner
                </Button>
            </div>

            {/* Editor Form */}
            {(editingId !== null) && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold mb-4">{editingId === 0 ? 'New Banner' : 'Edit Banner'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.title || ''}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subtitle</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.subtitle || ''}
                                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Link (e.g. /projects)</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.link || ''}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Order</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.order || 0}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Image</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1 h-32 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                                        {formData.image_url ? (
                                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-gray-400" />
                                        )}
                                        {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">Uploading...</div>}
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <input type="file" id="bannerUpload" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                        <label htmlFor="bannerUpload" className="cursor-pointer bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 text-sm">Change</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setEditingId(null)} size="sm">Cancel</Button>
                        <Button onClick={handleSave} size="sm" className="gap-2"><Save size={16} /> Save</Button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="space-y-4">
                {banners.map(banner => (
                    <div key={banner.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm bg-white transition-all">
                        <img src={banner.image_url} alt={banner.title} className="w-24 h-16 object-cover rounded bg-gray-200" />
                        <div className="flex-1">
                            <h3 className="font-bold">{banner.title}</h3>
                            <p className="text-sm text-gray-500">{banner.subtitle}</p>
                        </div>
                        <div className="text-sm text-gray-400">Order: {banner.order}</div>
                        <div className="flex gap-2">
                            <button onClick={() => { setFormData(banner); setEditingId(banner.id); }} className="p-2 hover:bg-gray-100 rounded text-blue-600">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(banner.id)} className="p-2 hover:bg-gray-100 rounded text-red-600">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {banners.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">No banners found. Create one!</div>
                )}
            </div>
        </div>
    );
};
