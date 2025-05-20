
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Define our custom event type with proper TypeScript syntax
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
      
      // Clear any existing content in the root element
      if (rootElement.hasChildNodes()) {
        console.log("Clearing existing content in root element");
        while (rootElement.firstChild) {
          rootElement.removeChild(rootElement.firstChild);
        }
      }
      
      // Render the app
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
    
    // Show the fallback content
    const fallbackContent = document.getElementById('fallback-content');
    if (fallbackContent) {
      fallbackContent.style.display = 'block';
    }
    
    // Hide the loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.classList.add('hidden');
    }
  }
};

// Modified browser compatibility check
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

// Use a more reliable DOM ready check with error handling
try {
  if (checkBrowserCompatibility()) {
    // Try to render immediately if DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      console.log("DOM already ready, rendering immediately");
      setTimeout(renderApp, 0); // Use setTimeout to push to next event loop
    } else {
      // Otherwise wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', () => {
        console.log("DOMContentLoaded fired, rendering app");
        renderApp();
      });
    }
    
    // Also attempt to render on window load as fallback
    window.addEventListener('load', () => {
      console.log("Window load event fired");
      const rootElement = document.getElementById("root");
      if (rootElement && (!rootElement.children || rootElement.children.length === 0)) {
        console.log("Window loaded but app not rendered yet, trying again");
        renderApp();
      }
    });
  }
} catch (e) {
  console.error("Fatal initialization error:", e);
  
  // Show fallback content
  const fallbackContent = document.getElementById('fallback-content');
  if (fallbackContent) {
    fallbackContent.style.display = 'block';
  }
  
  // Hide loading indicator
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.classList.add('hidden');
  }
}
