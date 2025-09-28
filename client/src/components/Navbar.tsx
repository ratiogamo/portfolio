import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to handle navigation to home page sections
  const handleSectionNavigation = (sectionId: string) => {
    if (location === '/') {
      // If already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
    closeMobileMenu();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold font-inter text-primary">
            James<span className="text-secondary">D</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="font-inter font-medium hover:text-primary transition-colors">
            About
          </Link>
          <div className="group relative">
            <button className="font-inter font-medium hover:text-primary transition-colors flex items-center">
              Services <i className="fas fa-chevron-down text-xs ml-1"></i>
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-60">
              <Link href="/services/business-automation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business Automation</Link>
              <Link href="/services/legal-tech" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Legal Tech</Link>
              <Link href="/services/ai-integration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AI Integration</Link>
              <Link href="/services/managed-it" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Managed IT</Link>
              <Link href="/services/emergency-support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Emergency Support</Link>
              <Link href="/services/network-security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Network Security</Link>
            </div>
          </div>
          <button
            onClick={() => handleSectionNavigation('portfolio')}
            className="font-inter font-medium hover:text-primary transition-colors"
          >
            Portfolio
          </button>
          <Link href="/blog" className="font-inter font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="font-inter font-medium hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/portal/dashboard" className="font-inter font-medium hover:text-primary transition-colors">
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
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link href="/about" className="font-inter font-medium hover:text-primary transition-colors text-left" onClick={closeMobileMenu}>
              About
            </Link>
            {/* Mobile Services Links */}
            <Link href="/services/business-automation" className="font-inter font-medium hover:text-primary transition-colors text-left pl-4" onClick={closeMobileMenu}>- Business Automation</Link>
            <Link href="/services/legal-tech" className="font-inter font-medium hover:text-primary transition-colors text-left pl-4" onClick={closeMobileMenu}>- Legal Tech</Link>
            <Link href="/services/ai-integration" className="font-inter font-medium hover:text-primary transition-colors text-left pl-4" onClick={closeMobileMenu}>- AI Integration</Link>
            <Link href="/services/managed-it" className="font-inter font-medium hover:text-primary transition-colors text-left pl-4" onClick={closeMobileMenu}>- Managed IT</Link>
            <Link href="/services/emergency-support" className="font-inter font-medium hover:text-primary transition-colors text-left pl-4" onClick={closeMobileMenu}>- Emergency Support</Link>
            <Link href="/services/network-security" className="font-inter font-medium hover:text-primary transition-colors text-left pl-4" onClick={closeMobileMenu}>- Network Security</Link>
            
            <button
              onClick={() => handleSectionNavigation('portfolio')}
              className="font-inter font-medium hover:text-primary transition-colors text-left"
            >
              Portfolio
            </button>
            <Link
              href="/blog"
              className="font-inter font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <Link href="/contact" className="font-inter font-medium hover:text-primary transition-colors text-left" onClick={closeMobileMenu}>
              Contact
            </Link>
            <Link
              href="/portal/dashboard"
              className="font-inter font-medium hover:text-primary transition-colors"
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