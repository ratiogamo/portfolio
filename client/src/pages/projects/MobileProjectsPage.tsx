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
          <span key={tech} className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const MobileProjectsPage: React.FC = () => {
  const projects = getProjectsByCategory('Mobile');
  return (
    <div className="py-16 space-y-16">
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-mobile-alt text-4xl text-purple-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Mobile App Projects</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cross-platform applications for iOS and Android that deliver engaging user experiences.
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
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Have an App Idea?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's turn your vision into a reality with a high-performance mobile application.
          </p>
          <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
            Book a Strategy Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MobileProjectsPage;