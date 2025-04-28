# Vercel Deployment Guide

This guide explains how to deploy this full-stack portfolio application to Vercel.

## Configuration

The project has been configured for Vercel deployment with the following files:

1. **vercel.json** - Configures how Vercel should build and serve the application
2. **server/index.ts** - Updated to use the PORT environment variable for Vercel compatibility

## How the Configuration Works

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node",
      "config": {
        "buildCommand": "npm run build",
        "outputDirectory": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/dist/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/index.html"
    }
  ]
}
```

This configuration:
- Uses the Node.js builder for Vercel
- Runs the build command from package.json
- Routes API requests to the server
- Routes static file requests to the built frontend
- Falls back to index.html for client-side routing

### Server Updates

The server now uses the PORT environment variable provided by Vercel:

```typescript
const port = process.env.PORT || 5000;
```

## Deployment Steps

1. **Push your code to GitHub**:
   Make sure all changes are committed and pushed to your GitHub repository.

2. **Import your project in Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "Add New..." > "Project"
   - Select your GitHub repository
   - Vercel should automatically detect the project settings

3. **Configure environment variables** (if needed):
   - Add any required environment variables in the Vercel project settings
   - For example, database connection strings or API keys

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

## Troubleshooting

If you encounter issues with the deployment:

1. **Check build logs**:
   - In the Vercel dashboard, go to your project
   - Click on the latest deployment
   - Check the "Build" and "Runtime" logs for errors

2. **Common issues**:
   - **Missing environment variables**: Make sure all required environment variables are set
   - **Build errors**: Check if the build process is failing
   - **Runtime errors**: Check if the server is starting correctly

3. **Local testing**:
   - You can test the production build locally before deploying:
   ```
   npm run build
   NODE_ENV=production node dist/index.js
   ```

## UI/UX Upgrade Considerations

When implementing the UI/UX upgrades we discussed earlier, keep in mind:

1. All frontend code changes will be automatically deployed when pushed to GitHub
2. The build process will compile the React frontend to static files
3. The server will serve these static files in production

This deployment setup supports all the UI/UX improvements we identified, including:
- More consistent typography and spacing
- Enhanced accessibility
- Performance optimization
- Improved mobile experience
- More sophisticated loading patterns