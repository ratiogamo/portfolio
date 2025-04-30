// --- ADD THIS LINE AT THE VERY TOP ---
console.log('[Server Log Test] server/index.ts starting execution.');

import express2 from "express";
// Make sure necessary imports are here (path, fileURLToPath etc. might be needed if moved from vite.ts)
import { registerRoutes } from "./routes";
// Ensure exports are fixed in ./vite if these are still imported
import { setupVite, serveStatic, log } from "./vite"; 

const app = express2();
// ... other middleware like app.use(express2.json()) ...

(async () => {
  // --- ADD LOGS HERE ---
  console.log('[Server Log Test] Inside async IIFE, before registerRoutes.');
  // Check NODE_ENV directly from process.env
  console.log(`[Server Log Test] NODE_ENV check (process.env): ${process.env.NODE_ENV}`); 

  const server = await registerRoutes(app);
  // ... error handler app.use((err, ...)) ...

  // --- ADD LOGS HERE ---
  // Check the 'env' value Express determines
  console.log(`[Server Log Test] About to check environment: app.get('env') is ${app.get('env')}`); 

  if (app.get("env") === "development") { // Or potentially use: process.env.NODE_ENV !== 'production'
     console.log('[Server Log Test] Entering DEV block (setupVite)');
     await setupVite(app, server);
  } else {
     console.log('[Server Log Test] Entering PROD block (serveStatic)');
     serveStatic(app); // Ensure the logs inside serveStatic are still present too!
  }

  const port = process.env.PORT || 5000; // Use Vercel's PORT
  server.listen({
    port,
    host: "0.0.0.0", // Keep host 0.0.0.0
    // reusePort: true // Might not be needed/allowed on Vercel
  }, () => {
    // --- ADD LOGS HERE ---
    log(`serving on port ${port}`); // Your custom log
    console.log(`[Server Log Test] Server listening confirmation on port ${port}`); // Direct log
  });
})();
// Inside server/vite.ts (or server/vite.js)
import { /* other imports */ } from 'vite';
import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { fileURLToPath } from 'url';
// etc...

// Make sure 'export' is here!
export function log(message: string, source = "express") {
  // ... your log function code
}

// Make sure 'export' is here!
export async function setupVite(app: Express, server: Server) {
  // ... your setupVite function code
}

// This one seemed okay, but ensure 'export' is here too
// And ensure this includes the console.log statements for debugging
export function serveStatic(app: Express) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename); 
  const distPath = path.resolve(__dirname, "public"); 

  console.log(`[serveStatic Production] Calculated distPath: ${distPath}`); // Keep this log

  if (!fs.existsSync(distPath)) {
    console.error(`[serveStatic Production] ERROR: distPath does not exist: ${distPath}`); // Keep this log
    throw new Error(/*...*/);
  } else {
    console.log(`[serveStatic Production] Verified distPath exists: ${distPath}`); // Keep this log
  }

  app.use(express.static(distPath));

  app.use("*", (req, res) => { 
    console.log(`[serveStatic Production] Catch-all triggered for path: ${req.originalUrl}`); // Keep this log
    const indexPath = path.resolve(distPath, "index.html");
    console.log(`[serveStatic Production] Attempting to send index.html from: ${indexPath}`); // Keep this log

    res.sendFile(indexPath, (err) => { 
      if (err) {
        console.error(`[serveStatic Production] Error sending index.html: ${err}`); // Keep this log
        res.status(500).send("Internal Server Error sending file.");
      } else {
         console.log(`[serveStatic Production] Successfully sent index.html for ${req.originalUrl}`); // Keep this log
      }
    });
  });
}
