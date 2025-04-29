# Portfolio Website

A full-stack portfolio website for showcasing professional work, skills, and services. This application is built with React, Express, and is configured for deployment on Vercel.

## Features

- Responsive portfolio website
- API endpoints for profile, skills, projects, and testimonials
- Contact form for client inquiries
- Serverless functions for Vercel deployment

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Deployment**: Vercel

## Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Building for Production

To build the application for production:

```
npm run build
```

This will:
- Build the React frontend with Vite
- Build the Express backend with esbuild

## Vercel Deployment

This project is configured for deployment on Vercel with serverless functions.

### Deployment Steps

1. Push your code to GitHub:
   ```
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. Import your project in Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "Add New..." > "Project"
   - Select your GitHub repository
   - Vercel should automatically detect the project settings

3. Configure environment variables (if needed):
   - Add any required environment variables in the Vercel project settings

4. Deploy:
   - Click "Deploy"
   - Vercel will build and deploy your application

### Vercel Configuration

The project includes the following files for Vercel deployment:

- `vercel.json`: Configures how Vercel should build and serve the application
- `api/*.js`: Serverless API functions for Vercel
- `api/index.html`: Simple API status page

## API Endpoints

- `GET /api/test`: Test endpoint to verify API functionality
- `GET /api/profile`: Get portfolio profile information
- `GET /api/skills`: Get skills information (optional query param: `category`)
- `GET /api/projects`: Get portfolio projects (optional query param: `category`)
- `GET /api/testimonials`: Get client testimonials
- `POST /api/contact`: Submit contact form

## Troubleshooting

If you encounter issues with the deployment:

1. Check build logs in the Vercel dashboard
2. Verify that all required environment variables are set
3. Test the production build locally before deploying:
   ```
   npm run build
   NODE_ENV=production node dist/index.js
   ```

## License

MIT