import React from 'react';

export const Terms: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-serif font-bold mb-8 text-secondary">Terms of Use</h1>
            <div className="prose max-w-none text-gray-600 space-y-6">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>
                    Welcome to Life Republic. By accessing our website, you agree to these Terms of Use.
                </p>

                <h3 className="text-xl font-bold text-gray-800">1. Acceptance of Terms</h3>
                <p>
                    By accessing or using our website, you agree to be bound by these Terms and all applicable laws and regulations.
                </p>

                <h3 className="text-xl font-bold text-gray-800">2. Use License</h3>
                <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on Life Republic's website for personal, non-commercial transitory viewing only.
                </p>

                <h3 className="text-xl font-bold text-gray-800">3. Disclaimer</h3>
                <p>
                    The materials on Life Republic's website are provided on an 'as is' basis. Life Republic makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
            </div>
        </div>
    );
};
