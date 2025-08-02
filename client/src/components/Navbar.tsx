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
          <button
            onClick={() => handleSectionNavigation('about')}
            className="font-inter font-medium hover:text-primary transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleSectionNavigation('services')}
            className="font-inter font-medium hover:text-primary transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => handleSectionNavigation('portfolio')}
            className="font-inter font-medium hover:text-primary transition-colors"
          >
            Portfolio
          </button>
          <Link href="/blog" className="font-inter font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <button
            onClick={() => handleSectionNavigation('testimonials')}
            className="font-inter font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </button>
          <button
            onClick={() => handleSectionNavigation('contact')}
            className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors"
          >
            Contact Me
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
            <button
              onClick={() => handleSectionNavigation('about')}
              className="font-inter font-medium hover:text-primary transition-colors text-left"
            >
              About
            </button>
            <button
              onClick={() => handleSectionNavigation('services')}
              className="font-inter font-medium hover:text-primary transition-colors text-left"
            >
              Services
            </button>
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
            <button
              onClick={() => handleSectionNavigation('testimonials')}
              className="font-inter font-medium hover:text-primary transition-colors text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => handleSectionNavigation('contact')}
              className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors text-center"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
