
// This is a fallback JavaScript file that will load our React application
// when the TypeScript version fails to load

import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

function renderApp() {
  try {
    console.log("Initializing app rendering from main.js fallback...");
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Root element not found! Creating fallback element.");
      const fallbackRoot = document.createElement('div');
      fallbackRoot.id = 'root';
      document.body.appendChild(fallbackRoot);
      createRoot(fallbackRoot).render(App());
    } else {
      console.log("Root element found, rendering app...");
      createRoot(rootElement).render(App());
      console.log("App successfully rendered from fallback");
      
      // Dispatch an event when the app has loaded successfully
      window.dispatchEvent(new CustomEvent('app-loaded'));
    }
  } catch (error) {
    console.error("Critical rendering error in fallback:", error);
    
    // Display a fallback error message for users
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
        <p style="color: #777; font-size: 14px;">Error details have been logged to the console.</p>
      </div>
    `;
  }
}

// Run immediately or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
