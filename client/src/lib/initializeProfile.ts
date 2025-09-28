import { apiRequest } from './queryClient';

/**
 * Initialize the profile data with James' Upwork profile information
 * This function directly passes the profile data without scraping
 */
export async function initializeProfile() {
  try {
    // Direct API call with James' profile data
    const response = await apiRequest('POST', '/api/initialize-profile', {
      name: 'James D',
      title: 'AI Developer | Business Automation | Make, Zapier, N8N | MyCase, Clio',
      description: 'I build automated systems that save businesses thousands of hours annually and streamline complex workflows using leading no-code tools and AI.',
      hourlyRate: '$59.25/hr',
      totalEarnings: '50+ Projects Completed',
      jobSuccessScore: 'Top-Rated Plus',
      totalJobs: 50,
      totalHours: 12000,
      profileUrl: 'https://www.upwork.com/freelancers/~01139a1ed402cf0463',
      responseTime: 'Quick',
      availability: 'More than 30 hrs/week',
      location: 'Miami, United States',
    });
    
    return response;
  } catch (error) {
    console.error('Failed to initialize profile data:', error);
    throw error;
  }
}