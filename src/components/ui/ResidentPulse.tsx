import React from 'react';
import { UserPlus, Home, Eye, MapPin } from 'lucide-react';

const activities = [
    { type: 'Booking', message: 'New 3 BHK booking in Echoes', time: '2 mins ago', icon: Home, color: 'text-green-600' },
    { type: 'Visit', message: 'Site visit scheduled for Canvas', time: '15 mins ago', icon: MapPin, color: 'text-blue-600' },
    { type: 'Move-in', message: '5 Families moved to Arezo', time: '1 hour ago', icon: UserPlus, color: 'text-accent' },
    { type: 'View', message: '450+ views on Atmos Sector', time: 'Just now', icon: Eye, color: 'text-orange-500' }
];

export const ResidentPulse: React.FC = () => {
    return (
        <div className="bg-secondary/5 border-y border-secondary/10 py-3 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
                    {/* Duplicate for seamless loop */}
                    {[...activities, ...activities].map((activity, idx) => (
                        <div key={idx} className="flex items-center gap-3 px-6 border-r border-secondary/10 last:border-r-0">
                            <div className={`${activity.color} bg-white p-1.5 rounded-lg shadow-sm`}>
                                <activity.icon size={14} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter leading-none mb-1">
                                    {activity.type}
                                </span>
                                <span className="text-xs font-medium text-gray-600">
                                    {activity.message} <span className="text-gray-400 font-normal ml-1">({activity.time})</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: fit-content;
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};
