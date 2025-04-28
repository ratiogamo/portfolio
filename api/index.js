// Serverless API route for Vercel
import express from 'express';
import { createServer } from 'http';
import { registerRoutes } from '../server/routes.js';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes
const server = createServer(app);
registerRoutes(app);

// Export the Express API
export default async function handler(req, res) {
  // Forward the request to our Express app
  return new Promise((resolve) => {
    app(req, res, (result) => {
      resolve(result);
    });
  });
}
