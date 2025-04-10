
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced error handling with deployment-specific checks
const renderApp = () => {
  try {
    console.log("Initializing app rendering...");
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Critical error: Root element not found");
      document.body.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
          <h1>Loading Error</h1>
          <p>Unable to find root element. Please try refreshing the page.</p>
        </div>
      `;
      return;
    }
    
    // Create root and render with error boundary
    const root = createRoot(rootElement);
    
    // Wrap rendering in a try block for error catching
    try {
      root.render(<App />);
      console.log("App successfully rendered");
    } catch (renderError) {
      console.error("Render error:", renderError);
      root.render(
        <div style={{fontFamily: 'Arial', padding: '20px', textAlign: 'center'}}>
          <h2>Something went wrong</h2>
          <p>We're sorry, but there was an error rendering the application.</p>
        </div>
      );
    }
  } catch (error) {
    console.error("Critical initialization error:", error);
    
    // Display a fallback error message for users
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
      </div>
    `;
  }
};

// Check if DOM is loaded and ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // DOM already ready, render immediately
  renderApp();
}
