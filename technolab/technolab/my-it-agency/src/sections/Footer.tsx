import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Career", href: "#career" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-[#05050f] border-t border-white/5 overflow-hidden pt-10 md:pt-24 pb-6 md:pb-12">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Grid Section - Forced 12 Columns on ALL screen sizes */}
        <div className="grid grid-cols-12 gap-3 md:gap-12 lg:gap-20 mb-8 md:mb-20">
          
          {/* Column 1: Brand (5 cols) */}
          <div className="col-span-5">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-6">
              
              <img 
                src="/logo.jpeg" 
                alt="TechnoTech Logo" 
                className="w-6 h-6 md:w-10 md:h-10 object-contain shrink-0" 
              />
              
              <span className="text-[11px] sm:text-xs md:text-2xl font-bold text-white tracking-tight truncate">TechnoTech</span>
            </div>
            
            <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-lg leading-relaxed md:leading-relaxed font-light pr-2 md:max-w-sm">
              Innovating the future through technology. Premium IT solutions for forward-thinking enterprises.
            </p>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="col-span-3">
            <h4 className="text-white font-semibold mb-2 md:mb-6 tracking-wide text-[9px] sm:text-[10px] md:text-base">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300 w-fit text-[8px] sm:text-[9px] md:text-sm"
                  >
                    <ChevronRight className="w-2.5 h-2.5 md:w-4 md:h-4 mr-1 md:mr-2 opacity-0 -translate-x-2 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details (4 cols) */}
          <div className="col-span-4">
            <h4 className="text-white font-semibold mb-2 md:mb-6 tracking-wide text-[9px] sm:text-[10px] md:text-base">Contact Us</h4>
            <ul className="space-y-3 md:space-y-6">
              
              {/* Email */}
              <li className="flex items-start">
                <div className="w-5 h-5 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-1.5 md:mr-4 shrink-0 mt-0.5">
                  <Mail className="w-2.5 h-2.5 md:w-4 md:h-4 text-cyan-400" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[6px] md:text-xs text-gray-500 font-mono mb-0.5 md:mb-1 uppercase tracking-wider">Email</div>
                  <a href="mailto:salmanntechs@gmail.com" className="text-gray-300 hover:text-white transition-colors text-[7.5px] sm:text-[9px] md:text-sm break-all md:break-normal line-clamp-2 md:line-clamp-none">
                    info@technotechtechnologies.com
                  </a>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start">
                <div className="w-5 h-5 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-1.5 md:mr-4 shrink-0 mt-0.5">
                  <Phone className="w-2.5 h-2.5 md:w-4 md:h-4 text-fuchsia-400" />
                </div>
                <div>
                  <div className="text-[6px] md:text-xs text-gray-500 font-mono mb-0.5 md:mb-1 uppercase tracking-wider">Phone</div>
                  <a href="tel:+971581369996" className="text-gray-300 hover:text-white transition-colors text-[7.5px] sm:text-[9px] md:text-sm whitespace-nowrap">
                  +971 58 136 9996
                  </a>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start">
                <div className="w-5 h-5 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-1.5 md:mr-4 shrink-0 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 md:w-4 md:h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="text-[6px] md:text-xs text-gray-500 font-mono mb-0.5 md:mb-1 uppercase tracking-wider">Location</div>
                  <p className="text-gray-300 text-[7.5px] sm:text-[9px] md:text-sm leading-tight md:leading-relaxed pr-1">
                   Office No:31 Royal Future Real Estate<br />
                    2nd Floor Madina Mall<br />
                    Al Quasis Muhaisinah 4
                  </p>
                </div>
              </li>
              
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-4 md:pt-8 border-t border-white/10 flex flex-row items-center justify-between gap-2 md:gap-4">
          <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-sm text-left">
            © {currentYear} TechnoTech Technologies. All rights reserved.
          </p>
          <div className="flex gap-2 md:gap-6 text-[7px] sm:text-[8px] md:text-sm text-gray-500 shrink-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}