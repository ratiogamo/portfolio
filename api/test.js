// Simple test endpoint for Vercel
export default function handler(req, res) {
  res.status(200).json({
    message: 'API test endpoint is working!',
    path: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  });
}