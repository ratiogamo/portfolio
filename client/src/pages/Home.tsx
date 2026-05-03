import { useEffect } from 'react';
import Hero from '../components/Hero';
import SocialProofStrip from '../components/SocialProofStrip';
import Services from '../components/Services';
import IndustriesSection from '../components/IndustriesSection';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import AboutSummary from '../components/AboutSummary';
import Technologies from '../components/Technologies';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="/#"]');

      if (anchor) {
        e.preventDefault();

        const targetId = anchor.getAttribute('href')?.substring(2);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div>
      {/* 1. Lead with transformation */}
      <Hero />
      {/* 2. Social proof metrics */}
      <SocialProofStrip />
      {/* 3. What we do */}
      <Services />
      {/* 4. Who it's for — industry verticals */}
      <IndustriesSection />
      {/* 5. Tools & stack */}
      <Technologies />
      {/* 6. Proof — case studies */}
      <Portfolio />
      {/* 7. Testimonials */}
      <Testimonials />
      {/* 8. About */}
      <AboutSummary />
      {/* 9. Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default Home;