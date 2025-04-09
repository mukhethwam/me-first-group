
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced error handling for production
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(<App />);
    } else {
      console.error("Failed to find the root element");
    }
  } catch (error) {
    console.error("Failed to render the app:", error);
    
    // Display a fallback error message for users
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
          <h1>Something went wrong</h1>
          <p>We're sorry, but the site is currently unavailable. Please try again later.</p>
        </div>
      `;
    }
  }
};

renderApp();
