// Simplified serverless API route for Vercel
export default function handler(req, res) {
  // Basic response to show the API is working
  res.status(200).json({
    message: 'API is working!',
    path: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
}
