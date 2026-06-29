import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Footer from './sections/Footer'; 
import Products from './sections/Products';   
import Careers from './sections/Careers';
import Contact from './sections/Contact';
import About from './sections/About';

function App() {
  return (
    <div className="bg-[#05050f] min-h-screen font-sans selection:bg-fuchsia-500/30">
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