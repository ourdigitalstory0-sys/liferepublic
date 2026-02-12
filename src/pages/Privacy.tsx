import React from 'react';

export const Privacy: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-serif font-bold mb-8 text-secondary">Privacy Policy</h1>
            <div className="prose max-w-none text-gray-600 space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    Thank you for visiting Life Republic. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
                </p>

                <h3 className="text-xl font-bold text-gray-800">1. Information Collection</h3>
                <p>
                    We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or request information about properties.
                </p>

                <h3 className="text-xl font-bold text-gray-800">2. Use of Information</h3>
                <p>
                    We use the information we collect to provide, maintain, and improve our services, to respond to your inquiries, and to send you updates about our projects.
                </p>

                <h3 className="text-xl font-bold text-gray-800">3. Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at sales@liferepublic.in.
                </p>
            </div>
        </div>
    );
};
