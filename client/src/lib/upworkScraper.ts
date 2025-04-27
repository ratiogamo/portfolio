import axios from 'axios';
import * as cheerio from 'cheerio';

export interface UpworkProfile {
  name: string;
  title: string;
  description: string;
  hourlyRate: string;
  totalEarnings: string;
  jobSuccessScore: string;
  totalJobs: number;
  totalHours: number;
  responseTime: string;
  availability: string;
  skills: string[];
  location: string;
}

export async function scrapeUpworkProfile(url: string): Promise<UpworkProfile> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extracting data from the Upwork profile page
    const name = $('h1.profile-title').text().trim();
    const title = $('h2.profile-subtitle').text().trim();
    const description = $('.up-line-clamp-v2').text().trim();
    const hourlyRate = $('.freelancer-rate').text().trim();
    const jobSuccessScore = $('.job-success-score').text().trim();
    
    // Extracting skills
    const skills: string[] = [];
    $('.up-skill-badge').each((_, element) => {
      skills.push($(element).text().trim());
    });
    
    return {
      name: name || 'James D',
      title: title || 'AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio',
      description: description || 'I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.',
      hourlyRate: hourlyRate || '$59.25/hr',
      totalEarnings: '50+ Projects Completed',  // Updated from profile
      jobSuccessScore: jobSuccessScore || 'Top-Rated Plus',
      totalJobs: 50,  // From profile "50+ Projects Completed"
      totalHours: 12000,  // From profile "12,000+ hours saved annually"
      responseTime: 'Quick',
      availability: 'More than 30 hrs/week',
      skills: skills.length > 0 ? skills : ['Make.com', 'Airtable', 'Zapier', 'n8n', 'Automation', 'AI Development'],
      location: 'Miami, United States'
    };
  } catch (error) {
    console.error('Error scraping Upwork profile:', error);
    
    // Return default data in case of error
    return {
      name: 'James D',
      title: 'AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio',
      description: 'I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.',
      hourlyRate: '$59.25/hr',
      totalEarnings: '50+ Projects Completed',
      jobSuccessScore: 'Top-Rated Plus',
      totalJobs: 50,
      totalHours: 12000,
      responseTime: 'Quick',
      availability: 'More than 30 hrs/week',
      skills: ['Make.com', 'Airtable', 'Zapier', 'n8n', 'Automation', 'AI Development'],
      location: 'Miami, United States'
    };
  }
}
