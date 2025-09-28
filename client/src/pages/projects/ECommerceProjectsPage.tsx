import React from 'react';
import { Button } from '../../components/ui/button';
import { getProjectsByCategory } from '../../lib/projectUtils';
import ProjectCard from '../../components/ProjectCard';

const ECommerceProjectsPage: React.FC = () => {
  const projects = getProjectsByCategory('E-commerce');

  return (
    <div className="py-16 space-y-16">
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-shopping-cart text-4xl text-green-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">E-commerce Projects</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Scalable marketplaces and online stores designed for growth and performance.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Ready to Build Your Online Store?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's create a powerful e-commerce platform that drives sales and provides a seamless customer experience.
          </p>
          <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
            Book a Strategy Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ECommerceProjectsPage;