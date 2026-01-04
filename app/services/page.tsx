import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { Wrench, Cpu, Activity, Clock, DollarSign, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Repair Services | Compu World',
  description: 'Pro repairs, upgrades and diagnostics for your gaming rig.',
};

async function getServices() {
  await dbConnect();
  const services = await Service.find({}).sort({ category: 1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

const iconMap: any = {
  'Wind': Wrench, 
  'Cpu': Cpu, 
  'Stethoscope': Activity,
  // Default fallback
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden font-sans">
       {/* Global Background Elements */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
       </div>

      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-white/5 rounded-full mb-6 border border-white/10 backdrop-blur-sm">
               <span className="bg-[var(--color-neon-blue)] w-2 h-2 rounded-full mr-2 animate-pulse"></span>
               <span className="text-xs font-bold text-gray-300 uppercase tracking-widest font-[family-name:var(--font-orbitron)]">System Diagnostics & Repair</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-[family-name:var(--font-orbitron)]">
              ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">ENGINEERING</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Don't let hardware issues throttle your performance. Our certified technicians bring your rig back to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {services.map((service: any, idx: number) => {
               const Icon = iconMap[service.icon] || Wrench;
               
               // Dynamic Color Logic based on Index
               const colors = [
                   { name: 'blue',   hex: 'var(--color-neon-blue)' },
                   { name: 'purple', hex: 'var(--color-neon-purple)' },
                   { name: 'green',  hex: 'var(--color-neon-green)' }
               ];
               const color = colors[idx % 3];
               
               return (
                <FadeIn key={service._id} delay={idx * 0.1}>
                  <div 
                    className="bg-[#0a0a0a]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 transition-all duration-300 group h-full relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ 
                        // We use CSS variables or direct styling because Tailwind dynamic arbitrary values can be tricky to purge if not safelisted
                        borderColor: 'transparent',
                    }} 
                   >
                     {/* Dynamic Border Hover Effect via pseudo-style replacement or just conditional classes if we stick to known 3 colors */}
                     {/* For safer Tailwind usage, let's map standard classes if possible, or use inline styles for dynamic colors */}
                    <div 
                        className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[color:var(--dynamic-color)] transition-colors duration-300"
                        style={{ '--dynamic-color': color.hex } as React.CSSProperties}
                    ></div>
                    
                    <div 
                        className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: color.hex }}
                    ></div>
                    
                    <div 
                        className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 transition-all duration-300 border border-white/5 group-hover:scale-110"
                        style={{ 
                            // Inline style for dynamic hover effects is complex in React without state/css-in-js 
                            // so we will rely on group-hover classes combined with style variables
                         }}
                    >
                      <Icon 
                        className="w-8 h-8 text-gray-300 transition-colors duration-300" 
                        style={{ color: 'inherit' }} // To allow parent to control? No, let's use the variable approach
                      />
                      {/* We overlay a colored icon that appears on hover */}
                      <Icon 
                        className="w-8 h-8 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: color.hex }}
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-orbitron)]">{service.name}</h3>
                    <p className="text-gray-400 mb-8 min-h-[50px] leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-4">
                       <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5 border border-white/5">
                         <div className="flex items-center text-gray-300">
                           <Clock className="w-4 h-4 mr-2" style={{ color: color.hex }} />
                           <span>Turnaround</span>
                         </div>
                         <span className="font-bold text-white">{service.estimatedTime}</span>
                       </div>
                       
                       <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5 border border-white/5">
                         <div className="flex items-center text-gray-300">
                           <DollarSign className="w-4 h-4 mr-2" style={{ color: color.hex }} />
                           <span>Starting At</span>
                         </div>
                         <span className="font-bold" style={{ color: color.hex }}>{service.priceRange}</span>
                       </div>
                    </div>
                  </div>
                </FadeIn>
               );
            })}
          </div>

          {/* Contact/Booking Section */}
          <div className="max-w-4xl mx-auto relative">
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-3xl blur opacity-20 transform scale-105"></div>
             <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/10 relative z-10 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-orbitron)]">INITIALIZE REPAIR SEQUENCE</h2>
                <p className="text-gray-400">Fill out the secure comms channel below. We respond within 24 hours.</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-neon-blue)] uppercase tracking-widest font-[family-name:var(--font-orbitron)]">Codename / Name</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all placeholder-gray-700" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-neon-blue)] uppercase tracking-widest font-[family-name:var(--font-orbitron)]">Contact Email</label>
                    <input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all placeholder-gray-700" placeholder="pilot@compuworld.com" />
                  </div>
                </div>
                
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-neon-blue)] uppercase tracking-widest font-[family-name:var(--font-orbitron)]">Mission Objective (Service)</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all">
                      <option className="bg-gray-900">Select required service...</option>
                      {services.map((s: any) => (
                        <option className="bg-gray-900" key={s._id} value={s.name}>{s.name}</option>
                      ))}
                      <option className="bg-gray-900">Other / Classified</option>
                    </select>
                  </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-neon-blue)] uppercase tracking-widest font-[family-name:var(--font-orbitron)]">Mission Brief (Details)</label>
                    <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all placeholder-gray-700" placeholder="Target hardware specs, issue description..." />
                  </div>
                  
                  <Button type="button" variant="primary" glow className="w-full py-4 text-base font-bold tracking-wider font-[family-name:var(--font-orbitron)] bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">
                    TRANSMIT REQUEST <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
