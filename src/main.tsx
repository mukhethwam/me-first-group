
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: {
      createRoot: typeof createRoot;
    };
  }
}

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
          <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0056b3; color: white; text-decoration: none; border-radius: 4px;">Retry</a>
        </div>
      `;
      return;
    }
    
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Critical rendering error:", error);
    
    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the site. Please try refreshing the page.</p>
        <p style="color: #777; font-size: 14px;">If this problem persists, please contact our support team.</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #0056b3; color: white; text-decoration: none; border-radius: 4px;">Retry</a>
      </div>
    `;
    
    setTimeout(() => {
      try {
        window.location.href = './fallback.html';
      } catch (e) {
        // Silent fail - already showing error message
      }
    }, 5000);
  }
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
}
