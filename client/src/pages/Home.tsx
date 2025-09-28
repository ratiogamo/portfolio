import { useEffect } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Contact from '../components/Contact';

const Home = () => {
  // Pre-fetch all data when the home page loads
  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId!);
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
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Skills />
      <Portfolio />
      <Testimonials />
      <CallToAction />
      <Contact />
    </>
  );
};

export default Home;