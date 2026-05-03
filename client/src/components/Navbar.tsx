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
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" aria-label="JamesDevPro Home">
            <img src="/logo.png" alt="JamesDevPro Logo" className="h-20 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-7 text-gray-300">

          {/* The Firm dropdown */}
          <div className="group relative">
            <button className="font-inter font-medium hover:text-white transition-colors flex items-center gap-1">
              The Firm <i className="fas fa-chevron-down text-xs" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-2 bg-black/70 backdrop-blur-xl border border-white/15 shadow-xl rounded-xl pt-3 pb-2 w-56">
              <p className="px-4 pb-1.5 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Why JamesDev?</p>
              <Link href="/about" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Who I Am</Link>
              <Link href="/manifesto" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">The Manifesto</Link>
              <Link href="/promise" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">The 5-Pillar Promise</Link>
              <Link href="/ideal-client" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Is This Right For You?</Link>
              <div className="border-t border-white/10 my-1" />
              <Link href="/directory" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">Corporate Directory</Link>
            </div>
          </div>

          {/* Services dropdown */}
          <div className="group relative">
            <button className="font-inter font-medium hover:text-white transition-colors flex items-center gap-1">
              Services <i className="fas fa-chevron-down text-xs" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-2 bg-black/70 backdrop-blur-xl border border-white/15 shadow-xl rounded-xl pt-3 pb-2 w-60">
              <p className="px-4 pb-1.5 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Core Services</p>
              <Link href="/services/emergency-rescue" className="block px-4 py-2 text-sm text-red-300 hover:bg-white/10 hover:text-white font-semibold">🚨 Emergency Workflow Rescue</Link>
              <Link href="/services/agentic-architecture" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Agentic Architecture</Link>
              <Link href="/services/private-llm" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Private LLM Infrastructure</Link>
              <div className="border-t border-white/10 my-1" />
              <p className="px-4 pb-1.5 text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Extended Services</p>
              <Link href="/services/business-automation" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Business Automation</Link>
              <Link href="/services/legal-tech" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Legal Firm Automation</Link>
              <Link href="/services/ai-integration" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">AI Integration</Link>
            </div>
          </div>

          {/* Resources dropdown */}
          <div className="group relative">
            <button className="font-inter font-medium hover:text-white transition-colors flex items-center gap-1">
              Resources <i className="fas fa-chevron-down text-xs" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-2 bg-black/70 backdrop-blur-xl border border-white/15 shadow-xl rounded-xl pt-3 pb-2 w-52">
              <Link href="/blog" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">The Automation Playbook</Link>
              <Link href="/projects/case-studies" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Case Studies</Link>
              <Link href="/contact" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Contact Us</Link>
            </div>
          </div>

          <Link href="/pricing" className="font-inter font-medium text-primary hover:text-white transition-colors">
            Pricing
          </Link>

          <button
            data-cal-link="ratio/30min"
            data-cal-config='{"layout":"month_view"}'
            className="bg-primary text-white px-5 py-2 rounded-full font-inter font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
          >
            Book Free Call
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-2xl focus:outline-none text-white"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/60 backdrop-blur-xl border-t border-white/15">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-1 text-gray-300">

            <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold px-2 pt-2 pb-1">The Firm</p>
            <Link href="/about" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Who I Am</Link>
            <Link href="/manifesto" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>The Manifesto</Link>
            <Link href="/promise" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>The 5-Pillar Promise</Link>
            <Link href="/ideal-client" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Is This Right For You?</Link>
            <Link href="/directory" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Corporate Directory</Link>

            <div className="border-t border-white/10 my-2" />

            <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold px-2 py-1">Services</p>
            <Link href="/services/emergency-rescue" className="px-3 py-2 rounded-lg font-semibold text-red-300 hover:bg-white/10 hover:text-red-200 transition-colors" onClick={closeMobileMenu}>🚨 Emergency Workflow Rescue</Link>
            <Link href="/services/agentic-architecture" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Agentic Architecture</Link>
            <Link href="/services/private-llm" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Private LLM Infrastructure</Link>
            <Link href="/services/business-automation" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Business Automation</Link>
            <Link href="/services/legal-tech" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Legal Firm Automation</Link>
            <Link href="/services/ai-integration" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>AI Integration</Link>

            <div className="border-t border-white/10 my-2" />

            <p className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold px-2 py-1">Resources</p>
            <Link href="/blog" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>The Automation Playbook</Link>
            <Link href="/projects/case-studies" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Case Studies</Link>
            <Link href="/pricing" className="px-3 py-2 rounded-lg font-medium text-primary hover:bg-white/10 transition-colors" onClick={closeMobileMenu}>Pricing</Link>
            <Link href="/contact" className="px-3 py-2 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-colors" onClick={closeMobileMenu}>Contact</Link>

            <div className="pt-2">
              <button
                data-cal-link="ratio/30min"
                data-cal-config='{"layout":"month_view"}'
                className="w-full bg-primary text-white px-5 py-3 rounded-full font-inter font-semibold hover:bg-primary/90 transition-all duration-300 text-center"
              >
                Book Free Strategy Call
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;