import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Footer from './sections/Footer'; 
import Products from './sections/Products';   
import Careers from './sections/Careers';
import Contact from './sections/Contact';
import About from './sections/About';

// Ensure plugins are registered globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Adjust this to make the scroll slower or faster
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium ease curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // 2. Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Turn off GSAP's default lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
<div className="bg-[#05050f] min-h-screen font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">  
    <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <Careers />
        <Contact />
      </main>
      <Footer /> 
    </div>
  );
}

export default App;