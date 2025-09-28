import React from 'react';

const AutomationCube: React.FC = () => {
  return (
    <section className="py-8"> {/* Changed py-16 to py-8 */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="glass-card p-6 rounded-2xl">
            <img
              src="/automation-cube.png"
              alt="Automation Cube with Robotic Hand"
              className="w-full max-w-md h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationCube;