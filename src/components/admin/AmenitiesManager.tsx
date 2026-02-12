import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Amenity } from '../../lib/types';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2, Save, Image as ImageIcon, Trees, Dumbbell, Music, ShieldCheck, Gamepad2, Coffee, BookOpen, Users } from 'lucide-react';

const ICON_OPTIONS = [
    { name: 'Trees', icon: Trees },
    { name: 'Dumbbell', icon: Dumbbell },
    { name: 'Music', icon: Music },
    { name: 'ShieldCheck', icon: ShieldCheck },
    { name: 'Gamepad2', icon: Gamepad2 },
    { name: 'Coffee', icon: Coffee },
    { name: 'BookOpen', icon: BookOpen },
    { name: 'Users', icon: Users },
];

export const AmenitiesManager: React.FC = () => {
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Amenity>>({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadAmenities();
    }, []);

    const loadAmenities = async () => {
        try {
            const data = await api.amenities.getAll();
            setAmenities(data);
        } catch (error) {
            console.error('Error loading amenities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title) return alert('Title is required');

        try {
            if (editingId) {
                await api.amenities.update(editingId, formData);
            } else {
                await api.amenities.create(formData as Omit<Amenity, 'id'>);
            }
            setFormData({});
            setEditingId(null);
            loadAmenities();
        } catch (error) {
            console.error('Error saving amenity:', error);
            alert('Failed to save amenity');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.amenities.delete(id);
            loadAmenities();
        } catch (error) {
            console.error('Error deleting amenity:', error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);
        try {
            const url = await api.upload.image(e.target.files[0], 'projects'); // Using projects bucket
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
                <h2 className="text-xl font-bold font-serif text-gray-800">Amenities</h2>
                <Button onClick={() => { setFormData({}); setEditingId(0); }} size="sm" className="gap-2">
                    <Plus size={16} /> Add Amenity
                </Button>
            </div>

            {/* Editor Form */}
            {(editingId !== null) && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold mb-4">{editingId === 0 ? 'New Amenity' : 'Edit Amenity'}</h3>
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
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
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
                                <label className="block text-sm font-medium mb-1">Icon</label>
                                <div className="flex flex-wrap gap-2">
                                    {ICON_OPTIONS.map(opt => (
                                        <button
                                            key={opt.name}
                                            onClick={() => setFormData({ ...formData, icon: opt.name })}
                                            className={`p-2 rounded border ${formData.icon === opt.name ? 'bg-accent text-white border-accent' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                            title={opt.name}
                                        >
                                            <opt.icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image (Optional, for Carousel)</label>
                                <div className="relative h-32 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center border border-dashed border-gray-400">
                                    {formData.image_url ? (
                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center p-2">
                                            <ImageIcon className="text-gray-400 mx-auto mb-1" />
                                            <span className="text-xs text-gray-500">No image selected</span>
                                        </div>
                                    )}
                                    {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium">Uploading...</div>}
                                </div>
                                <div className="mt-2 text-right">
                                    <input
                                        type="file"
                                        id="amenityUpload"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="amenityUpload"
                                        className={`cursor-pointer inline-block bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 text-sm whitespace-nowrap text-center ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        {formData.image_url ? 'Change Image' : 'Select Image'}
                                    </label>
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
                {amenities.map(amenity => (
                    <div key={amenity.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg hover:shadow-sm bg-white transition-all">
                        {amenity.image_url && (
                            <img src={amenity.image_url} alt={amenity.title} className="w-16 h-16 object-cover rounded bg-gray-200" />
                        )}
                        {!amenity.image_url && amenity.icon && (
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                                {ICON_OPTIONS.find(opt => opt.name === amenity.icon)?.icon({ size: 24 }) || <ImageIcon size={24} />}
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="font-bold">{amenity.title}</h3>
                            <p className="text-sm text-gray-500">{amenity.description}</p>
                        </div>
                        <div className="text-sm text-gray-400">Order: {amenity.order}</div>
                        <div className="flex gap-2">
                            <button onClick={() => { setFormData(amenity); setEditingId(amenity.id); }} className="p-2 hover:bg-gray-100 rounded text-blue-600">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(amenity.id)} className="p-2 hover:bg-gray-100 rounded text-red-600">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {amenities.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">No amenities found. Create one!</div>
                )}
            </div>
        </div>
    );
};
