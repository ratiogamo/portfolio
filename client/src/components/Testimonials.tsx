import { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id?: number;
  content: string;
  clientName: string;
  clientTitle: string;
  rating: number;
  imageUrl: string;
  serviceType: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "James created an automation system that completely transformed our client onboarding process. What used to take us hours now happens automatically, and the quality is consistently perfect.",
      clientName: "Amanda Richards",
      clientTitle: "Operations Director, Legal Solutions Inc.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Business Automation"
    },
    {
      id: 2,
      content: "When our server crashed at 2 AM before a major case deadline, James had our systems back online within 90 minutes. His emergency IT support literally saved our case and our reputation. Outstanding 24/7 service!",
      clientName: "Maria Rodriguez",
      clientTitle: "Managing Partner, Rodriguez Law Firm, Miami",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Emergency IT Support"
    },
    {
      id: 3,
      content: "Working with James on our MyCase automation was a game-changer for our law firm. The systems he built have saved our team countless hours on administrative tasks and improved our client communication tremendously.",
      clientName: "Michael Torres",
      clientTitle: "Managing Partner, Torres Legal Group",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Business Automation"
    },
    {
      id: 4,
      content: "James transformed our IT infrastructure completely. We went from constant downtime to 99.9% uptime. His proactive monitoring caught issues before they became problems. Best IT decision we ever made.",
      clientName: "David Chen",
      clientTitle: "Practice Administrator, Coastal Medical Group, Fort Lauderdale",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Managed IT Services"
    },
    {
      id: 5,
      content: "James delivered an exceptional email automation system using n8n that has completely changed how we handle our support inbox. His knowledge of AI integration was particularly impressive and added tremendous value.",
      clientName: "Sarah Lowell",
      clientTitle: "Customer Success Manager, TechFlow",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Business Automation"
    },
    {
      id: 6,
      content: "After a cybersecurity scare, James implemented comprehensive network security that gives us complete peace of mind. His expertise in both IT security and business automation is unmatched in South Florida.",
      clientName: "Jennifer Martinez",
      clientTitle: "CPA & Owner, Miami Beach Accounting, Miami Beach",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Network Security & Automation"
    },
    {
      id: 7,
      content: "Having local IT support that understands our business has been game-changing. James is always available when we need him, and his response times are incredible. Highly recommend for any South Florida business.",
      clientName: "Robert Thompson",
      clientTitle: "Operations Manager, Thompson Construction, Broward County",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      serviceType: "Local IT Support"
    }
  ];
  
  // Calculate the number of visible slides based on viewport width
  const calculateSlidesPerView = () => {
    if (window.innerWidth >= 1024) return 3; // Desktop
    if (window.innerWidth >= 768) return 2; // Tablet
    return 1; // Mobile
  };

  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView());

  // Update slides per view when window resizes
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView());
      updateSliderPosition(currentIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const updateSliderPosition = (index: number) => {
    if (trackRef.current) {
      // Calculate slide percentage based on slidesPerView
      let slidePercentage = -100 * index;
      if (slidesPerView === 2) {
        slidePercentage = -50 * index;
      } else if (slidesPerView === 3) {
        slidePercentage = -33.333 * index;
      }
      
      trackRef.current.style.transform = `translateX(${slidePercentage}%)`;
    }
  };

  const nextSlide = () => {
    const newIndex = Math.min(testimonials.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    updateSliderPosition(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    updateSliderPosition(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    updateSliderPosition(index);
  };

  // Update slider position when currentIndex changes
  useEffect(() => {
    updateSliderPosition(currentIndex);
  }, [currentIndex, slidesPerView]);

  return (
    <section id="testimonials" className="section-blur py-16 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-20"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4 inline-block relative">
            <span className="text-gradient animate-gradient">Client Success Stories</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            See how my automation and IT services have transformed South Florida businesses by boosting efficiency, security, and reliability.
          </p>
        </div>
        
        <div className="relative testimonial-slider" ref={containerRef}>
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-10 bg-white/80 backdrop-blur-sm text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border border-primary/10 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-10 bg-white/80 backdrop-blur-sm text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border border-primary/10 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          {/* Testimonials Container */}
          <div className="testimonials-container overflow-hidden">
            <div 
              className="testimonials-track flex transition-transform duration-500 ease-out" 
              ref={trackRef}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id || index} 
                  className={`testimonial-slide px-4 ${
                    slidesPerView === 1 ? 'min-w-full' : 
                    slidesPerView === 2 ? 'min-w-[50%]' : 
                    'min-w-[33.333%]'
                  }`}
                >
                  <div className="glass-card rounded-xl p-6 border border-primary/10 h-full hover-scale shadow-lg relative overflow-hidden">
                    {/* Service type badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border ${
                        testimonial.serviceType.includes('IT') || testimonial.serviceType.includes('Emergency') || testimonial.serviceType.includes('Managed') || testimonial.serviceType.includes('Network') || testimonial.serviceType.includes('Local')
                          ? 'bg-blue-100/80 text-blue-700 border-blue-200/50'
                          : 'bg-green-100/80 text-green-700 border-green-200/50'
                      }`}>
                        {testimonial.serviceType}
                      </span>
                    </div>
                    
                    {/* Tech orb decorations */}
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary/40 backdrop-blur-sm animate-pulse"></div>
                    <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-secondary/40 backdrop-blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    
                    <div className="relative">
                      <svg className="w-10 h-10 text-primary/20 absolute -top-2 -left-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      
                      <div className="bg-gradient-to-r from-primary/5 to-transparent p-5 rounded-lg ml-4 mb-4">
                        <p className="text-gray-700 relative z-10">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-8">
                      <div className="relative mr-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm animate-pulse-glow"></div>
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.clientName}
                          className="w-12 h-12 rounded-full object-cover relative z-10 border-2 border-white"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{testimonial.clientName}</h4>
                        <p className="text-sm text-gray-500">{testimonial.clientTitle}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicators */}
          <div className="flex justify-center mt-10 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-primary to-secondary w-8 animate-pulse-glow' 
                    : 'bg-gray-300 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* CTA below testimonials */}
        <div className="mt-16 text-center">
          <div className="max-w-xl mx-auto p-6 rounded-xl glass-card border border-primary/10 shadow-lg shadow-primary/5">
            <h3 className="text-2xl font-bold mb-3">Ready to transform your business?</h3>
            <p className="text-gray-600 mb-6">
              Need emergency IT support, managed services, or custom automation? Let's discuss how I can help your South Florida business thrive.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3.5 rounded-full font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center">
                <span>Get Your Free Consultation</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;