import Galaxy from "./backgrounds/Galaxy";
import { FiCode } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-full">
        <Galaxy
          density={0.3}
          glowIntensity={0.1}
          starSpeed={0.2}
          saturation={0}
          rotationSpeed={0.05}
        />
      </div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <FiCode className="text-white text-2xl" />
            <span className="text-white font-semibold text-lg">React Bits</span>
          </div>
          <nav className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Docs</a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <button className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm text-white mb-8">
            <span className="mr-2">☄️</span> New Background
          </button>

          <h1 className="text-5xl md:text-7xl font-bold font-inter leading-tight mb-8 text-white">
            Components you shall have, <br /> young padawan.
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-gray-200"
            >
              Get Started
            </a>
            <a
              href="#"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition-all duration-300 hover:bg-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
