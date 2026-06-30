import { useRef } from 'react';
import { Target, Eye, Award, Briefcase, Users, Clock, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CONTENT DATA MODELS
// ============================================================================
const stats = [
  { icon: Briefcase, label: "Projects Completed", value: 250, suffix: "+" },
  { icon: Users, label: "Happy Clients", value: 180, suffix: "+" },
  { icon: Clock, label: "Years of Experience", value: 12, suffix: "+" },
];

const coreValues = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To deliver world-class digital solutions that help businesses innovate, scale, and thrive in an increasingly connected world. We combine technology expertise with strategic thinking to solve complex challenges.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To lead the future of digital transformation by creating intelligent, scalable, and impactful technology solutions that drive progress across industries worldwide.",
    color: "from-indigo-400 to-purple-500"
  },
  {
    icon: Award,
    title: "Our Values",
    desc: "We are driven by innovation, committed to excellence, guided by integrity, and focused on delivering measurable results. Every solution reflects our dedication to quality and customer success.",
    color: "from-fuchsia-400 to-pink-500"
  }
];

// ============================================================================
// COMPONENT
// ============================================================================
export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const gridRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

 useGSAP(() => {
    // 0. MAIN: Entire section fades in and out on scroll (PROMINENT FADE EFFECT)
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 120,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power2.out", // Changed from inOut to out for a smoother landing
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", // Starts right as the section enters the viewport
          end: "top 15%",   // Reaches full opacity and final position early
          scrub: 1,         // Reduced from 1.8 for tighter, less laggy response
        },
      }
    );

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
    gsap.fromTo(mainCardRef.current,
      { 
        scale: 0.75,
        opacity: 0,
        borderRadius: "100px" 
      },
      {
        scale: 1, 
        opacity: 1,
        borderRadius: "32px", 
        scrollTrigger: {
          trigger: mainCardRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.5, 
        }
      }
    );

    // 3. Stats Fade Up & Number Counting Animation
    statRefs.current.forEach((stat, index) => {
      gsap.fromTo(stat,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the actual numbers counting up
      gsap.fromTo(numberRefs.current[index], 
        { innerHTML: "0" }, 
        {
          innerHTML: stats[index].value,
          duration: 2,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: numberRefs.current[index],
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 4. Staggered Scale-Pop for the Mission/Vision/Values Grid
    gridRefs.current.forEach((card) => {
      if (card) {
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
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative py-40  overflow-hidden"
    >
      
      {/* Hero-like Background Stars */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', 
          backgroundSize: '150px 150px'
        }}
      ></div>

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ========================================== */}
        {/* HEADER SECTION                             */}
        {/* ========================================== */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
           Crafting the <br className="hidden md:block" />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">digital</span> backbone of tomorrow.
          </h2>
        </div>

        {/* ========================================== */}
        {/* THE MAIN SCALING VISION CARD               */}
        {/* ========================================== */}
        <div className="w-full flex justify-center mb-16">
          <div 
            ref={mainCardRef}
            className="w-full max-w-5xl bg-[#0a0f25]/80 border border-white/10 backdrop-blur-2xl p-10 md:p-16 relative overflow-hidden shadow-2xl origin-center rounded-3xl"
            style={{ boxShadow: '0 30px 60px -20px rgba(34, 211, 238, 0.15)' }}
          >
            {/* Inner Glows */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
              
              <div className="w-20 h-20 shrink-0 rounded-3xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-[1px]">
                <div className="w-full h-full bg-[#05050f] rounded-[23px] flex items-center justify-center">
                  <Target className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
                  Empowering Businesses Through Technology
                </h3>
                <div className="space-y-4 text-gray-400 text-base md:text-lg font-light leading-relaxed">
                  <p>
                    We help businesses embrace digital transformation through innovative software solutions, cloud technologies, and intelligent automation. Our team combines technical expertise with creative thinking to deliver solutions that drive growth and efficiency.
                  </p>
                  <p>
                    From <span className="text-white font-medium">custom software development, web and mobile applications, cloud infrastructure, cybersecurity, AI solutions, and IT consulting</span>, we create scalable and reliable systems tailored to your business goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* STATS SECTION                              */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              ref={(el) => { statRefs.current[index] = el; }}
              className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center backdrop-blur-sm shadow-lg group hover:bg-white/10 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 flex items-center justify-center">
                <span ref={(el) => { numberRefs.current[index] = el; }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* THE STAGGERED SCALE GRID (MISSION/VISION)  */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {coreValues.map((val, index) => (
            <div 
              key={index}
              ref={(el) => { gridRefs.current[index] = el; }}
              className="bg-[#0a0f25]/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-[#0a0f25]/80 transition-colors duration-500 relative group overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} p-[1px] mb-6 shadow-lg`}>
                <div className="w-full h-full bg-[#05050f] rounded-[11px] flex items-center justify-center">
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