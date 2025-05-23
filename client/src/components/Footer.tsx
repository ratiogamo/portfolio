import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

const Footer = () => {
  const { data: profile } = useQuery({
    queryKey: ['/api/profile'],
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">Dor Zairi</h3>
            <p className="text-gray-400 mb-4">
              Full Stack Developer specializing in creating robust, scalable web applications and APIs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">E-commerce Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Applications</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cloud Architecture</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-inter mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Me</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
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
                <a href="mailto:contact@dorzairi.com" className="text-gray-400 hover:text-white transition-colors">contact@dorzairi.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock text-secondary mr-2"></i>
                <span className="text-gray-400">Mon-Fri: 9AM-6PM UTC</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span className="text-gray-400">{profile?.availability || 'Available for new projects'}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Dor Zairi. All rights reserved.
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
