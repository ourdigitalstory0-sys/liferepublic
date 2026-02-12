import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Image, LogOut, Menu, X } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const NavLinks = () => (
        <>
            <Link
                to="/admin/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/dashboard' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <LayoutDashboard size={20} />
                Dashboard
            </Link>
            <Link
                to="/admin/images"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/images' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <Image size={20} />
                Image Manager
            </Link>
            {/* Add other links if needed in future */}
        </>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar (Desktop) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-primary font-serif">Life Republic Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLinks />
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative bg-white w-64 h-full shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h1 className="text-lg font-bold text-primary font-serif">Menu</h1>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="flex-1 p-4 space-y-2">
                            <NavLinks />
                        </nav>
                        <div className="p-4 border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-md">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
                    </div>
                    {/* Optional: Add user avatar or indicators here */}
                </header>
                <div className="p-4 md:p-8 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
