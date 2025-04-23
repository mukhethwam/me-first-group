
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: {
      createRoot: typeof createRoot;
    };
  }
}

const renderApp = () => {
  try {
    console.log("[STARTUP] Initializing app rendering...");
    console.log("[STARTUP] Current time:", new Date().toISOString());
    console.log("[STARTUP] Environment:", import.meta.env);
    
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("[ERROR] Failed to find the root element - DOM may not be fully loaded");
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
          <h1>Loading Error</h1>
          <p>Unable to find root element. Please refresh the page or check browser console for details.</p>
          <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0056b3; color: white; text-decoration: none; border-radius: 4px;">Retry</a>
        </div>
      `;
      return;
    }
    
    console.log("[STARTUP] Root element found:", rootElement);
    
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[STARTUP] App successfully rendered");
  } catch (error) {
    console.error("[CRITICAL ERROR] Rendering error:", error);
    
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
        <p style="color: #777; font-size: 14px;">Detailed error: ${error.message}</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0056b3; color: white; text-decoration: none; border-radius: 4px;">Retry</a>
      </div>
    `;
    
    setTimeout(() => {
      try {
        window.location.href = './fallback.html';
      } catch (e) {
        console.error("[FALLBACK ERROR]", e);
      }
    }, 5000);
  }
};

if (typeof window !== 'undefined') {
  console.log("[STARTUP] Window object available, checking document readyState");
  
  if (document.readyState === 'loading') {
    console.log("[STARTUP] Document is still loading, adding event listener");
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    console.log("[STARTUP] Document is already loaded, rendering immediately");
    renderApp();
  }
} else {
  console.error("[ERROR] Window object is undefined");
}
