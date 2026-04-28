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
          <Link href="/" aria-label="JamesDevPro Home">
            <img src="/logo.png" alt="JamesDevPro Logo" className="h-20 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-gray-300">
          <Link href="/about" className="font-inter font-medium hover:text-white transition-colors">
            About
          </Link>
          <div className="group relative">
            <button className="font-inter font-medium hover:text-white transition-colors flex items-center">
              Services <i className="fas fa-chevron-down text-xs ml-1"></i>
            </button>
            <div className="absolute hidden group-hover:block bg-black/50 backdrop-blur-md border border-white/20 shadow-lg rounded-md pt-4 pb-2 w-60">
              <Link href="/services/emergency-rescue" className="block px-4 py-2 text-sm text-red-300 hover:bg-white/10 hover:text-white font-semibold">🚨 Emergency Workflow Rescue</Link>
              <Link href="/services/agentic-architecture" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Agentic Architecture</Link>
              <Link href="/services/private-llm" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Private LLM Infrastructure</Link>
              <div className="border-t border-white/10 my-1"></div>
              <Link href="/services/business-automation" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Business Automation</Link>
              <Link href="/services/legal-tech" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Legal Firm Automation</Link>
              <Link href="/services/ai-integration" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">AI Integration</Link>
            </div>
          </div>
          <Link href="/projects/case-studies" className="font-inter font-medium hover:text-white transition-colors">
            Case Studies
          </Link>
          <Link href="/directory" className="font-inter font-medium hover:text-white transition-colors">
            Directory
          </Link>
          <Link href="/pricing" className="font-inter font-medium text-primary hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="font-inter font-medium hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="font-inter font-medium hover:text-white transition-colors">
            Contact
          </Link>
          <button
            data-cal-link="ratio/30min"
            data-cal-config='{"layout":"month_view"}'
            className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors"
          >
            Book Free Strategy Call
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-2xl focus:outline-none text-white"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/50 backdrop-blur-md border-t border-white/20">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3 text-gray-300">
            <Link href="/about" className="font-inter font-medium hover:text-white transition-colors text-left" onClick={closeMobileMenu}>
              About
            </Link>
            {/* Mobile Services Links */}
            <p className="font-inter font-medium text-gray-400">Services</p>
            <Link href="/services/emergency-rescue" className="font-inter font-medium text-red-300 hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>🚨 Emergency Workflow Rescue</Link>
            <Link href="/services/agentic-architecture" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Agentic Architecture</Link>
            <Link href="/services/private-llm" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Private LLM Infrastructure</Link>
            <Link href="/services/business-automation" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Business Automation</Link>
            <Link href="/services/legal-tech" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- Legal Firm Automation</Link>
            <Link href="/services/ai-integration" className="font-inter font-medium hover:text-white transition-colors text-left pl-4" onClick={closeMobileMenu}>- AI Integration</Link>
            
            <Link href="/projects/case-studies" className="font-inter font-medium hover:text-white transition-colors text-left" onClick={closeMobileMenu}>
              Case Studies
            </Link>
            <Link href="/directory" className="font-inter font-medium hover:text-white transition-colors text-left" onClick={closeMobileMenu}>
              Directory
            </Link>
            <Link href="/pricing" className="font-inter font-medium text-primary hover:text-white transition-colors text-left" onClick={closeMobileMenu}>
              Pricing
            </Link>
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
            <button
              data-cal-link="ratio/30min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors text-center"
            >
              Book Free Strategy Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;