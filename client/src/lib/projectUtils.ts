import projectsData from '../data/projects.json';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  technologies: string[];
}

export const getProjectsByCategory = (category: string): Project[] => {
  return (projectsData.projects as Project[]).filter(project => project.category === category);
};

export const getAllProjects = (): Project[] => {
  return projectsData.projects as Project[];
};

export const getProjectCategories = (): string[] => {
  const categories = (projectsData.projects as Project[]).map(p => p.category);
  return ['All', ...Array.from(new Set(categories))];
}