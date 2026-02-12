import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string; // Kept in interface but will remove from destructuring if unused
    className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, className = '' }) => {
    const [copied, setCopied] = React.useState(false);

    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            color: 'hover:text-green-600'
        },
        {
            name: 'Twitter',
            icon: <Twitter size={16} />,
            href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'hover:text-blue-400'
        },
        {
            name: 'Facebook',
            icon: <Facebook size={16} />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:text-blue-600'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={16} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:text-blue-700'
        }
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                <Share2 size={14} /> Share:
            </span>
            <div className="flex gap-1">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full bg-gray-50 text-gray-600 transition-colors ${link.color} hover:bg-gray-100`}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </a>
                ))}
                <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-full bg-gray-50 text-gray-600 transition-colors hover:text-gray-900 hover:bg-gray-100"
                    title="Copy Link"
                >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
            </div>
        </div>
    );
};
