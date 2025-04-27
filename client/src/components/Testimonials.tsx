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
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Client Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's what some of my clients have to say about working with me and the results I've delivered.
          </p>
        </div>
        
        <div className="relative testimonial-slider" ref={containerRef}>
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Testimonials Container */}
          <div className="testimonials-container overflow-hidden">
            <div 
              className="testimonials-track flex transition-transform duration-300" 
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
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
                    <div className="flex items-start mb-4">
                      <div className="text-primary text-4xl mr-4">
                        <i className="fas fa-quote-left"></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-6">
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.clientName}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.clientName}</h4>
                        <p className="text-sm text-gray-500">{testimonial.clientTitle}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
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
          <div className="flex justify-center mt-8 gap-2">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
