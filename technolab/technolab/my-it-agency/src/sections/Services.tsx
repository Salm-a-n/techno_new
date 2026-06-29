import { useRef } from 'react';
import { Code2, Terminal, Smartphone, Layout, Cloud, Database, 
  Network, Server, Shield, Lock, Cpu, Bot, 
  LineChart, Briefcase, Activity, Headset,ArrowRight,  
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// PREMIUM DATA MODEL
// ============================================================================
const services = [
  {
    id: "software",
    category: "Architecture",
    icon: Code2,
    badgeIcon: Terminal,
    title: "Software Development",
    description: "Custom platforms engineered for scale, reliability and performance.",
    features: ["Enterprise Systems", "API Architecture", "Microservices"],
    color: "from-cyan-400 to-blue-500",
    hexColor: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.15)",
  },
  {
    id: "apps",
    category: "Digital",
    icon: Smartphone,
    badgeIcon: Layout,
    title: "Web & Mobile Apps",
    description: "Beautiful, blazing-fast apps across every screen and device.",
    features: ["React/Next.js Web", "iOS & Android Apps", "UI/UX Design"],
    color: "from-blue-400 to-indigo-500",
    hexColor: "#60a5fa",
    glowColor: "rgba(96, 165, 250, 0.15)",
  },
  {
    id: "cloud",
    category: "Infrastructure",
    icon: Cloud,
    badgeIcon: Database,
    title: "Cloud Solutions",
    description: "Cloud-native architectures across AWS, Azure and GCP.",
    features: ["Cloud Migration", "Serverless Computing", "Multi-Cloud Strategy"],
    color: "from-indigo-400 to-violet-500",
    hexColor: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.15)",
  },
  {
    id: "networking",
    category: "Connectivity",
    icon: Network,
    badgeIcon: Server,
    title: "Networking & Infra",
    description: "High-throughput networks and resilient infrastructure.",
    features: ["Enterprise Routing", "Data Center Setup", "Network Security"],
    color: "from-violet-400 to-purple-500",
    hexColor: "#a78bfa",
    glowColor: "rgba(167, 139, 250, 0.15)",
  },
  {
    id: "security",
    category: "Protection",
    icon: Shield,
    badgeIcon: Lock,
    title: "Cybersecurity",
    description: "Zero-trust defense, threat detection and incident response.",
    features: ["Threat Intelligence", "Penetration Testing", "Compliance Auditing"],
    color: "from-purple-400 to-fuchsia-500",
    hexColor: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.15)",
  },
  {
    id: "ai",
    category: "Intelligence",
    icon: Cpu,
    badgeIcon: Bot,
    title: "AI & Automation",
    description: "Intelligent agents and ML systems that compound value.",
    features: ["Machine Learning", "LLM Integration", "RPA Solutions"],
    color: "from-fuchsia-400 to-pink-500",
    hexColor: "#e879f9",
    glowColor: "rgba(232, 121, 249, 0.15)",
  },
  {
    id: "consulting",
    category: "Strategy",
    icon: LineChart,
    badgeIcon: Briefcase,
    title: "IT Consulting",
    description: "Strategic guidance from architecture to org design.",
    features: ["Digital Transformation", "Tech Stack Audits", "CTO as a Service"],
    color: "from-pink-400 to-rose-500",
    hexColor: "#f472b6",
    glowColor: "rgba(244, 114, 182, 0.15)",
  },
  {
    id: "support",
    category: "Operations",
    icon: Activity,
    badgeIcon: Headset,
    title: "Maintenance & Support",
    description: "Proactive monitoring and 24/7 expert support.",
    features: ["24/7 Helpdesk", "System Monitoring", "SLA Management"],
    color: "from-rose-400 to-orange-500",
    hexColor: "#fb7185",
    glowColor: "rgba(251, 113, 133, 0.15)",
  }
];
// ============================================================================
// COMPONENT
// ============================================================================
export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sweepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const curveRefs = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(() => {
    // 1. Central Line drawing down
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 85%",
          scrub: 1, 
        }
      });
    }

    // 2. Animate each Alternating Row
    rowRefs.current.forEach((row, i) => {
      if (!row) return;

      const card = cardRefs.current[i];
      const sweep = sweepRefs.current[i];
      const curve = curveRefs.current[i];
      const innerFeatures = card?.querySelectorAll('.feature-item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 70%", 
          end: "top 30%",
          scrub: 1.5, // Premium smooth scrub
        }
      });

      // A. Node pops in
      tl.fromTo(nodeRefs.current[i],
        { scale: 0, opacity: 0, backgroundColor: "#05050f" },
        { scale: 1, opacity: 1, backgroundColor: services[i].hexColor, ease: "back.out(2)", duration: 0.5 },
        0
      );

      // B. Draw Curved Connection Line
      if (curve) {
        const length = curve.getTotalLength();
        gsap.set(curve, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(curve, { strokeDashoffset: 0, ease: "power2.out", duration: 0.8 }, 0.2);
      }

      // C. Text slides in
      const isEven = i % 2 === 0;
      tl.fromTo(textRefs.current[i],
        { opacity: 0, x: isEven ? -40 : 40 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 0.8 },
        0.3
      );

      // D. THE CARD REVEAL (Blur -> Fade -> Move -> Scale)
      tl.fromTo(card,
        { 
          opacity: 0, 
          y: 120, 
          scale: 0.85, 
          filter: "blur(20px)" 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1.2
        },
        0.4
      );

      // E. LIGHT SWEEP (Passes over the card right as it settles)
      tl.fromTo(sweep,
        { left: "-100%" },
        { left: "200%", duration: 1.5, ease: "power2.inOut" },
        0.8 
      );

      // F. Inner features stagger in
      if (innerFeatures && innerFeatures.length > 0) {
        tl.fromTo(innerFeatures,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out", duration: 0.6 },
          1.0 
        );
      }
    });
  }, { scope: containerRef });

  // 3D Hover Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out"
    });
  };

  return (
    // ADDED z-20 and overflow-visible here so it slides perfectly OVER the pinned Hero section!
    <section ref={containerRef} id="services" className="relative z-20 py-40 bg-[#05050f] overflow-visible">
      
      {/* ========================================================= */}
      {/* THE BLEED GRADIENT - Softens the transition line!         */}
      {/* ========================================================= */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#05050f] -translate-y-full pointer-events-none z-10"></div>

      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-32 md:mb-48">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            Engineering the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              Next Generation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            We don't just build software. We construct resilient, intelligent architectures designed to scale infinitely and adapt to the future.
          </p>
        </div>

        {/* ========================================== */}
        {/* ALTERNATING ZIG-ZAG TIMELINE               */}
        {/* ========================================== */}
        <div className="relative w-full">
          
          {/* THE TRACK (Dim background line down the absolute center) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/5 z-0"></div>
          {/* Mobile Track */}
          <div className="md:hidden absolute top-0 bottom-0 left-[20px] w-[2px] bg-white/5 z-0"></div>
          
          {/* THE DRAWING LINE (Animated colorful line) */}
          <div 
            ref={lineRef}
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-fuchsia-500 z-10 origin-top shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ transform: 'scaleY(0)' }} 
          ></div>
          <div 
            className="md:hidden absolute top-0 bottom-0 left-[20px] w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-fuchsia-500 z-10 origin-top shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ transform: 'scaleY(1)' }} 
          ></div>

          <div className="space-y-32 md:space-y-40 pb-20">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={service.id}
                  ref={(el) => { rowRefs.current[index] = el; }}
                  className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 pl-[60px] md:pl-0"
                >
                  
                  {/* CENTRAL GLOWING NODE */}
                  <div 
                    ref={(el) => { nodeRefs.current[index] = el; }}
                    className="absolute left-[13px] md:left-1/2 top-8 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-md border-2 border-[#05050f] z-30 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    style={{ opacity: 0 }}
                  ></div>

                  {/* SVG CURVED BRANCH (Desktop Only) */}
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-y-1/2 w-[150px] h-[100px] z-0 pointer-events-none" style={{ transform: isEven ? 'translateX(0)' : 'translateX(-100%) scaleX(-1)' }}>
                    <svg className="w-full h-full overflow-visible">
                      <path 
                        ref={(el) => { curveRefs.current[index] = el; }}
                        d="M 0 50 C 75 50, 75 100, 150 100" 
                        fill="none" 
                        stroke={service.hexColor} 
                        strokeWidth="2" 
                        className="opacity-50"
                      />
                    </svg>
                  </div>

                  {/* TEXT BLOCK */}
                  <div 
                    ref={(el) => { textRefs.current[index] = el; }}
                    className={`w-full md:w-5/12 pt-2 md:pt-0 ${isEven ? 'md:order-1 md:pr-16 lg:pr-24' : 'md:order-2 md:pl-16 lg:pl-24'}`}
                    style={{ opacity: 0 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                      <service.badgeIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight leading-[1.1]">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-3 text-sm font-semibold text-white group cursor-pointer w-fit">
                      Explore Solution 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-gray-500 group-hover:text-white" />
                    </div>
                  </div>

                  {/* PREMIUM CARD BLOCK */}
                  <div 
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`w-full md:w-5/12 perspective-1000 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                    style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
                  >
                    <div 
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="group relative bg-[#0a0f25]/50 border border-white/10 rounded-3xl p-8 md:p-12 transition-colors duration-700 hover:bg-[#0d132e]/70 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer"
                      style={{ boxShadow: `0 20px 50px -20px ${service.glowColor}` }}
                    >
                      {/* --- THE LIGHT SWEEP --- */}
                      <div 
                        ref={(el) => { sweepRefs.current[index] = el; }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] z-20 pointer-events-none"
                      ></div>

                      {/* Top inner reflection */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none`}></div>

                      <div className="relative z-10 pointer-events-none">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-10`}>
                          <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                            <service.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                          </div>
                        </div>

                        <div className="space-y-4">
                          {service.features.map((feat, i) => (
                            <div 
                              key={i} 
                              className="feature-item flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                                <span className="text-sm font-medium text-gray-200">{feat}</span>
                              </div>
                              <span className="text-xs font-mono text-gray-500">Active</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}