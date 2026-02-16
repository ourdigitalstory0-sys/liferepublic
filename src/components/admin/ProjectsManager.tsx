import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import type { Project, Amenity } from '../../lib/types';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectsManager: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [globalAmenities, setGlobalAmenities] = useState<Amenity[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'media' | 'gallery' | 'plans' | 'amenities'>('basic');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 10;

    // Initial empty state for a new project
    const emptyProject: Partial<Project> = {
        features: [],
        amenities: [],
        floorPlans: [],
        gallery: [],
        status: 'Available'
    };

    const [formData, setFormData] = useState<Partial<Project>>(emptyProject);

    const [amenitiesInput, setAmenitiesInput] = useState('');
    const [featuresInput, setFeaturesInput] = useState('');

    useEffect(() => {
        loadProjects();
    }, [page]);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const [data, count, amenitiesData] = await Promise.all([
                api.projects.getAll(page, LIMIT),
                api.projects.getCount(),
                api.amenities.getAll()
            ]);
            setProjects(data);
            setTotalPages(Math.ceil(count / LIMIT));
            setGlobalAmenities(amenitiesData);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNew = () => {
        setFormData({ ...emptyProject, id: '' });
        setAmenitiesInput('');
        setFeaturesInput('');
        setEditingId('new');
        setActiveTab('basic');
    };

    const handleEdit = (project: Project) => {
        setFormData(project);
        setAmenitiesInput(project.amenities?.join(', ') || '');
        setFeaturesInput(project.features?.join('\n') || '');
        setEditingId(project.id);
        setActiveTab('basic');
    };

    const handleSave = async () => {
        if (!formData.id || !formData.title) return alert('ID (Slug) and Title are required');

        try {
            if (editingId === 'new') {
                await api.projects.create(formData as Project);
            } else {
                await api.projects.update(editingId!, formData);
            }
            alert('Project saved successfully!');
            setEditingId(null);
            loadProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await api.projects.delete(id);
            loadProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    // Helper for input changes
    const handleChange = (field: keyof Project, value: Project[keyof Project]) => {
        setFormData({ ...formData, [field]: value });
    };

    if (loading) return <div>Loading...</div>;

    // EDITOR VIEW
    if (editingId) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold font-serif text-gray-800">
                        {editingId === 'new' ? 'New Project' : `Edit: ${formData.title}`}
                    </h2>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setEditingId(null)} size="sm">Cancel</Button>
                        <Button onClick={handleSave} size="sm" className="gap-2"><Save size={16} /> Save Project</Button>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex gap-2 overflow-x-auto mb-6 pb-2 border-b">
                    {(['basic', 'details', 'media', 'gallery', 'plans', 'amenities'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md whitespace-nowrap capitalize ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            {tab} Info
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT */}
                <div className="space-y-6">
                    {/* BASIC INFO TAB */}
                    {activeTab === 'basic' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (ID) *</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.id || ''}
                                    onChange={e => handleChange('id', e.target.value)}
                                    placeholder="e.g. duet-2-bhk"
                                    disabled={editingId !== 'new'}
                                />
                                <p className="text-xs text-gray-500 mt-1">Unique URL identifier. Cannot be changed later.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Project Title *</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.title || ''}
                                    onChange={e => handleChange('title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.category || ''}
                                    onChange={e => handleChange('category', e.target.value)}
                                    placeholder="e.g. Premium, Luxury"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md bg-white"
                                    value={formData.status || 'Available'}
                                    onChange={e => handleChange('status', e.target.value)}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Sold Out">Sold Out</option>
                                    <option value="Coming Soon">Coming Soon</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location / Sector</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.location || ''}
                                    onChange={e => handleChange('location', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={formData.price || ''}
                                    onChange={e => handleChange('price', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Theme Color (Hex)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        className="h-10 w-12 p-1 border rounded-md cursor-pointer"
                                        value={formData.themeColor || '#000000'}
                                        onChange={e => handleChange('themeColor', e.target.value)}
                                    />
                                    <input
                                        className="w-full px-3 py-2 border rounded-md uppercase"
                                        value={formData.themeColor || ''}
                                        onChange={e => handleChange('themeColor', e.target.value)}
                                        placeholder="#000000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">RERA Number</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md uppercase"
                                    value={formData.rera || ''}
                                    onChange={e => handleChange('rera', e.target.value)}
                                    placeholder="e.g. P52100031799"
                                />
                            </div>
                        </div>
                    )}

                    {/* DETAILS TAB */}
                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Short Description *</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md h-20"
                                    value={formData.description || ''}
                                    onChange={e => handleChange('description', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Detailed Overview</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md h-32"
                                    value={formData.overview || ''}
                                    onChange={e => handleChange('overview', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Key Features (One per line)</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md h-32"
                                    value={featuresInput}
                                    onChange={e => {
                                        setFeaturesInput(e.target.value);
                                        handleChange('features', e.target.value.split('\n').filter(Boolean));
                                    }}
                                    placeholder="2 BHK&#10;Possession: Dec 2025&#10;Garden View"
                                />
                            </div>
                        </div>
                    )}

                    {/* MEDIA TAB */}
                    {activeTab === 'media' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Hero Image *</label>
                                <div className="flex gap-4 items-start">
                                    <div className="relative w-64 h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        {formData.image ? (
                                            <img src={formData.image} alt="Hero" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <ImageIcon size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            id="heroUpload"
                                            className="hidden"
                                            onChange={async (e) => {
                                                if (e.target.files?.length) {
                                                    try {
                                                        const url = await api.upload.image(e.target.files[0], 'projects');
                                                        handleChange('image', url);
                                                    } catch (err) {
                                                        console.error(err);
                                                        alert('Upload failed');
                                                    }
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                        <label htmlFor="heroUpload" className="cursor-pointer">
                                            <div className="bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium inline-block">Upload New Image</div>
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x1080px</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* GALLERY TAB */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Project Gallery</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {formData.gallery?.map((item, index) => {
                                        const url = typeof item === 'string' ? item : item.url;
                                        const alt = typeof item === 'string' ? '' : item.alt || '';

                                        return (
                                            <div key={index} className="relative group rounded-lg border bg-gray-50 p-2">
                                                <div className="relative h-32 w-full overflow-hidden rounded mb-2 bg-gray-200">
                                                    <img src={url} alt={alt} className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => {
                                                            const newGallery = formData.gallery?.filter((_, i) => i !== index);
                                                            handleChange('gallery', newGallery);
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-500 uppercase">Alt Text</label>
                                                    <input
                                                        type="text"
                                                        value={alt}
                                                        placeholder="Describe image for SEO"
                                                        className="w-full text-xs px-2 py-1 border rounded"
                                                        onChange={(e) => {
                                                            const newGallery = [...(formData.gallery || [])];
                                                            newGallery[index] = { url, alt: e.target.value };
                                                            handleChange('gallery', newGallery);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <label className="border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Plus className="text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">Add Image</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            multiple
                                            onChange={async (e) => {
                                                if (e.target.files?.length) {
                                                    const newItems = [];
                                                    for (let i = 0; i < e.target.files.length; i++) {
                                                        try {
                                                            const url = await api.upload.image(e.target.files[i], 'projects');
                                                            // Add as object with empty alt
                                                            newItems.push({ url, alt: '' });
                                                        } catch (err) {
                                                            console.error(err);
                                                        }
                                                    }
                                                    handleChange('gallery', [...(formData.gallery || []), ...newItems]);
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Tip: Add descriptive "Alt Text" for each image to improve SEO ranking.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* PLANS TAB */}
                    {activeTab === 'plans' && (
                        <div className="space-y-8">
                            {/* Master Layout */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Master Layout</label>
                                <div className="flex gap-4 items-start">
                                    <div className="relative w-64 h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        {formData.masterLayout ? (
                                            <img src={formData.masterLayout} alt="Master Layout" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <ImageIcon size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="file"
                                            id="layoutUpload"
                                            className="hidden"
                                            onChange={async (e) => {
                                                if (e.target.files?.length) {
                                                    try {
                                                        const url = await api.upload.image(e.target.files[0], 'projects');
                                                        handleChange('masterLayout', url);
                                                    } catch {
                                                        alert('Upload failed');
                                                    }
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                        <label htmlFor="layoutUpload" className="cursor-pointer">
                                            <div className="bg-white border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 text-sm font-medium inline-block">Upload Master Layout</div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Floor Plans */}
                            <div className="border-t pt-6">
                                <label className="block text-sm font-medium mb-4">Floor Plans</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Existing Plans */}
                                    {formData.floorPlans?.map((plan: string, index: number) => (
                                        <div key={index} className="flex gap-4 p-3 border rounded-lg bg-gray-50">
                                            <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                {typeof plan === 'string' ? (
                                                    <img src={plan} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    /* Handle object structure if we migrate to that later, for now string urls */
                                                    <img src={plan} alt="" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="text-sm font-medium break-all">{typeof plan === 'string' ? plan.split('/').pop() : 'Plan'}</div>
                                                <button
                                                    onClick={() => {
                                                        const newPlans = formData.floorPlans?.filter((_, i) => i !== index);
                                                        handleChange('floorPlans', newPlans);
                                                    }}
                                                    className="self-end text-red-500 text-sm hover:underline flex items-center gap-1"
                                                >
                                                    <Trash2 size={14} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add New Plan */}
                                    <label className="border-2 border-dashed border-gray-300 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Plus className="text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">Add Floor Plan</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            multiple
                                            onChange={async (e) => {
                                                if (e.target.files?.length) {
                                                    const newPlans = [];
                                                    for (let i = 0; i < e.target.files.length; i++) {
                                                        try {
                                                            const url = await api.upload.image(e.target.files[i], 'projects');
                                                            // Currently schema supports array of strings (URLs)
                                                            // If we want titles, we need to change schema or use JSON object
                                                            // For now assuming string URLs
                                                            newPlans.push(url);
                                                        } catch (err) {
                                                            console.error(err);
                                                        }
                                                    }
                                                    handleChange('floorPlans', [...(formData.floorPlans || []), ...newPlans]);
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AMENITIES TAB */}
                    {activeTab === 'amenities' && (
                        <div className="space-y-6">
                            {/* Global Amenities Selection */}
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                                    <Star size={16} /> Select Global Amenities
                                </h4>
                                {loading ? (
                                    <div className="text-sm text-gray-500">Loading details...</div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {globalAmenities.map(amenity => {
                                            const isSelected = formData.amenities?.includes(amenity.title);
                                            return (
                                                <button
                                                    key={amenity.id}
                                                    onClick={() => {
                                                        const current = formData.amenities || [];
                                                        let newAmenities;
                                                        if (isSelected) {
                                                            newAmenities = current.filter(a => a !== amenity.title);
                                                        } else {
                                                            newAmenities = [...current, amenity.title];
                                                        }
                                                        handleChange('amenities', newAmenities);
                                                        setAmenitiesInput(newAmenities.join(', '));
                                                    }}
                                                    className={`px-3 py-2 rounded-md text-sm border transition-all flex items-center gap-2 ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
                                                >
                                                    {isSelected && <Check size={14} />}
                                                    {amenity.title}
                                                </button>
                                            );
                                        })}
                                        {globalAmenities.length === 0 && (
                                            <p className="text-sm text-gray-500 italic">No global amenities found. Create them in the Amenities tab first.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-2 bg-white text-sm text-gray-500">OR / AND</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Custom Amenities (Comma separated)</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md h-32"
                                    value={amenitiesInput}
                                    onChange={e => {
                                        setAmenitiesInput(e.target.value);
                                        handleChange('amenities', e.target.value.split(',').map(s => s.trim()).filter(Boolean));
                                    }}
                                    placeholder="Swimming Pool, Gym, Clubhouse..."
                                />
                                <p className="text-xs text-gray-500 mt-2">You can manually type amenities here or use the selector above.</p>
                            </div>

                            <div className="border-t pt-6">
                                <h4 className="text-sm font-medium mb-4">Preview Tags:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {formData.amenities?.map((amenity, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-100">
                                            <Check size={12} /> {amenity}
                                        </span>
                                    ))}
                                    {(!formData.amenities || formData.amenities.length === 0) && (
                                        <span className="text-gray-400 text-sm italic">No amenities added yet.</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // LIST VIEW
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold font-serif text-gray-800">Projects Directory</h2>
                    <p className="text-sm text-gray-500 mt-1">Page {page} of {totalPages}</p>
                </div>
                <Button onClick={handleCreateNew} size="sm" className="gap-2">
                    <Plus size={16} /> Add Project
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-3 font-medium text-gray-600">Image</th>
                            <th className="p-3 font-medium text-gray-600">Title</th>
                            <th className="p-3 font-medium text-gray-600">Location</th>
                            <th className="p-3 font-medium text-gray-600">Price</th>
                            <th className="p-3 font-medium text-gray-600">Status</th>
                            <th className="p-3 font-medium text-gray-600 w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <img src={project.image} alt="" className="w-12 h-12 rounded object-cover bg-gray-200" />
                                </td>
                                <td className="p-3 font-medium">{project.title}</td>
                                <td className="p-3 text-gray-500">{project.location}</td>
                                <td className="p-3 text-gray-500">{project.price}</td>
                                <td className="p-3">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${project.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {project.status || 'Available'}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(project)} className="p-1 hover:bg-gray-100 rounded text-blue-600">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(project.id)} className="p-1 hover:bg-gray-100 rounded text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {projects.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">No projects found. Add your first one!</div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="p-4 border-t border-gray-200 flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-gray-600"
                    >
                        <ChevronLeft size={20} /> Previous
                    </button>
                    <div className="text-sm text-gray-600">
                        Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                    </div>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-gray-600"
                    >
                        Next <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
