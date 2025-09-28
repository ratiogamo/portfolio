import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../hooks/use-toast';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  serviceType: z.enum(['automation', 'it-support', 'emergency-it', 'consultation'], {
    required_error: 'Please select a service type',
  }),
  urgencyLevel: z.enum(['emergency', 'urgent', 'standard'], {
    required_error: 'Please select an urgency level',
  }),
  location: z.string().optional(),
  preferredContact: z.enum(['phone', 'email', 'onsite'], {
    required_error: 'Please select a preferred contact method',
  }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters long' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const body = new URLSearchParams({
        'form-name': 'contact',
        ...data,
      }).toString();

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

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
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4 text-white">Get In Touch</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Need automation solutions or IT support? I provide comprehensive services from custom automation development to 24/7 emergency IT support across South Florida.
            </p>
            
            <div className="mt-8 bg-red-900/30 border-2 border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-phone text-white text-sm"></i>
                </div>
                <h3 className="text-lg font-bold text-red-200">Emergency IT Support</h3>
              </div>
              <p className="text-red-200 font-semibold text-xl mb-2">(305) 555-HELP</p>
              <p className="text-red-300 text-sm mb-3">24/7 Emergency Response • &lt; 2 Hour Response Time</p>
              <a
                href="tel:+13055554357"
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <i className="fas fa-phone mr-2"></i>Call Now
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)} name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 bg-black/20 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 bg-black/20 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="(305) 555-0123"
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500"
                    {...register('phone')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="serviceType" className="block text-gray-300 font-medium mb-2">Service Type</label>
                    <select
                      id="serviceType"
                      className={`w-full px-4 py-3 bg-black/20 border ${errors.serviceType ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                      {...register('serviceType')}
                    >
                      <option value="">Select Service Type</option>
                      <option value="automation">Automation Development</option>
                      <option value="it-support">IT Support</option>
                      <option value="emergency-it">Emergency IT Support</option>
                      <option value="consultation">Free Consultation</option>
                    </select>
                    {errors.serviceType && (
                      <p className="mt-1 text-red-400 text-sm">{errors.serviceType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="urgencyLevel" className="block text-gray-300 font-medium mb-2">Urgency Level</label>
                    <select
                      id="urgencyLevel"
                      className={`w-full px-4 py-3 bg-black/20 border ${errors.urgencyLevel ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                      {...register('urgencyLevel')}
                    >
                      <option value="">Select Urgency</option>
                      <option value="emergency">🚨 Emergency (under 2 hours)</option>
                      <option value="urgent">⚡ Urgent (Same day)</option>
                      <option value="standard">📅 Standard (24-48 hours)</option>
                    </select>
                    {errors.urgencyLevel && (
                      <p className="mt-1 text-red-400 text-sm">{errors.urgencyLevel.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="location" className="block text-gray-300 font-medium mb-2">Location (Optional)</label>
                    <select
                      id="location"
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      {...register('location')}
                    >
                      <option value="">Select County</option>
                      <option value="miami-dade">Miami-Dade County</option>
                      <option value="broward">Broward County</option>
                      <option value="palm-beach">Palm Beach County</option>
                      <option value="other">Other/Remote</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredContact" className="block text-gray-300 font-medium mb-2">Preferred Contact</label>
                    <select
                      id="preferredContact"
                      className={`w-full px-4 py-3 bg-black/20 border ${errors.preferredContact ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white`}
                      {...register('preferredContact')}
                    >
                      <option value="">Select Method</option>
                      <option value="email">📧 Email</option>
                      <option value="phone">📞 Phone Call</option>
                      <option value="onsite">🏢 On-site Visit</option>
                    </select>
                    {errors.preferredContact && (
                      <p className="mt-1 text-red-400 text-sm">{errors.preferredContact.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-300 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Brief description of your needs"
                    className={`w-full px-4 py-3 bg-black/20 border ${errors.subject ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-400 text-sm">{errors.subject.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 bg-black/20 border ${errors.message ? 'border-red-500' : 'border-white/20'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500`}
                    {...register('message')}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-sm">{errors.message.message}</p>
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

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg flex items-start">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-bold font-inter mb-2 text-red-200">Emergency IT Hotline</h3>
                    <p className="text-red-200 font-semibold">(305) 555-HELP</p>
                    <div className="flex items-center mt-1">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      <p className="text-sm text-red-300">24/7 Available • Under 2 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <h3 className="font-bold font-inter mb-2 text-white">Email</h3>
                    <p className="text-gray-300">hello@jamesdev.pro</p>
                    <p className="text-sm text-gray-400 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg flex items-start">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-clock text-secondary"></i>
                  </div>
                  <div>
                    <h3 className="font-bold font-inter mb-2 text-white">Business Hours</h3>
                    <p className="text-gray-300">Monday - Friday</p>
                    <p className="text-sm text-gray-400 mt-1">9:00 AM - 6:00 PM EST</p>
                    <div className="mt-2">
                      <span className="inline-block bg-green-500/20 text-green-200 text-xs px-2 py-1 rounded">
                        24/7 Emergency IT
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-lg flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-video text-accent"></i>
                  </div>
                  <div>
                    <h3 className="font-bold font-inter mb-2 text-white">Video Call</h3>
                    <p className="text-gray-300">Free consultation</p>
                    <a href="#" className="text-primary text-sm mt-1 inline-block">Book a time slot</a>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/30 border-2 border-blue-500/50 p-6 rounded-lg mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold font-inter mb-3 text-blue-200">South Florida Service Area</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/20 p-3 rounded border border-white/10">
                        <h4 className="font-semibold text-blue-300">Miami-Dade County</h4>
                        <p className="text-sm text-gray-300">On-site & Remote Support</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded border border-white/10">
                        <h4 className="font-semibold text-blue-300">Broward County</h4>
                        <p className="text-sm text-gray-300">On-site & Remote Support</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded border border-white/10">
                        <h4 className="font-semibold text-blue-300">Palm Beach County</h4>
                        <p className="text-sm text-gray-300">On-site & Remote Support</p>
                      </div>
                    </div>
                    <p className="text-sm text-blue-300 mt-3">
                      <i className="fas fa-globe mr-1"></i>
                      Remote automation services available worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="font-bold font-inter mb-4 text-white">Connect With Me</h3>
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
                    href="https://www.upwork.com/freelancers/~01139a1ed402cf0463"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center hover:bg-secondary/20 transition-colors"
                  >
                    <i className="fas fa-briefcase text-secondary"></i>
                  </a>
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