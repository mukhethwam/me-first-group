
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add typings for the window object with React and ReactDOM
declare global {
  interface Window {
    React: typeof React;
    ReactDOM: {
      createRoot: typeof createRoot;
    };
  }
}

// Enhanced error handling with deployment-specific checks
const renderApp = () => {
  try {
    console.log("Initializing app rendering...");
    
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Failed to find the root element - DOM may not be fully loaded");
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
          <h1>Loading Error</h1>
          <p>Unable to find root element. Please refresh the page or check browser console for details.</p>
        </div>
      `;
      return;
    }
    
    // Create root before rendering
    const root = createRoot(rootElement);
    
    // Render the app
    root.render(<App />);
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Critical rendering error:", error);
    
    // Display a fallback error message for users
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
        <p style="color: #777; font-size: 14px;">If this problem persists, please contact our support team.</p>
      </div>
    `;
  }
};

// Make sure the window object exists (for SSR compatibility)
if (typeof window !== 'undefined') {
  // Execute with a check to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    // DOM already ready, render immediately
    renderApp();
  }
}
