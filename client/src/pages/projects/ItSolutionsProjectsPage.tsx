import React from 'react';
import { Button } from '../../components/ui/button';
import { getAllProjects, type Project } from '../../lib/projectUtils';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:-translate-y-1 flex flex-col">
    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <span className="text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded self-start mb-3">{project.category}</span>
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

const CaseStudiesPage: React.FC = () => {
  const projects = getAllProjects();
  return (
    <div className="py-16 space-y-16">
      <section className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 text-center">
          <i className="fas fa-rocket text-4xl text-accent mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4 text-white">Automation Case Studies</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Real-world examples of how I've rescued broken workflows, deployed agentic systems, and automated operations for businesses across industries.
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
          <h2 className="text-3xl font-bold font-inter mb-4 text-white">Ready to Automate?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let's build automation systems that save your team hours every week and eliminate costly manual errors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://buy.stripe.com/8x25kD6AB0AD7N06226oo0t" target="_blank" rel="noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white">
                💳 $200 Emergency Audit
              </Button>
            </a>
            <Button size="lg" data-cal-link="ratio/30min" data-cal-config='{"layout":"month_view"}'>
              Book a Strategy Session
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;