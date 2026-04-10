import React from 'react';
import { Button } from '../../components/ui/button';
import { getProjectsByCategory, type Project } from '../../lib/projectUtils';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:-translate-y-1 flex flex-col">
    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-white font-inter mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const WebAppsProjectsPage: React.FC = () => {
  const projects = getProjectsByCategory('Web Apps');
  return (
    <div className="py-16 space-y-16">
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-laptop-code text-4xl text-primary mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Web Apps Projects</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Custom web applications designed to solve complex business problems and enhance user engagement.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Have a Project in Mind?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's discuss how I can build a custom web application to meet your specific needs.
          </p>
          <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
            Book a Strategy Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WebAppsProjectsPage;