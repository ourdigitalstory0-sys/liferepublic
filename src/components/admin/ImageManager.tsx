import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Copy, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface FileObject {
    name: string;
    id: string | null;
    updated_at: string | null;
    created_at: string | null;
    last_accessed_at: string | null;
    metadata: Record<string, unknown> | null;
}

export const ImageManager: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<FileObject[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null); // For confirmation dialog
    const LIMIT = 12;

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async (isLoadMore = false) => {
        try {
            if (isLoadMore) setLoadingMore(true);

            const from = isLoadMore ? (page + 1) * LIMIT : 0;
            const { data, error } = await supabase.storage
                .from('projects')
                .list(undefined, {
                    limit: LIMIT,
                    offset: from,
                    sortBy: { column: 'created_at', order: 'desc' }
                });

            if (error) throw error;

            if (data) {
                if (isLoadMore) {
                    setImages(prev => [...prev, ...data]);
                    setPage(prev => prev + 1);
                } else {
                    setImages(data);
                    setPage(0);
                }
                setHasMore(data.length === LIMIT);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('projects')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            await fetchImages(false);
        } catch (error) {
            alert('Error uploading image!');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        const { error } = await supabase.storage.from('projects').remove([deleteId]);
        if (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image');
        } else {
            // Remove from local state to avoid refetching everything
            setImages(prev => prev.filter(img => img.name !== deleteId));
        }
        setDeleteId(null);
    };

    const copyToClipboard = (fileName: string) => {
        const { data } = supabase.storage.from('projects').getPublicUrl(fileName);
        navigator.clipboard.writeText(data.publicUrl);
        setCopiedId(fileName);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 relative">
            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Delete Image?</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Are you sure you want to delete this image? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3 w-full mt-2">
                                <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
                                <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-serif text-gray-800">Project Images</h2>
                <div className="relative">
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="hidden"
                    />
                    <label
                        htmlFor="imageUpload"
                        className="cursor-pointer bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2"
                    >
                        <Upload size={18} />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                </div>
            </div>

            {images.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p>No images uploaded yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((file) => {
                        const { data } = supabase.storage.from('projects').getPublicUrl(file.name);
                        return (
                            <div key={file.name} className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 aspect-square">
                                <img
                                    src={data.publicUrl}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => copyToClipboard(file.name)}
                                        className="p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full transition-all"
                                        title="Copy URL"
                                    >
                                        {copiedId === file.name ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(file.name)}
                                        className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 truncate px-2">
                                    {file.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {hasMore && images.length > 0 && (
                <div className="mt-8 text-center border-t pt-6">
                    <p className="text-sm text-gray-500 mb-4">Showing {images.length} images</p>
                    <button
                        onClick={() => fetchImages(true)}
                        disabled={loadingMore}
                        className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors flex items-center gap-2 mx-auto disabled:opacity-50 shadow-sm"
                    >
                        {loadingMore ? <Loader2 className="animate-spin" size={18} /> : null}
                        {loadingMore ? 'Loading more...' : 'Load More Images'}
                    </button>
                </div>
            )}
        </div>
    );
};
