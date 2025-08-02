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
          <a href="#about" className="font-inter font-medium hover:text-primary transition-colors">
            About
          </a>
          <a href="#services" className="font-inter font-medium hover:text-primary transition-colors">
            Services
          </a>
          <a href="#portfolio" className="font-inter font-medium hover:text-primary transition-colors">
            Portfolio
          </a>
          <Link href="/blog" className="font-inter font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <a href="#testimonials" className="font-inter font-medium hover:text-primary transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors">
            Contact Me
          </a>
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
            <a
              href="#about"
              className="font-inter font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a
              href="#services"
              className="font-inter font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="font-inter font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Portfolio
            </a>
            <Link
              href="/blog"
              className="font-inter font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
            <a
              href="#testimonials"
              className="font-inter font-medium hover:text-primary transition-colors"
              onClick={closeMobileMenu}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="bg-accent text-white px-5 py-2 rounded-md font-inter font-medium hover:bg-opacity-90 transition-colors text-center"
              onClick={closeMobileMenu}
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
