
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Declare the custom event for TypeScript using window
declare global {
  interface WindowEventMap {
    'app-loaded': CustomEvent;
  }
}

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
      setTimeout(() => {
        try {
          window.dispatchEvent(new CustomEvent('app-loaded'));
          console.log("app-loaded event dispatched");
        } catch (e) {
          console.error("Error dispatching app-loaded event:", e);
        }
      }, 100);
    }
  } catch (error) {
    console.error("Critical rendering error:", error);
    
    // Display a fallback error message for users
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="background-color: #4f46e5; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
          Refresh Page
        </button>
        <p style="color: #777; font-size: 14px;">Error details have been logged to the console.</p>
      </div>
    `;
  }
};

// Simplified browser compatibility check
const checkBrowserCompatibility = () => {
  try {
    // Basic feature detection
    const isCompatible = 
      'querySelector' in document && 
      'addEventListener' in window &&
      'localStorage' in window &&
      'fetch' in window;
      
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
  } catch (e) {
    console.error("Browser compatibility check failed:", e);
    return false;
  }
};

// Use a more reliable DOM ready check
if (checkBrowserCompatibility()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    // If DOM is already ready, render immediately
    console.log("DOM already ready, rendering immediately");
    renderApp();
  }
}
