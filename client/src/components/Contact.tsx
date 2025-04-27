import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters long' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: profile } = useQuery({
    queryKey: ['/api/profile'],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest('POST', '/api/contact', data);
      const result = await response.json();
      
      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully. I will get back to you soon.',
        variant: 'default',
      });
      
      // Reset form
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Project Inquiry"
                  className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register('message')}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h3 className="font-bold font-inter mb-2">Email</h3>
                  <p className="text-gray-600">contact@dorzairi.com</p>
                  <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-clock text-secondary"></i>
                </div>
                <div>
                  <h3 className="font-bold font-inter mb-2">Availability</h3>
                  <p className="text-gray-600">Monday - Friday</p>
                  <p className="text-sm text-gray-500 mt-1">9:00 AM - 6:00 PM UTC</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-video text-accent"></i>
                </div>
                <div>
                  <h3 className="font-bold font-inter mb-2">Video Call</h3>
                  <p className="text-gray-600">Schedule a meeting</p>
                  <a href="#" className="text-primary text-sm mt-1 inline-block">Book a time slot</a>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-globe text-primary"></i>
                </div>
                <div>
                  <h3 className="font-bold font-inter mb-2">Location</h3>
                  <p className="text-gray-600">{profile?.location || 'Working Remotely'}</p>
                  <p className="text-sm text-gray-500 mt-1">Available Worldwide</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-bold font-inter mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <i className="fab fa-linkedin-in text-primary"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <i className="fab fa-github text-primary"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <i className="fab fa-twitter text-primary"></i>
                </a>
                <a 
                  href={profile?.profileUrl || "https://www.upwork.com/freelancers/~01139a1ed402cf0463"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center hover:bg-secondary/20 transition-colors"
                >
                  <i className="fas fa-briefcase text-secondary"></i>
                </a>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold font-inter mb-3">Current Availability</h4>
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md flex items-center">
                  <i className="fas fa-circle text-green-500 mr-2 text-xs"></i>
                  <span>{profile?.availability || 'Available for new projects'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
