import { useRef } from 'react';
import { Target, Zap, Globe, Shield, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Zap,
    title: "Velocity",
    desc: "We ship at the speed of thought, turning complex problems into deployed solutions instantly.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: Shield,
    title: "Security First",
    desc: "Zero-trust architecture baked into every line of code we write.",
    color: "from-indigo-400 to-purple-500"
  },
  {
    icon: Globe,
    title: "Global Scale",
    desc: "Systems engineered to handle millions of concurrent users without breaking a sweat.",
    color: "from-fuchsia-400 to-pink-500"
  }
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const gridRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Header Text Fade & Slight Scale
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      }
    );

    // 2. The Massive Central Card Scale
    // This scales up dynamically as the user scrolls past it
    gsap.fromTo(mainCardRef.current,
      { 
        scale: 0.75, // Starts small
        opacity: 0,
        borderRadius: "100px" // Starts super round
      },
      {
        scale: 1, // Grows to full size
        opacity: 1,
        borderRadius: "32px", // Sharpens up
        scrollTrigger: {
          trigger: mainCardRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.5, // Smooth scrubbing
        }
      }
    );

    // 3. Staggered Scale-Pop for the Grid Items
    gridRefs.current.forEach((card) => { // <--- Removed the unused 'i'
      gsap.fromTo(card,
        { 
          scale: 0.5, 
          opacity: 0,
          y: 100
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.5)", 
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse" 
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="relative py-40 bg-[#05050f] overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ========================================== */}
        {/* HEADER SECTION                             */}
        {/* ========================================== */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
              Our DNA
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            Built by engineers, <br className="hidden md:block" />
            for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">future.</span>
          </h2>
        </div>

        {/* ========================================== */}
        {/* THE MAIN SCALING VISION CARD               */}
        {/* ========================================== */}
        <div className="w-full flex justify-center mb-24">
          <div 
            ref={mainCardRef}
            className="w-full max-w-5xl bg-[#0a0f25]/80 border border-white/10 backdrop-blur-2xl p-10 md:p-20 relative overflow-hidden shadow-2xl origin-center"
            style={{ boxShadow: '0 30px 60px -20px rgba(34, 211, 238, 0.15)' }}
          >
            {/* Inner Glows */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-[1px] mb-10">
                <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl md:text-5xl font-medium text-white mb-8 tracking-tight">
                We bridge the gap between <br className="hidden md:block"/> ambition and execution.
              </h3>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                TechnoTech was founded on a simple principle: software should be a force multiplier, not a bottleneck. We obsess over architecture, performance, and user experience so you can focus on conquering your market.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* THE STAGGERED SCALE GRID                   */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((val, index) => (
            <div 
              key={index}
              ref={(el) => { gridRefs.current[index] = el; }}
              className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500 relative group overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} p-[1px] mb-6 shadow-lg`}>
                <div className="w-full h-full bg-[#0a0f25] rounded-[11px] flex items-center justify-center">
                  <val.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-white mb-3">
                {val.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}