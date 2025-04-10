
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple and direct rendering approach
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Critical error: Root element not found");
  document.body.innerHTML = `
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
      <h1>Loading Error</h1>
      <p>Unable to find root element. Please try refreshing the page.</p>
    </div>
  `;
} else {
  const root = createRoot(rootElement);
  
  // Render with minimal error handling
  try {
    root.render(<App />);
    console.log("App successfully rendered");
    // Dispatch event to notify that app has loaded successfully
    window.dispatchEvent(new Event('app-loaded'));
  } catch (error) {
    console.error("Render error:", error);
    rootElement.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error rendering the application.</p>
        <p style="font-size: 14px; color: #666;">Error details: ${String(error)}</p>
      </div>
    `;
  }
}
