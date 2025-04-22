
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
    
    // Verify React and ReactDOM are available
    if (!React || !createRoot) {
      console.error("React or ReactDOM not found. Attempting to load them via CDN as fallback...");
      
      // This is a fallback message if the script loading fails
      const displayErrorMessage = () => {
        document.body.innerHTML = `
          <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
            <h1>Loading Error</h1>
            <p>Unable to load React libraries. Please check your internet connection and try again.</p>
          </div>
        `;
      };
      
      // Try again in a moment to see if React has loaded
      setTimeout(() => {
        if (window.React && window.ReactDOM) {
          console.log("React loaded via CDN, attempting to render...");
          // Try rendering again
          const retryRender = () => {
            try {
              const rootElement = document.getElementById("root");
              if (rootElement) {
                const root = window.ReactDOM.createRoot(rootElement);
                root.render(window.React.createElement(App));
                console.log("App successfully rendered after CDN load");
              }
            } catch (e) {
              console.error("Retry render failed:", e);
              displayErrorMessage();
            }
          };
          retryRender();
        } else {
          console.error("React still not available after waiting");
          displayErrorMessage();
        }
      }, 1000);
      
      return;
    }
    
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Failed to find the root element - DOM may not be fully loaded");
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
          <h1>Loading Error</h1>
          <p>Unable to find root element. Please check browser console for details.</p>
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
        <p style="color: #777; font-size: 14px;">Error details have been logged to the console.</p>
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
