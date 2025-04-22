
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced error handling with deployment-specific checks
const renderApp = () => {
  try {
    console.log("Initializing app rendering...");
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(<App />);
      console.log("App successfully rendered");
      
      // Dispatch event to notify that the app has loaded
      const appLoadedEvent = new Event('app-loaded');
      window.dispatchEvent(appLoadedEvent);
    } else {
      console.error("Failed to find the root element - DOM may not be fully loaded");
      // Try to create a visible error for debugging
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
          <h1>Loading Error</h1>
          <p>Unable to find root element. Please check browser console for details.</p>
        </div>
      `;
    }
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

// Execute with a slight delay to ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
