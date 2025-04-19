
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Improved error reporting function with domain awareness
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
      <p>Domain: ${window.location.hostname}</p>
    `;
    document.body.appendChild(errorContainer);
  } catch (displayError) {
    // Last resort if even error display fails
    console.error('Failed to display error:', displayError);
  }
}

// Cross-domain compatible render function
function renderApp() {
  console.log(`Initializing app rendering from main.js on domain: ${window.location.hostname}`);
  
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
    
    console.log(`App successfully rendered from main.js on domain: ${window.location.hostname}`);
    
    // Notify the page that the app has loaded
    window.dispatchEvent(new CustomEvent('app-loaded'));
  } catch (error) {
    logError('Failed to render application', error);
  }
}

// Execute with a small delay to ensure DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // If document already loaded, run immediately
  setTimeout(renderApp, 0);
}
