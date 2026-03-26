import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Calendar, Megaphone, ArrowRight } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

const forumPosts = [
    { title: 'New Organic Market this Sunday!', author: 'Priya S.', sector: 'Atmos', replies: 24, time: '2h ago' },
    { title: 'Morning Yoga Sessions at Urban Park', author: 'Rahul K.', sector: 'Aros', replies: 15, time: '5h ago' },
    { title: 'Best Broadband options in Sector R1?', author: 'Amit V.', sector: 'Arezo', replies: 42, time: '1d ago' },
    { title: 'Tennis Tournament registrations open', author: 'Admin', sector: 'Township', replies: 8, time: '3h ago' }
];

export const CommunityForum: React.FC = () => {
    return (
        <div className="bg-gray-50 pt-24 pb-20">
            <SEO 
                title="Community Forum & Residents Hub | Kolte Patil Life Republic"
                description="Join the vibrant community at Kolte Patil Life Republic. Connect with 12,000+ families, participate in events, and stay updated with township life."
            />
            
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">Resident Hub</h1>
                    <p className="text-gray-600 italic">A preview of the private digital ecosystem for Life Republic citizens.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Forum Feed */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="font-bold text-secondary flex items-center gap-2">
                                <MessageSquare size={18} className="text-accent" />
                                Recent Discussions
                            </h2>
                            <button className="text-xs font-bold text-accent uppercase tracking-widest border-b border-accent pb-0.5">View All</button>
                        </div>
                        
                        {forumPosts.map((post, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-secondary group-hover:text-accent transition-colors">{post.title}</h3>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter bg-gray-50 px-2 py-1 rounded-md">{post.time}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1 font-medium"><Users size={12} /> {post.author}</span>
                                    <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">{post.sector}</span>
                                    <span>{post.replies} Replies</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Event Card */}
                        <div className="bg-secondary p-8 rounded-3xl text-white relative overflow-hidden">
                            <Calendar className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                            <h3 className="text-xl font-bold font-serif mb-4 flex items-center gap-2">
                                <Calendar size={20} className="text-accent" />
                                Upcoming Events
                            </h3>
                            <div className="space-y-4 relative z-10">
                                <div className="border-l-2 border-accent pl-4 py-1">
                                    <div className="text-xs font-bold text-accent uppercase">MAR 28</div>
                                    <p className="text-sm font-medium">Holi Celebration Hub</p>
                                </div>
                                <div className="border-l-2 border-white/20 pl-4 py-1">
                                    <div className="text-xs font-bold text-white/40 uppercase">APR 05</div>
                                    <p className="text-sm font-medium">Eco-Workshop for Kids</p>
                                </div>
                            </div>
                            <button className="mt-8 w-full bg-white text-secondary py-3 rounded-xl font-bold text-sm hover:bg-accent hover:text-white transition-all">
                                Register as Resident
                            </button>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold font-serif text-secondary mb-6 flex items-center gap-2">
                                <Users size={20} className="text-accent" />
                                Community Pulse
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <div className="text-2xl font-bold text-secondary">12k+</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Families</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <div className="text-2xl font-bold text-secondary">45+</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avenues</div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Alert */}
                        <div className="bg-accent/10 p-6 rounded-3xl border border-accent/20">
                            <div className="flex items-center gap-3 text-accent font-bold mb-2">
                                <Megaphone size={18} />
                                <span>Township Updates</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                New shuttle service to Hinjewadi Phase 3 starting from April 1st. Check schedules in the app.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl">
                    <h2 className="text-3xl font-serif font-bold text-secondary mb-4 italic">Not a resident yet?</h2>
                    <p className="text-gray-600 mb-8">Secure your place in Pune's most active integrated township today.</p>
                    <a href="/projects" className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-4 rounded-full font-bold hover:bg-accent transition-all group">
                        Browse Available Sectors
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};
