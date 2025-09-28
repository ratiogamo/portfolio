import { useQuery } from '@tanstack/react-query';
import { Profile } from './Hero';
import { Link, useLocation } from 'wouter';

const Footer = () => {
  const { data: profile } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });
  const [location] = useLocation();
  const currentYear = new Date().getFullYear();

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
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">James Devante</h3>
            <p className="text-gray-400 mb-4">
              AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/jamesdevante" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/jamesdevante" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/james.devante" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">Services</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleSectionNavigation('services')} className="text-gray-400 hover:text-white transition-colors text-left">Business Automation</button></li>
              <li><button onClick={() => handleSectionNavigation('services')} className="text-gray-400 hover:text-white transition-colors text-left">Legal Tech Solutions</button></li>
              <li><button onClick={() => handleSectionNavigation('services')} className="text-gray-400 hover:text-white transition-colors text-left">AI Integration</button></li>
              <li><button onClick={() => handleSectionNavigation('services')} className="text-gray-400 hover:text-white transition-colors text-left">Managed IT Services</button></li>
              <li><button onClick={() => handleSectionNavigation('services')} className="text-gray-400 hover:text-white transition-colors text-left">Network Security</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleSectionNavigation('about')} className="text-gray-400 hover:text-white transition-colors text-left">About Me</button></li>
              <li><button onClick={() => handleSectionNavigation('portfolio')} className="text-gray-400 hover:text-white transition-colors text-left">Portfolio</button></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><button onClick={() => handleSectionNavigation('testimonials')} className="text-gray-400 hover:text-white transition-colors text-left">Testimonials</button></li>
              <li><button onClick={() => handleSectionNavigation('contact')} className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
              <li>
                <a
                  href={profile?.profileUrl || "https://www.upwork.com/freelancers/~01139a1ed402cf0463"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Upwork Profile
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-envelope text-primary mr-2"></i>
                <a href="mailto:hello@jamesdev.pro" className="text-gray-400 hover:text-white transition-colors">hello@jamesdev.pro</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-secondary mr-2"></i>
                <span className="text-gray-400">954-594-4040</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-accent mr-2"></i>
                <span className="text-gray-400">Broward County, FL</span>
              </li>
              <li className="flex items-center">
                <i className="fab fa-twitter text-blue-400 mr-2"></i>
                <span className="text-gray-400">@james.devante</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} James Devante. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm mr-4 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
