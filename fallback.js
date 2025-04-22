
(function() {
  console.log("Running emergency fallback script");
  
  // Track 503 errors and attempts to recover
  let recovery503Attempts = 0;
  const max503RecoveryAttempts = 3;
  
  // Check if we're coming back from a 503 error
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('recovering503')) {
    console.log("Attempting to recover from 503 error");
    recovery503Attempts = parseInt(urlParams.get('attempt') || '1');
  }
  
  // Function to detect 503 errors via fetch
  function check503Status() {
    console.log("Checking server status...");
    fetch(window.location.href, { 
      method: 'HEAD',
      cache: 'no-store'
    })
    .then(response => {
      if (response.status === 503) {
        console.error("Server returned 503 Service Unavailable");
        handle503Error();
      } else {
        console.log("Server status check: " + response.status);
      }
    })
    .catch(error => {
      console.error("Error checking server status:", error);
    });
  }
  
  // Handle 503 errors
  function handle503Error() {
    if (recovery503Attempts < max503RecoveryAttempts) {
      console.log(`503 recovery attempt ${recovery503Attempts + 1}/${max503RecoveryAttempts}`);
      
      // Wait and reload with recovery flag
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('recovering503', 'true');
        url.searchParams.set('attempt', (recovery503Attempts + 1).toString());
        url.searchParams.set('timestamp', Date.now().toString());
        window.location.href = url.toString();
      }, 5000);
    } else {
      // Max attempts reached, show error
      console.error("Maximum 503 recovery attempts reached");
      showError503();
    }
  }
  
  // Show 503 error message
  function showError503() {
    document.body.innerHTML += `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div style="max-width: 500px; padding: 30px; background: white; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #d9534f; margin-top: 0;">Service Temporarily Unavailable (503)</h2>
          <p>We're experiencing technical difficulties with our server.</p>
          <p>Our team has been notified and is working to resolve the issue.</p>
          <div style="margin-top: 20px;">
            <a href="/deployment-check.php" style="display: inline-block; padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">Run Diagnostic Check</a>
            <a href="/" style="display: inline-block; padding: 10px 15px; background: #28a745; color: white; text-decoration: none; border-radius: 4px;">Try Again</a>
          </div>
        </div>
      </div>
    `;
  }
  
  // Check if the app loaded correctly
  function checkAppLoaded() {
    if (document.getElementById('root').children.length === 0) {
      console.error("App failed to load - attempting fallback loading");
      tryDirectLoading();
      
      // Also check for 503 status
      check503Status();
    } else {
      console.log("App appears to have loaded successfully");
    }
  }
  
  // Try loading the app scripts directly
  function tryDirectLoading() {
    console.log("Attempting direct script loading fallback");
    
    // Look for available script files
    const possiblePaths = [
      './assets/index.js',
      './src/main.js',
      './main.js',
      './assets/index-*.js' // For hashed filenames
    ];
    
    // Try each path
    let loaded = false;
    possiblePaths.forEach(function(path) {
      if (!loaded) {
        // For wildcard paths, try to find matching files
        if (path.includes('*')) {
          const basePath = path.split('*')[0];
          const scripts = document.querySelectorAll('script[src^="' + basePath + '"]');
          if (scripts.length > 0) {
            console.log("Found existing script: " + scripts[0].src);
            loaded = true;
          }
        } else {
          try {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = path;
            script.onload = function() {
              console.log("Successfully loaded: " + path);
              loaded = true;
            };
            script.onerror = function() {
              console.error("Failed to load: " + path);
            };
            document.body.appendChild(script);
          } catch (e) {
            console.error("Error attempting to load " + path, e);
          }
        }
      }
    });
    
    // Display a visible message if all fallbacks fail
    setTimeout(function() {
      if (document.getElementById('root').children.length === 0) {
        document.body.innerHTML += `
          <div style="padding: 20px; margin: 20px; border: 1px solid red; background-color: #ffeeee;">
            <h2>Application Loading Error</h2>
            <p>We're having trouble loading the application.</p>
            <p>Please try clearing your browser cache or contact support.</p>
            <div style="margin-top: 15px;">
              <a href="/deployment-check.php" style="display: inline-block; padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">Run Deployment Check</a>
              <a href="/?cache_bust=${Date.now()}" style="display: inline-block; padding: 10px 15px; background: #28a745; color: white; text-decoration: none; border-radius: 4px;">Reload Without Cache</a>
            </div>
          </div>
        `;
      }
    }, 5000);
  }
  
  // Wait for page to finish loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(checkAppLoaded, 3000);
    });
  } else {
    setTimeout(checkAppLoaded, 3000);
  }
})();
