// API route for testimonials
export default function handler(req, res) {
  const testimonials = [
    {
      id: 1,
      content: "James created an automation system that completely transformed our client onboarding process. What used to take us hours now happens automatically, and the quality is consistently perfect.",
      clientName: "Amanda Richards",
      clientTitle: "Operations Director, Legal Solutions Inc.",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 2,
      content: "Working with James on our MyCase automation was a game-changer for our law firm. The systems he built have saved our team countless hours on administrative tasks and improved our client communication tremendously.",
      clientName: "Michael Torres",
      clientTitle: "Managing Partner, Torres Legal Group",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      id: 3,
      content: "James delivered an exceptional email automation system using n8n that has completely changed how we handle our support inbox. His knowledge of AI integration was particularly impressive and added tremendous value.",
      clientName: "Sarah Lowell",
      clientTitle: "Customer Success Manager, TechFlow",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];
  
  res.status(200).json(testimonials);
}