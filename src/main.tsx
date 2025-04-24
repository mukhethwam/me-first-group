
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediately log startup for debugging
console.log("[STARTUP] Script execution started");

// Function to initialize the React application with improved Chrome compatibility
function initializeApp() {
  console.log("[STARTUP] Initializing app...");
  
  // Get root element with more detailed logging
  const rootElement = document.getElementById("root");
  console.log("[STARTUP] Root element found:", !!rootElement);
  
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
    
    // Additional check for Chrome-specific rendering
    setTimeout(() => {
      if (rootElement.childNodes.length === 0) {
        console.log("[STARTUP] No children found after initial render, forcing re-render");
        renderApp(root);
      }
    }, 100);
    
  } catch (error) {
    console.error("[CRITICAL ERROR] Root rendering failed:", error);
    handleRenderingFailure(error);
  }
}

// Function to render the app with improved error handling
function renderApp(root) {
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[STARTUP] App render completed successfully");
    
    // Force a layout recalculation
    document.body.clientHeight;
    
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

// Improved initialization with Chrome compatibility fixes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("[STARTUP] DOMContentLoaded event fired");
    initializeApp();
  });
} else {
  // DOM already loaded, run immediately with a small delay
  // This helps Chrome with proper initialization
  console.log("[STARTUP] Document already ready, initializing with delay");
  setTimeout(initializeApp, 10);
}

// Add a shorter backup initialization timeout
setTimeout(() => {
  console.log("[STARTUP] Checking if app was initialized...");
  const rootElement = document.getElementById("root");
  if (rootElement && (!rootElement.childNodes.length || rootElement.childNodes.length < 2)) {
    console.log("[STARTUP] App not properly initialized, running backup initialization");
    initializeApp();
  }
}, 200); // Reduced timeout for faster recovery

// Add a window load event handler to ensure rendering after all resources load
window.addEventListener('load', function() {
  console.log("[STARTUP] Window load event fired, checking if app is initialized");
  const rootElement = document.getElementById("root");
  if (rootElement && (!rootElement.childNodes.length || rootElement.childNodes.length < 2)) {
    console.log("[STARTUP] App not initialized after load event, running emergency initialization");
    initializeApp();
  }
});
