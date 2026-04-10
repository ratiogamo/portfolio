import React from 'react';
import { Project } from '../lib/projectUtils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col h-full"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3 w-fit">
          {project.category}
        </span>
        <h3 className="text-xl font-bold font-inter mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300">
              {tech}
            </span>
          ))}
        </div>
        <a href="#" className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors duration-300 mt-auto">
          <span>View Details</span>
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;