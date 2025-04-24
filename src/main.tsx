
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Function to initialize the React application
function initializeApp() {
  console.log("[STARTUP] Initializing app...");
  
  // Get root element
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("[CRITICAL] Root element not found in DOM");
    // Create root element if missing
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    document.body.appendChild(newRoot);
    console.log("[RECOVERY] Created missing root element");
    
    // Now proceed with the created element
    const root = createRoot(newRoot);
    renderApp(root);
    return;
  }
  
  // Clean any existing content and create root
  console.log("[STARTUP] Creating React root and rendering app...");
  
  try {
    // Use createRoot API
    const root = createRoot(rootElement);
    renderApp(root);
    console.log("[STARTUP] Root rendering successful");
  } catch (error) {
    console.error("[CRITICAL ERROR] Root rendering failed:", error);
    handleRenderingFailure(error);
  }
}

// Function to render the app
function renderApp(root) {
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[STARTUP] App render completed successfully");
  } catch (error) {
    console.error("[CRITICAL ERROR] App rendering failed:", error);
    handleRenderingFailure(error);
  }
}

// Function to handle rendering failures
function handleRenderingFailure(error) {
  console.error("[CRITICAL] Rendering failure, attempting to show fallback", error);
  document.body.innerHTML = `
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
      <h1>Unable to load application</h1>
      <p>We encountered an issue while loading the site. Please try refreshing.</p>
      <p style="color: #777; font-size: 14px;">Technical details: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">Refresh Page</button>
    </div>
  `;
}

// Ensure DOM is fully loaded before trying to initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded, run immediately
  initializeApp();
}

// Add a more aggressive backup initialization
window.addEventListener('load', function() {
  console.log("[STARTUP] Window load event fired, checking if app is initialized");
  const rootElement = document.getElementById("root");
  if (rootElement && rootElement.children.length === 0) {
    console.log("[STARTUP] App not initialized after load event, running emergency initialization");
    initializeApp();
  }
});

// Add a backup timeout to ensure initialization happens
setTimeout(() => {
  console.log("[STARTUP] Checking if app was initialized...");
  const rootElement = document.getElementById("root");
  if (rootElement && !rootElement.childNodes.length) {
    console.log("[STARTUP] App not initialized, running backup initialization");
    initializeApp();
  }
}, 300); // Reduced timeout for faster recovery
