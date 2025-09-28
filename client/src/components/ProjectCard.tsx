import React from 'react';
import { Project } from '../lib/projectUtils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="tech-card group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-secondary/40 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
          <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-white/90 text-sm mb-3">
              {project.description}
            </p>
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-inter mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary">
              {tech}
            </span>
          ))}
        </div>
        <a href="#" className="inline-flex items-center font-medium relative overflow-hidden group-hover:text-primary transition-colors duration-300">
          <span className="relative z-10">View Details</span>
          <span className="ml-2 relative z-10 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;