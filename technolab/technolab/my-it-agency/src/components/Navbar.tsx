import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // State to track the sliding indicator's position and width
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Career", href: "#career" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // 1. Handle background glassmorphism on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Setup Intersection Observer for Active State
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Adjusts when the section triggers as active
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections based on navLinks
    navLinks.forEach(link => {
      const sectionId = link.href.substring(1); // Remove the '#'
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

 // Function to handle smooth scrolling and closing mobile menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    
    const targetId = href.substring(1); 
    
    // SPECIAL CASE FOR HOME: 
    // Bypass GSAP's pin wrapper confusion and scroll to the absolute top of the page.
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
      return;
    }

    // Standard behavior for all other sections
    const element = document.getElementById(targetId);
    if (element) {
      // Small offset adjustment to ensure headers don't overlap section content
      const offset = 80; // approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false); 
    } else {
      console.warn(`Section with ID '${targetId}' not found on this page.`);
    }
  };

  // Function to calculate where the sliding pill should move (Desktop)
  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!navLinksRef.current) return;
    
    const containerRect = navLinksRef.current.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();

    setIndicatorStyle({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1
    });
  };

  // Hide the indicator when the mouse leaves the navigation area
  const handleMouseLeave = () => {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      
      <nav 
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-500 rounded-full border ${
          isScrolled 
            ? 'bg-[#0a0f25]/70 backdrop-blur-xl border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] py-3 px-6' 
            : 'bg-[#0a0f25]/30 backdrop-blur-md border-white/5 py-4 px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* 1. LEFT: LOGO */}
<a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group shrink-0">
  
  {/* Add your public image here */}
  <img 
    src="/newlogo.png" 
    alt="TechnoTech Logo" 
    className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300" 
  />
  
  {/* <span className="text-xl font-bold text-white tracking-tight">TechnoTech</span> */}
</a>

          {/* 2. CENTER: ANIMATED NAV LINKS (Desktop) */}
          <div 
            ref={navLinksRef}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:flex items-center relative"
          >
            {/* THE SLIDING INDICATOR */}
            <div 
              className="absolute h-full top-0 bg-white/5 border border-white/10 rounded-full pointer-events-none"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)' 
              }}
            >
              <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-cyan-400 blur-sm"></div>
              <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-white"></div>
            </div>

            {/* The actual links */}
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onMouseEnter={handleMouseEnter}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative z-10 px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Subtle active dot indicator under the active text */}
                  {isActive && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                  )}
                </a>
              );
            })}
          </div>

          {/* 3. RIGHT: ACTIONS */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="lg:hidden relative z-50 text-gray-300 hover:text-white p-2 pointer-events-auto transition-transform active:scale-95" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* ========================================== */}
      {/* MOBILE DROPDOWN MENU - MIRROR DESIGN       */}
      {/* ========================================== */}
      <div 
        className={`lg:hidden absolute top-[80px] left-4 right-4 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-3xl p-6 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.1)] pointer-events-auto origin-top ${
          mobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.substring(1);
            
            return (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' 
                }}
                className={`flex items-center justify-between text-lg font-medium py-4 px-2 border-b border-white/5 transition-all duration-500 transform ${
                  mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                } ${
                  isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>}
              </a>
            );
          })}
          
          <div 
            style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms' }}
            className={`flex flex-col gap-3 mt-6 transition-all duration-500 transform ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold text-black bg-white rounded-xl active:scale-95 transition-transform"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}