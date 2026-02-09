import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Copy, Check } from 'lucide-react';

export const ImageManager: React.FC = () => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const { data, error } = await supabase.storage.from('projects').list();
        if (data) {
            setImages(data);
        } else {
            console.error('Error fetching images:', error);
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

            await fetchImages();
        } catch (error) {
            alert('Error uploading image!');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (fileName: string) => {
        const { error } = await supabase.storage.from('projects').remove([fileName]);
        if (error) {
            console.error('Error deleting image:', error);
        } else {
            fetchImages();
        }
    };

    const copyToClipboard = (fileName: string) => {
        const { data } = supabase.storage.from('projects').getPublicUrl(fileName);
        navigator.clipboard.writeText(data.publicUrl);
        setCopiedId(fileName);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
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
                                        onClick={() => handleDelete(file.name)}
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
        </div>
    );
};
