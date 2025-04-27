import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['/api/testimonials'],
  });

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

  // Fallback testimonials if none are returned from API
  const fallbackTestimonials = [
    {
      id: 1,
      content: "Dor is an exceptional developer who delivered our e-commerce platform ahead of schedule. His attention to detail and proactive communication made the entire process smooth and worry-free.",
      clientName: "Michael Johnson",
      clientTitle: "CEO, TechRetail",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 2,
      content: "We hired Dor to build our company's API infrastructure and he delivered beyond our expectations. His knowledge of backend systems and ability to solve complex problems was impressive.",
      clientName: "Sarah Williams",
      clientTitle: "CTO, DataSync",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 3,
      content: "Working with Dor was a game-changer for our startup. He quickly understood our needs and built a scalable web application that has been crucial for our growth. Highly recommended!",
      clientName: "David Chen",
      clientTitle: "Founder, InnovateLab",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  // Use fetched testimonials or fallback if empty
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

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
    const newIndex = Math.min(displayTestimonials.length - 1, currentIndex + 1);
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

  if (isLoading) {
    return (
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-24 bg-gray-300 rounded mb-4"></div>
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="h-5 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-blur py-16 bg-gradient-to-b from-blue-50/30 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-20"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4 inline-block relative">
            <span className="text-gradient animate-gradient">Client Testimonials</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            See what my clients have to say about the automation systems I've built and how they've transformed their businesses.
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
              {displayTestimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id || index} 
                  className={`testimonial-slide px-4 ${
                    slidesPerView === 1 ? 'min-w-full' : 
                    slidesPerView === 2 ? 'min-w-[50%]' : 
                    'min-w-[33.333%]'
                  }`}
                >
                  <div className="glass-card rounded-xl p-6 border border-primary/10 h-full hover-scale shadow-lg relative overflow-hidden">
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
            {displayTestimonials.map((_, index) => (
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
            <h3 className="text-2xl font-bold mb-3">Ready to automate your business?</h3>
            <p className="text-gray-600 mb-6">
              Let's discuss how we can save your team thousands of hours with custom automation solutions.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-3.5 rounded-full font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center">
                <span>Schedule a Consultation</span>
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
