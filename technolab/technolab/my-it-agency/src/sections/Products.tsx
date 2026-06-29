import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Database, LineChart, Bot, 
  Cloud, Layers, ShieldCheck, ChevronLeft, ChevronRight 
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ============================================================================
// PRODUCT DATA MODEL
// ============================================================================
const products = [
  {
    id: "erp",
    tag: "OPERATIONS",
    title: "ERP Solutions",
    description: "Unified resource planning with real-time intelligence.",
    icon: Database,
    color: "from-blue-400 to-cyan-400",
    hexColor: "#22d3ee",
    glowColor: "rgba(34, 211, 238, 0.4)",
    bgGradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "crm",
    tag: "REVENUE",
    title: "CRM Systems",
    description: "Sales, service and marketing on one elegant surface.",
    icon: LineChart,
    color: "from-emerald-400 to-teal-400",
    hexColor: "#34d399",
    glowColor: "rgba(16, 185, 129, 0.4)",
    bgGradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "ai",
    tag: "INTELLIGENCE",
    title: "AI Business Tools",
    description: "Co-pilots and agents that automate the busywork.",
    icon: Bot,
    color: "from-fuchsia-400 to-purple-500",
    hexColor: "#d946ef",
    glowColor: "rgba(217, 70, 239, 0.4)",
    bgGradient: "from-fuchsia-500/20 to-purple-500/20"
  },
  {
    id: "cloud",
    tag: "INFRA",
    title: "Cloud Platforms",
    description: "Elastic infrastructure with zero ops overhead.",
    icon: Cloud,
    color: "from-indigo-400 to-blue-500",
    hexColor: "#818cf8",
    glowColor: "rgba(99, 102, 241, 0.4)",
    bgGradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    id: "suite",
    tag: "WORKFLOW",
    title: "Enterprise Suite",
    description: "Modular apps for complex global organizations.",
    icon: Layers,
    color: "from-orange-400 to-red-500",
    hexColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.4)",
    bgGradient: "from-orange-500/20 to-red-500/20"
  },
  {
    id: "security",
    tag: "DEFENSE",
    title: "Security Systems",
    description: "Adaptive threat protection across every layer.",
    icon: ShieldCheck,
    color: "from-rose-400 to-pink-500",
    hexColor: "#fb7185",
    glowColor: "rgba(244, 63, 94, 0.4)",
    bgGradient: "from-rose-500/20 to-pink-500/20"
  }
];

// ============================================================================
// COMPONENT
// ============================================================================
export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const total = products.length;

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  // GSAP 3D Carousel Logic
  useGSAP(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Calculate the relative distance from the active card (-2, -1, 0, 1, 2)
      let diff = (i - activeIndex + total) % total;
      // Convert to negative for items on the left to create an infinite loop feel
      if (diff > total / 2) diff -= total; 

      // Math for the 3D positioning
      const isMobile = window.innerWidth < 768;
      const xOffset = isMobile ? 100 : 200; // How far apart cards are horizontally
      const zOffset = 250; // How far back the side cards get pushed
      const rotationY = 35; // The angle of the side cards

      const isActive = diff === 0;
      const x = diff * xOffset;
      const z = Math.abs(diff) * -zOffset;
      
      // Left cards face right (positive rotation), Right cards face left (negative rotation)
      const rotateY = isActive ? 0 : (diff > 0 ? -rotationY : rotationY);
      
      const scale = isActive ? 1 : 1 - Math.abs(diff) * 0.1;
      const opacity = isActive ? 1 : Math.max(0, 1 - Math.abs(diff) * 0.4);
      const zIndex = total - Math.abs(diff);

      // Animate the card to its new 3D position
      gsap.to(card, {
        x: x,
        z: z,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate the intense glow specifically for the active card
      gsap.to(card, {
        boxShadow: isActive 
          ? `0 30px 60px -20px ${products[i].glowColor}, inset 0 0 20px rgba(255,255,255,0.1)` 
          : `0 10px 30px -10px rgba(0,0,0,0.5), inset 0 0 0px rgba(255,255,255,0)`,
        duration: 0.8,
      });
    });
  }, { dependencies: [activeIndex], scope: containerRef });

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  return (
    <section ref={containerRef} id="products" className="relative py-32 bg-[#05050f] overflow-hidden">
      
      {/* Background Ambient Glow that shifts color based on active product */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: products[activeIndex].hexColor }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Layers className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
              Our Ecosystem
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            The Enterprise Suite
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg mx-auto font-light">
            Modular platforms designed to seamlessly integrate.
          </p>
        </div>

        {/* ========================================== */}
        {/* THE 3D CAROUSEL STAGE                      */}
        {/* ========================================== */}
        <div 
          className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px] transform-style-3d"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {products.map((product, index) => (
            <div 
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              onClick={() => setActiveIndex(index)}
              // Start cards completely centered in the absolute middle of the stage
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[360px] h-[450px] md:h-[550px] bg-[#0a0f25]/80 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between backdrop-blur-2xl cursor-pointer overflow-hidden group"
              style={{ transformOrigin: 'center center' }}
            >
              
              {/* Card Top Glow Overlay */}
              <div className={`absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b ${product.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-t-[2rem]`}></div>

              {/* Huge Background Watermark Icon */}
              <div className="absolute -right-12 -bottom-12 opacity-[0.05] pointer-events-none">
                <product.icon className="w-80 h-80 text-white" />
              </div>

              {/* --- Card Content Top --- */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  {/* Icon Box */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} p-[1px]`}>
                    <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Tag */}
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    {product.tag}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* --- Card Content Bottom --- */}
              <div className="relative z-10 w-full pt-6 border-t border-white/10">
                <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex items-center justify-center gap-2 text-white font-medium text-sm">
                  Explore {product.tag.toLowerCase()}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-6 mt-12 z-20">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}