import React from 'react';

const LargeFavicon: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <img
            src="/favicon.png"
            alt="JamesDevPro Favicon"
            className="w-48 h-48 object-contain rounded-full shadow-2xl border-4 border-primary/20 animate-pulse-glow"
          />
        </div>
      </div>
    </section>
  );
};

export default LargeFavicon;