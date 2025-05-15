
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Declare the custom event for TypeScript
declare global {
  interface WindowEventMap {
    'app-loaded': CustomEvent;
  }
}

// Log initialization for debugging
console.log("Initializing application on Host Africa server...");

// Create a more robust app initialization process
const renderApp = () => {
  try {
    console.log("Initializing app rendering...");
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Root element not found! Creating fallback element.");
      const fallbackRoot = document.createElement('div');
      fallbackRoot.id = 'root';
      document.body.appendChild(fallbackRoot);
      createRoot(fallbackRoot).render(<App />);
    } else {
      console.log("Root element found, rendering app...");
      createRoot(rootElement).render(<App />);
      console.log("App successfully rendered");
      
      // Dispatch an event when the app has loaded successfully
      window.dispatchEvent(new CustomEvent('app-loaded'));
    }
  } catch (error) {
    console.error("Critical rendering error:", error);
    
    // Display error in the error display div
    try {
      const errorDisplay = document.getElementById('error-display');
      if (errorDisplay) {
        errorDisplay.style.display = 'block';
        errorDisplay.innerHTML = `<h3>Error Loading App</h3><p>${error instanceof Error ? error.message : String(error)}</p>`;
      }
    } catch (e) {
      // Last resort error display
      console.error("Failed to display error:", e);
    }
    
    // Display a fallback error message for users
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="background-color: #4f46e5; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
          Refresh Page
        </button>
        <p style="color: #777; font-size: 14px;">Error details have been logged to the console.</p>
        <p style="color: #777; font-size: 14px;">Error: ${error instanceof Error ? error.message : String(error)}</p>
      </div>
    `;
  }
};

// Check if the browser supports modern features
const checkBrowserCompatibility = () => {
  const isCompatible = 
    'querySelector' in document && 
    'addEventListener' in window;
    
  if (!isCompatible) {
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Browser Not Supported</h1>
        <p>Your browser does not support the modern features needed to run this website.</p>
        <p>Please use a more recent version of Chrome, Firefox, Safari, or Edge.</p>
      </div>
    `;
    return false;
  }
  return true;
};

// Use a more reliable DOM ready check
if (checkBrowserCompatibility()) {
  // Try to detect if we're running in a testing environment
  const possibleTestEnvironment = typeof window !== 'undefined' && 
    (window.navigator.userAgent.includes('Node.js') || 
     window.navigator.userAgent.includes('jsdom'));

  if (!possibleTestEnvironment) {
    if (document.readyState === 'loading') {
      console.log("Document still loading, waiting for DOMContentLoaded");
      document.addEventListener('DOMContentLoaded', renderApp);
    } else {
      // If DOM is already ready, render immediately
      console.log("DOM already ready, rendering immediately");
      renderApp();
    }
  } else {
    console.log("Test environment detected, deferring render");
  }
}
