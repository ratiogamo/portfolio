import React from 'react';
import { Button } from '../../components/ui/button';
import { getProjectsByCategory } from '../../lib/projectUtils';
import ProjectCard from '../../components/ProjectCard';

const WebAppsProjectsPage: React.FC = () => {
  const projects = getProjectsByCategory('Web Apps');

  return (
    <div className="bg-white">
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-laptop-code text-4xl text-primary mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4">Web Apps Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Custom web applications designed to solve complex business problems and enhance user engagement.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let's discuss how I can build a custom web application to meet your specific needs.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WebAppsProjectsPage;