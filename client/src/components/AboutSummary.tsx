import { Link } from 'wouter';
import { Button } from './ui/button';

const AboutSummary = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <img
                  src="/james-profile.png"
                  alt="James — AI Automation Architect"
                  className="w-full h-full object-cover object-top rounded-2xl shadow-2xl border-4 border-white/10 -scale-x-100"
                />
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl -z-10 blur-sm"></div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-inter mb-6 relative text-white">
                <span className="inline-block pb-2 relative">
                  AI Automation Architect
                  <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary"></span>
                </span>
              </h2>
              <p className="text-gray-300 mb-4">
                50+ automation projects delivered. 12,000+ hours saved annually for clients. I rescue broken workflows, deploy agentic AI systems, and build private LLM infrastructure for businesses that need AI without data leakage.
              </p>
              <p className="text-gray-300 mb-6">
                Deep specialization in legal firm automation (MyCase, Clio) and emergency workflow recovery. Based in Broward County, FL — available worldwide.
              </p>
              <Link href="/about">
                <Button variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
                  More About My Expertise →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;