
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';

export const AdminSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Signup successful! Check your email for confirmation link, or valid if auto-confirm is on.');
            console.log(data);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-primary">Admin Signup</h1>
                    <p className="text-gray-500 text-sm mt-2">Create an account to manage Life Republic</p>
                </div>

                {message && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm mb-4">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none transition-colors"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full justify-center mt-6"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
