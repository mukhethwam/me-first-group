
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a more resilient initialization function
(function initApp() {
  try {
    console.log("[STARTUP] Initializing app...");
    
    // Get root element
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("[CRITICAL] Root element not found in DOM");
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
          <h1>Loading Error</h1>
          <p>Unable to initialize application. Please refresh the page.</p>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">Refresh Page</button>
        </div>
      `;
      return;
    }
    
    // Create root and render app with simplified approach
    console.log("[STARTUP] Creating React root and rendering app...");
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("[STARTUP] App render initiated");
  } catch (error) {
    console.error("[CRITICAL ERROR] App initialization failed:", error);
    
    // Display user-friendly error message
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Unable to load application</h1>
        <p>We encountered an issue while loading the site. Please try refreshing.</p>
        <p style="color: #777; font-size: 14px;">Technical details: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">Refresh Page</button>
      </div>
    `;
  }
})();
