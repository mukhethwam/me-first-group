
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediately execute rendering function
(function initApp() {
  try {
    console.log("[STARTUP] Initializing app...");
    
    // Get root element and verify it exists
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found in DOM");
    }
    
    // Create root and render app
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("[STARTUP] App successfully rendered");
  } catch (error) {
    console.error("[CRITICAL ERROR] App initialization failed:", error);
    
    // Display fallback content in case of error
    const rootElement = document.getElementById("root") || document.body;
    rootElement.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Unable to load application</h1>
        <p>Please refresh the page or try again later.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">Refresh Page</button>
      </div>
    `;
  }
})();
