import { Link } from 'wouter';
import { Button } from './ui/button';

const AboutSummary = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <img
                src="/james-profile.jpg"
                alt="James - Automation Expert & IT Solutions Provider"
                className="w-full h-full object-cover object-top rounded-2xl shadow-2xl border-4 border-white"
              />
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl -z-10 blur-sm"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold font-inter mb-6 relative">
              <span className="inline-block pb-2 relative">
                Expertise in Automation & IT
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary"></span>
              </span>
            </h2>
            <p className="text-gray-600 mb-4">
              With over 7 years of experience, I specialize in transforming business operations through smart automation and robust IT infrastructure. My focus is on delivering tangible results—saving you time and money while enhancing security and efficiency.
            </p>
            <p className="text-gray-600 mb-6">
              I provide comprehensive managed services, network infrastructure management, and cybersecurity solutions with 24/7 emergency response capabilities, primarily serving businesses across South Florida.
            </p>
            <Link href="/about">
              <Button variant="outline">
                More About My Experience →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;