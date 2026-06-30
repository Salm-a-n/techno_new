import { useRef, useState } from 'react';
import { 
  ArrowRight, MapPin, Clock, Mail, 
  Heart, Zap, Globe, Briefcase, Sparkles, Send
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DATA MODELS
// ============================================================================
const cultureValues = [
  {
    title: "People first",
    description: "Genuine care, low ego, high trust.",
    icon: Heart,
    color: "from-rose-400 to-pink-500",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
  {
    title: "Ship velocity",
    description: "Small teams shipping daily.",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    title: "Global remote",
    description: "Talent everywhere, headquartered nowhere.",
    icon: Globe,
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
  }
];

const jobs = [
  { title: "AI / ML Engineer", location: "San Francisco · Hybrid", type: "Full-time" },
  { title: "Cloud Architect", location: "London · Hybrid", type: "Full-time" },
  { title: "Cybersecurity Analyst", location: "Remote · EMEA", type: "Full-time" },
  { title: "Product Designer", location: "Berlin · Hybrid", type: "Full-time" },
  { title: "DevOps Engineer", location: "Remote · Global", type: "Contract" },
];

// ============================================================================
// COMPONENT
// ============================================================================
export default function Careers() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cultureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const jobRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  // State to track which job the user clicked
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Header reveal
    tl.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    // 2. Culture Cards Stagger
    tl.fromTo(cultureRefs.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.2)" },
      "-=0.2"
    );

    // 3. Job Rows Stagger (with 3D fold effect)
    tl.fromTo(jobRefs.current,
      { opacity: 0, rotateX: -30, transformPerspective: 1000, transformOrigin: "top center" },
      { opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // 4. CTA Block reveal
    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

  }, { scope: containerRef });

  // 3D Hover Effect for Culture Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
  };

  // Handle clicking a job: Updates state, scrolls down, and pulses the box
  const handleJobClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    
    if (ctaRef.current) {
      // Smooth scroll to the CTA box
      ctaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Pulse animation to draw attention
      gsap.fromTo(ctaRef.current, 
        { scale: 0.95, boxShadow: "0 0 0 rgba(34, 211, 238, 0)" }, 
        { scale: 1, boxShadow: "0 0 50px rgba(34, 211, 238, 0.4)", duration: 0.5, ease: "back.out(2)", yoyo: true, repeat: 1 }
      );
    }
  };

  // Dynamic email details
  const emailTarget = "info@technotechtechnologies.com";
  const emailSubject = selectedJob ? `Application: ${selectedJob} - TechnoTech` : "Spontaneous Application - TechnoTech";

  return (
    <section ref={containerRef} id="career" className="relative py-32 md:py-40 bg-[#05050f] overflow-hidden z-10 border-t border-white/5">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-24 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Briefcase className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
              Join Our Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            We're hiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">extraordinary humans</span> <br className="hidden md:block" />
            to build extraordinary technology.
          </h2>
        </div>

        {/* Culture Section (Now with 3D Interaction) */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">A place to do your best work</h3>
            <p className="text-gray-400 font-light">Our culture is the operating system of our company.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
            {cultureValues.map((item, index) => (
              <div 
                key={index}
                ref={(el) => { cultureRefs.current[index] = el; }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-[#0a0f25]/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md opacity-0 hover:bg-[#0d132e]/80 transition-colors duration-500 cursor-pointer"
                style={{ boxShadow: `0 10px 40px -20px ${item.glowColor}` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] mb-6`}>
                  <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white mb-8 px-2">Open Roles</h3>
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => (
              <button 
                key={index}
                ref={(el) => { jobRefs.current[index] = el; }}
                onClick={() => handleJobClick(job.title)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-[#0a0f25]/80 border border-white/5 hover:border-transparent transition-all duration-300 overflow-hidden text-left opacity-0"
              >
                {/* Advanced Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Gradient Border Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 group-hover:w-full transition-all duration-700 ease-out"></div>

                <div className="relative z-10 mb-6 md:mb-0">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all duration-300">
                    {job.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
                    <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-fuchsia-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> {job.type}
                    </span>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center justify-between md:justify-end w-full md:w-auto mt-4 md:mt-0">
                  <span className="text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300 md:mr-4">
                    Apply Now
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 transform group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic CTA Block */}
        <div 
          id="apply-section"
          ref={ctaRef}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 to-fuchsia-900/40 border border-white/10 p-10 md:p-16 text-center backdrop-blur-xl opacity-0 transition-shadow duration-500"
        >
          {/* Internal Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {selectedJob ? (
              <Send className="w-8 h-8 text-cyan-400 mb-6 animate-pulse" />
            ) : (
              <Sparkles className="w-8 h-8 text-fuchsia-400 mb-6" />
            )}
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-300">
              {selectedJob ? `Apply for ${selectedJob}` : "Don't see your role?"}
            </h3>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-lg mb-10 font-light transition-all duration-300">
              {selectedJob 
                ? "Click below to open your email client. Please attach your resume and a brief introduction."
                : "We are always looking for exceptional talent. Send us your resume and we'll reach out when something fits."}
            </p>
            
            {/* Dynamic Mailto Button */}
            <a 
              href={`mailto:${emailTarget}?subject=${encodeURIComponent(emailSubject)}`} 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <Mail className="w-5 h-5" />
              {selectedJob ? "Send Application" : "Send Resume via Email"}
            </a>
            
            {/* Reset button if a job is selected */}
            {selectedJob && (
              <button 
                onClick={() => setSelectedJob(null)}
                className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cancel / View General Application
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}