
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Improved error reporting function
function logError(message, error) {
  console.error(`${message}:`, error);
  // Try to add visible error display to the page
  try {
    const errorContainer = document.createElement('div');
    errorContainer.style.padding = '20px';
    errorContainer.style.margin = '20px';
    errorContainer.style.border = '1px solid red';
    errorContainer.style.backgroundColor = '#ffeeee';
    errorContainer.innerHTML = `
      <h2>Error Loading Application</h2>
      <p>${message}</p>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
    `;
    document.body.appendChild(errorContainer);
  } catch (displayError) {
    // Last resort if even error display fails
    console.error('Failed to display error:', displayError);
  }
}

// Simple, direct render function
function renderApp() {
  console.log("Initializing app rendering from main.js...");
  
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    const root = createRoot(rootElement);
    
    root.render(
      React.createElement(React.StrictMode, null, 
        React.createElement(App)
      )
    );
    
    console.log("App successfully rendered from main.js");
    
    // Notify the page that the app has loaded
    window.dispatchEvent(new CustomEvent('app-loaded'));
  } catch (error) {
    logError('Failed to render application', error);
  }
}

// Execute immediately - don't wait for DOMContentLoaded
// The script is already at the bottom of the page
renderApp();
