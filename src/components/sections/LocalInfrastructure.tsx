import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Train, PlusCircle, Building2, School } from 'lucide-react';

interface POI {
  name: string;
  distance: string;
  category: string;
  icon: React.ReactNode;
  type: string;
}

const landmarks: POI[] = [
  { name: 'Rajiv Gandhi IT Park Phase 1', distance: '1.2 km', category: 'IT', icon: <Building2 />, type: 'LocalBusiness' },
  { name: 'Infosys Hinjewadi', distance: '1.8 km', category: 'IT', icon: <Building2 />, type: 'LocalBusiness' },
  { name: 'Wipro Technologies', distance: '2.5 km', category: 'IT', icon: <Building2 />, type: 'LocalBusiness' },
  { name: 'Hinjewadi Metro Line 3', distance: '0.8 km', category: 'Transit', icon: <Train />, type: 'TransitStation' },
  { name: 'Ruby Hall Clinic Hinjewadi', distance: '3.2 km', category: 'Hospital', icon: <PlusCircle />, type: 'LocalBusiness' },
  { name: 'Lifepoint Multispecialty', distance: '4.5 km', category: 'Hospital', icon: <PlusCircle />, type: 'LocalBusiness' },
  { name: 'Anisha Global School', distance: 'In-Township', category: 'School', icon: <School />, type: 'LocalBusiness' },
  { name: 'Blue Ridge Public School', distance: '2.4 km', category: 'School', icon: <School />, type: 'LocalBusiness' },
  { name: 'Pune Intl Airport', distance: '24 km', category: 'Transit', icon: <Plane />, type: 'TransitStation' },
  { name: 'Bhumkar Chowk', distance: '4.2 km', category: 'Transit', icon: <MapPin />, type: 'TransitStation' },
];

export const LocalInfrastructure: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Life Republic Local Infrastructure",
    "itemListElement": landmarks.map((poi, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": poi.type,
        "name": poi.name,
        "location": {
          "@type": "Place",
          "name": poi.name,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Hinjewadi",
            "addressRegion": "Pune",
            "addressCountry": "IN"
          }
        }
      }
    }))
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Global Connectivity</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4 leading-tight">The Hinjewadi 5km Radius</h2>
            <p className="text-gray-500">
              Strategic location at the heart of Pune's technology corridor. Life Republic offers unmatched access to the world's leading IT ecosystems and essential services.
            </p>
          </div>
          <div className="p-6 bg-accent/5 rounded-2xl border border-accent/10 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest leading-none mb-1">Central Hub</p>
              <p className="text-sm font-bold text-secondary">Hinjewadi Phase 1 & 2</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {landmarks.map((poi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-gray-50/50 hover:bg-white border border-gray-100 p-6 rounded-[2rem] transition-all hover:shadow-xl hover:border-accent/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all">
                  {React.cloneElement(poi.icon as React.ReactElement, { size: 18 } as any)}
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{poi.category}</span>
              </div>
              <h3 className="text-lg font-bold text-secondary mb-1 group-hover:text-accent transition-colors">{poi.name}</h3>
              <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <MapPin size={10} className="text-accent" /> {poi.distance}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Efficiency & Flow</span>
            <h3 className="text-3xl font-serif font-bold text-secondary">The Pulse of Hinjewadi</h3>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                { time: "05 Mins", destination: "Hinjewadi Phase 1 IT Park", desc: "Access to Infosys, Wipro, and TCS headquarters.", side: "left" as const, icon: <Building2 className="text-accent" /> },
                { time: "08 Mins", destination: "Upcoming Metro Line 3", desc: "Rapid transit connecting the township to central Pune.", side: "right" as const, icon: <Train className="text-accent" /> },
                { time: "12 Mins", destination: "Hinjewadi Phase 2 & 3", desc: "The tech expansion corridor and global MNC campuses.", side: "left" as const, icon: <PlusCircle className="text-accent" /> },
                { time: "22 Mins", destination: "Shivaji Nagar (Central Pune)", desc: "Estimated travel time via the upcoming Metro link.", side: "right" as const, icon: <MapPin className="text-accent" /> }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: step.side === 'left' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className={`flex flex-col ${step.side === 'right' ? 'md:items-start' : 'md:items-end'}`}>
                      <span className="text-3xl font-serif font-bold text-accent mb-2">{step.time}</span>
                      <h4 className="text-xl font-bold text-secondary mb-2">{step.destination}</h4>
                      <p className="text-gray-500 text-sm max-w-xs">{step.desc}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-gray-50 shadow-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
