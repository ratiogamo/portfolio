import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id?: number;
  content: string;
  clientName: string;
  clientTitle: string;
  rating: number;
  imageUrl: string;
  serviceType: string;
}

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

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const getServiceColor = (serviceType: string) => {
    if (serviceType.includes('IT') || serviceType.includes('Emergency') || serviceType.includes('Managed') || serviceType.includes('Network') || serviceType.includes('Local')) {
      return 'bg-blue-500/20 text-blue-200';
    }
    return 'bg-green-500/20 text-green-200';
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <img
            src={testimonial.imageUrl}
            alt={testimonial.clientName}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="ml-4">
            <h4 className="font-bold text-white">{testimonial.clientName}</h4>
            <p className="text-sm text-gray-400">{testimonial.clientTitle}</p>
          </div>
        </div>
        <blockquote className="text-gray-300 italic border-l-4 border-primary/20 pl-4">
          "{testimonial.content}"
        </blockquote>
      </div>
      <div className="bg-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
            />
          ))}
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getServiceColor(testimonial.serviceType)}`}>
          {testimonial.serviceType}
        </span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4 text-white">Client Success Stories</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real results from businesses we've helped thrive with smarter automation and reliable IT.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="max-w-xl mx-auto p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
              <h3 className="text-2xl font-bold mb-3 text-white">Ready to be our next success story?</h3>
              <p className="text-gray-300 mb-6">
                Let's discuss how my services can be tailored to solve your specific challenges and drive growth.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3.5 rounded-full font-medium text-white bg-primary hover:bg-primary/90 transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Your Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;