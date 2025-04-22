
// Simple JavaScript version of the application entry point for maximum compatibility

// Try to identify DOM elements we need
const rootElement = document.getElementById('root');
console.log("Initializing app in non-module format");

// Create a function to handle rendering the application
function renderApp() {
  console.log("Rendering app in compatibility mode...");
  
  try {
    // Import React and ReactDOM
    const React = window.React;
    const ReactDOM = window.ReactDOM || (window.ReactDOMClient ? window.ReactDOMClient : null);
    
    if (!React || !ReactDOM) {
      throw new Error("React or ReactDOM not found - attempting to load them");
    }
    
    // Try to find and render the App component
    const App = window.App;
    if (!App) {
      // If we can't find the App, create a simple component
      createBasicUI();
      return;
    }
    
    // Attempt to render using either new or old API
    if (ReactDOM.createRoot) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(App));
    } else {
      ReactDOM.render(React.createElement(App), rootElement);
    }
    
    console.log("App rendered successfully in compatibility mode");
    // Signal that the app has loaded
    window.dispatchEvent(new Event('app-loaded'));
    
  } catch (error) {
    console.error("Error rendering application:", error);
    // Create a basic UI if the app fails to render
    createBasicUI();
  }
}

// Create a basic UI if React rendering fails
function createBasicUI() {
  console.log("Creating basic UI as fallback");
  
  if (!rootElement) return;
  
  rootElement.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <header style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #1a365d; font-size: 2.5rem;">Me First Group</h1>
        <p style="color: #4a5568; font-size: 1.2rem;">Mining Transport Specialists</p>
      </header>
      
      <div style="margin-bottom: 40px; text-align: center;">
        <h2 style="color: #2d3748; margin-bottom: 20px;">Welcome to Me First Group</h2>
        <p style="line-height: 1.6; color: #4a5568;">
          We are specialists in mining commodity transport with 34-ton side tipper trucks,
          transporting manganese, chrome, coal and other mining commodities.
        </p>
      </div>
      
      <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h3 style="color: #2d3748; margin-top: 0;">Our Services</h3>
        <ul style="margin-top: 15px; line-height: 1.6; color: #4a5568;">
          <li>Bulk Transport Services</li>
          <li>Specialized Mining Commodity Transport</li>
          <li>Side Tipper Truck Rental</li>
          <li>Logistics Solutions</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-bottom: 40px;">
        <h3 style="color: #2d3748;">Contact Us</h3>
        <p style="line-height: 1.6; color: #4a5568;">
          Email: info@mefirstgroup.co.za<br>
          Phone: +27 123 456 789
        </p>
      </div>
      
      <footer style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096;">
        <p>&copy; 2023 Me First Group. All rights reserved.</p>
      </footer>
    </div>
  `;
  
  // Signal that the app has loaded
  window.dispatchEvent(new Event('app-loaded'));
}

// Check if document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure any scripts are loaded
    setTimeout(renderApp, 500);
  });
} else {
  // If already loaded, run with a small delay
  setTimeout(renderApp, 500);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderApp };
}

// Also attach to window for direct access
if (typeof window !== 'undefined') {
  window.renderMainApp = renderApp;
}
