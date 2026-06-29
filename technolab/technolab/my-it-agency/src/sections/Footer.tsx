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
                src="/newlogo.png" 
                alt="TechnoTech Logo" 
                className="w-6 h-6 md:w-10 md:h-10 object-contain shrink-0" 
              />
              
              <span className="text-[11px] sm:text-xs md:text-2xl font-bold text-white tracking-tight truncate">TechnoTech Technologies</span>
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
                  <a href="tel:+ 971 589159474 " className="text-gray-300 hover:text-white transition-colors text-[7.5px] sm:text-[9px] md:text-sm whitespace-nowrap">
                  + 971 589159474 
                  </a>
                </div>
              </li>
              {/* WhatsApp */}
              <li className="flex items-start">
                <div className="w-5 h-5 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-1.5 md:mr-4 shrink-0 mt-0.5">
                  {/* Custom WhatsApp SVG since it isn't natively in Lucide */}
                  <svg className="w-2.5 h-2.5 md:w-4 md:h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[6px] md:text-xs text-gray-500 font-mono mb-0.5 md:mb-1 uppercase tracking-wider">WhatsApp</div>
                  <a 
                    href="https://wa.me/971589159474" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-white transition-colors text-[7.5px] sm:text-[9px] md:text-sm whitespace-nowrap"
                  >
                    +971 58 915 9474
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
          {/* <div className="flex gap-2 md:gap-6 text-[7px] sm:text-[8px] md:text-sm text-gray-500 shrink-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div> */}
        </div>

      </div>
    </footer>
  );
}