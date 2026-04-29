import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClusterPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  slug: string;
  type: string;
  status: string;
  color: string;
}

const clusters: ClusterPoint[] = [
  { id: 'R22', name: 'Atmos', x: 25, y: 30, slug: 'sector-r22-life-republic', type: 'Premium 2 & 3 BHK', status: 'Oct 2027', color: '#2ecc71' },
  { id: 'R13', name: 'Aros', x: 45, y: 40, slug: 'sector-r13-life-republic', type: 'Community 2 & 3 BHK', status: 'Dec 2026', color: '#e67e22' },
  { id: 'R10', name: 'Universe', x: 65, y: 35, slug: 'sector-r10-life-republic', type: 'Smart 1 & 2 BHK', status: 'Phased', color: '#3498db' },
  { id: 'R3', name: 'Canvas', x: 35, y: 60, slug: 'sector-r3-life-republic', type: 'Luxury 3 & 4 BHK', status: 'Oct 2026', color: '#9b59b6' },
  { id: 'R17', name: 'Echoes', x: 55, y: 65, slug: 'sector-r17a-life-republic', type: 'Modern 2 & 3 BHK', status: 'New Launch', color: '#f1c40f' },
  { id: 'R9', name: '24K Espada', x: 75, y: 60, slug: 'sector-r31-life-republic', type: 'Luxury Villas', status: 'Exclusive', color: '#e74c3c' },
];

export const TownshipMap: React.FC = () => {
  const [activeCluster, setActiveCluster] = useState<ClusterPoint | null>(null);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Perspective & Scale</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">Interactive Masterplan</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore 390+ acres of integrated community living. Hover over the sectors to view cluster details and project timelines.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-4 md:p-8 border border-gray-100">
          <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-3xl overflow-hidden group">
            {/* Base stylized map (SVG) */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-gray-200">
              {/* Simplified roads and layout */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d="M0 50 Q 50 20 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M50 0 Q 30 50 50 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
              
              {/* Main Spine Road */}
              <path d="M10 45 L 90 45" fill="none" stroke="#ddd" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Interactive Points */}
            {clusters.map((cluster) => (
              <motion.button
                key={cluster.id}
                className="absolute w-8 h-8 rounded-full shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, backgroundColor: cluster.color }}
                whileHover={{ scale: 1.5 }}
                onMouseEnter={() => setActiveCluster(cluster)}
                onClick={() => setActiveCluster(cluster)}
              >
                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: cluster.color }}></div>
                <MapPin className="text-white" size={16} />
                <span className="absolute top-full mt-2 bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm text-gray-600 whitespace-nowrap">
                  {cluster.name}
                </span>
              </motion.button>
            ))}

            {/* Tooltip / Info Overlay */}
            <AnimatePresence>
              {activeCluster && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-6 right-6 z-30 w-72 bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest leading-none">
                      Sector {activeCluster.id}
                    </span>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeCluster.color }}></div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-1">{activeCluster.name}</h3>
                  <p className="text-gray-600 text-sm font-medium mb-4">{activeCluster.type}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Possession:</span>
                      <span className="font-bold text-secondary">{activeCluster.status}</span>
                    </div>
                  </div>

                  <Link to={`/location/${activeCluster.slug}`}>
                    <Button variant="primary" className="w-full rounded-full bg-secondary hover:bg-black border-none gap-2">
                      Explore Cluster <ArrowRight size={16} />
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Static Map Elements */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Info size={14} className="text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Life Republic 390-Acre Domain</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {clusters.map((cluster) => (
              <button
                key={cluster.id}
                onMouseEnter={() => setActiveCluster(cluster)}
                className={`flex items-center gap-2 transition-all ${activeCluster?.id === cluster.id ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cluster.color }}></div>
                <span className="text-xs font-bold text-secondary uppercase tracking-tighter">{cluster.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
