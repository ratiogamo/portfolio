import React from 'react';
import { Button } from '../../components/ui/button';
import { getProjectsByCategory } from '../../lib/projectUtils';
import ProjectCard from '../../components/ProjectCard';

const MobileProjectsPage: React.FC = () => {
  const projects = getProjectsByCategory('Mobile');

  return (
    <div className="bg-white">
      <section className="bg-purple-500/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <i className="fas fa-mobile-alt text-4xl text-purple-500 mb-4"></i>
          <h1 className="text-4xl font-bold font-inter mb-4">Mobile App Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cross-platform applications for iOS and Android that deliver engaging user experiences.
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
          <h2 className="text-3xl font-bold font-inter mb-4">Have an App Idea?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let's turn your vision into a reality with a high-performance mobile application.
          </p>
          <Button size="lg" data-cal-link="ratio/30min">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MobileProjectsPage;