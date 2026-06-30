import { useRef, useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

    // 2. Info Cards Stagger (Left column)
    tl.fromTo(infoRefs.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // 3. Form Reveal (Right column)
    tl.fromTo(formRef.current,
      { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

  }, { scope: containerRef });

  // Handle Form Submission via Mailto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targetEmail = "info@technotechtechnologies.com";
    const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );

    // Trigger the mailto link
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={containerRef} id="contact" className="relative py-32 md:py-40 bg-[#05050f] overflow-hidden z-10 border-t border-white/5">
      
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      ></div>

      {/* Ambient Glows */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-20 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
              Contact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Let's build something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              extraordinary
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            Tell us about your project. We'll respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Email Card */}
            <div ref={(el) => { infoRefs.current[0] = el; }} className="group flex items-start gap-5 p-6 md:p-8 rounded-3xl bg-[#0a0f25]/50 border border-white/5 hover:bg-[#0d132e]/80 hover:border-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 p-[1px] shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-shadow duration-300">
                <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Email</div>
                <a href="mailto:info@technotechtechnologies.com" className="text-lg md:text-xl font-medium text-white hover:text-cyan-400 transition-colors break-all">
                  info@technotechtechnologies.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div ref={(el) => { infoRefs.current[1] = el; }} className="group flex items-start gap-5 p-6 md:p-8 rounded-3xl bg-[#0a0f25]/50 border border-white/5 hover:bg-[#0d132e]/80 hover:border-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-500 p-[1px] shrink-0 shadow-[0_0_20px_rgba(232,121,249,0.15)] group-hover:shadow-[0_0_30px_rgba(232,121,249,0.3)] transition-shadow duration-300">
                <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                  <Phone className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Phone</div>
                <a href="tel: +971 58 915 9474" className="text-lg md:text-xl font-medium text-white hover:text-fuchsia-400 transition-colors">
                   +971 58 915 9474
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div ref={(el) => { infoRefs.current[2] = el; }} className="group flex items-start gap-5 p-6 md:p-8 rounded-3xl bg-[#0a0f25]/50 border border-white/5 hover:bg-[#0d132e]/80 hover:border-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 p-[1px] shrink-0 shadow-[0_0_20px_rgba(129,140,248,0.15)] group-hover:shadow-[0_0_30px_rgba(129,140,248,0.3)] transition-shadow duration-300">
                <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Address</div>
                <p className="text-gray-300 leading-relaxed">
                  Office No:31 Royal Future Real Estate<br />
                  2nd Floor Madhina Mall<br />
                  Al Quasis Muhaisinah 4
                </p>
              </div>
            </div>



            {/* WhatsApp Card */}
            <div ref={(el) => { infoRefs.current[3] = el; }} className="group flex items-start gap-5 p-6 md:p-8 rounded-3xl bg-[#0a0f25]/50 border border-white/5 hover:bg-[#0d132e]/80 hover:border-white/10 transition-all duration-300 backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-[1px] shrink-0 shadow-[0_0_20px_rgba(74,222,128,0.15)] group-hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-shadow duration-300">
                <div className="w-full h-full bg-[#05050f] rounded-[15px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                  {/* WhatsApp SVG */}
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">WhatsApp</div>
                <a href="https://wa.me/971589159474" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-medium text-white hover:text-green-400 transition-colors">
                  +971 58 915 9474
                </a>
              </div>
            </div>

            {/* Social Links */}
            

          </div>

          {/* RIGHT COLUMN: The Form */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="bg-gradient-to-br from-[#0a0f25]/80 to-[#05050f]/80 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Internal subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono text-gray-400 tracking-widest uppercase ml-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-mono text-gray-400 tracking-widest uppercase ml-1">Phone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-gray-400 tracking-widest uppercase ml-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="message" className="text-xs font-mono text-gray-400 tracking-widest uppercase ml-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project requirements, timeline, and goals..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                >
                  {/* Button Hover Sweep */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  
                  <span className="relative z-10 text-lg">Send Message</span>
                  <Send className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
                <p className="text-center text-xs text-gray-500 mt-2 font-light">
                  This will open your default email client securely.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}