import express, { type Express } from "express";
import fs from "fs"; // Make sure fs is imported
import path from "path";
import { fileURLToPath } from 'url'; // Make sure fileURLToPath is imported
// Other imports... createViteServer, createLogger, viteConfig, nanoid etc.

// ... log function ...

// ... setupVite function ...


// --- UPDATED serveStatic function with LOGGING ---
export function serveStatic(app: Express) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename); // Should be 'dist' directory when running
  const distPath = path.resolve(__dirname, "public"); // Should be 'dist/public'

  // Log calculated path
  console.log(`[serveStatic Production] Calculated distPath: ${distPath}`);

  if (!fs.existsSync(distPath)) {
    console.error(`[serveStatic Production] ERROR: distPath does not exist: ${distPath}`);
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  } else {
    // Log verification
    console.log(`[serveStatic Production] Verified distPath exists: ${distPath}`);
  }

  // Serve static files (like CSS/JS in /assets)
  app.use(express.static(distPath));

  // Fallback catch-all to serve index.html
  app.use("*", (req, res) => { // Added 'req' parameter
    // Log when catch-all is hit
    console.log(`[serveStatic Production] Catch-all triggered for path: ${req.originalUrl}`); 
    const indexPath = path.resolve(distPath, "index.html");
    // Log the path it tries to send
    console.log(`[serveStatic Production] Attempting to send index.html from: ${indexPath}`); 

    res.sendFile(indexPath, (err) => { // Added error handling callback
      if (err) {
        console.error(`[serveStatic Production] Error sending index.html: ${err}`); 
        res.status(500).send("Internal Server Error sending file.");
      } else {
         console.log(`[serveStatic Production] Successfully sent index.html for ${req.originalUrl}`);
      }
    });
  });
}
