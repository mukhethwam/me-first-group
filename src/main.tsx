
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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
      createRoot(rootElement).render(<App />);
      console.log("App successfully rendered");
      
      // Dispatch an event when the app has loaded successfully
      window.dispatchEvent(new CustomEvent('app-loaded'));
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

// Use a more reliable DOM ready check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // If DOM is already ready, render immediately
  renderApp();
}
