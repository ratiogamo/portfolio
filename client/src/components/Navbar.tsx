import { useState } from 'react';
import { Link } from 'wouter';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold font-inter text-white">
            JamesDev<span className="text-secondary">Pro</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-gray-300">
          <Link href="/about" className="font-inter font-medium hover:text-white transition-colors">
            About
          </Link>
          <div className="group relative">
            <button className="font-inter font-medium hover:text-white transition-colors flex items-center">
              Services <i className="fas fa-chevron-down text-xs ml-1"></i>
            </button>
            <div className="absolute hidden group-hover:block bg-black/50 backdrop-blur-md border border-white/20 shadow-lg rounded-md pt-4 pb-2 w-60">
              <Link href="/services/business-automation" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Business Automation</Link>
              <Link href="/services/legal-tech" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Legal Tech</Link>
              <Link href="/services/ai-integration" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">AI Integration</Link>
              <Link href="/services/managed-it" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Managed IT</Link>
              <Link href="/services/emergency-support" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Emergency Support</Link>
              <Link href="/services/network-security" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Network Security</Link>
            </div>
          </div>
          <div className="group relative">
            <button className="font-inter font-medium hover:text-white transition-colors flex items-center">
              Portfolio <i className="fas fa-chevron-down text-xs ml-1"></i>
            </button>
            <div className="absolute hidden group-hover:block bg-black/50 backdrop-blur-md border border-white/20 shadow-lg rounded-md pt-4 pb-2 w-60">
              <Link href="/projects/web-apps" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Web Apps</Link>
              <Link href="/projects/e-commerce" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">E-commerce</Link>
              <Link href="/projects/mobile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Mobile</Link>
              <Link href="/projects/it-solutions" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">IT Solutions</Link>
            </div>
          </div>
          <Link href="/blog" className="font-inter font-medium hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="font-inter font-medium hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/portal/dashboard" className="font-inter font-medium hover:text-white transition-colors">
            Customer Portal
          </Link>
          <button
            data-cal-link="ratio/30min"
            data-cal-config='{"layout":"month_view"}'
            className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors"
          >
            Book a Session
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl focus:outline-none text-white"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-md border-t border-white/20">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3 text-gray-300">
            <Link href="/about" className="font-inter font-medium hover:text-white transition-colors text-left" onClick={closeMobileMenu}>
              About
            </Link>
            {/* Mobile Services Links */}
            <p className="font-inter font-medium text-gray-400">Services</p>
            <Link href="/services/business-automation" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Business Automation</Link>
            <Link href="/services/legal-tech" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Legal Tech</Link>
            <Link href="/services/ai-integration" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- AI Integration</Link>
            <Link href="/services/managed-it" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Managed IT</Link>
            <Link href="/services/emergency-support" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Emergency Support</Link>
            <Link href="/services/network-security" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Network Security</Link>
            
            {/* Mobile Portfolio Links */}
            <p className="font-inter font-medium text-gray-400">Portfolio</p>
            <Link href="/projects/web-apps" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Web Apps</Link>
            <Link href="/projects/e-commerce" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- E-commerce</Link>
            <Link href="/projects/mobile" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Mobile</Link>
            <Link href="/projects/it-solutions" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- IT Solutions</Link>

            <Link
              href="/blog"
              className="font-inter font-medium hover:text-white transition-colors"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link href="/contact" className="font-inter font-medium hover:text-white transition-colors text-left" onClick={closeMobileMenu}>
              Contact
            </Link>
            <Link
              href="/portal/dashboard"
              className="font-inter font-medium hover:text-white transition-colors"
              onClick={closeMobileMenu}
            >
              Customer Portal
            </Link>
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors text-center"
            >
              Book a Session
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;