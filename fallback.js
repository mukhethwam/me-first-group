
(function() {
  console.log("Running emergency fallback script");
  
  // Check if the app loaded correctly
  function checkAppLoaded() {
    if (document.getElementById('root').children.length === 0) {
      console.error("App failed to load - attempting fallback loading");
      tryDirectLoading();
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
            <a href="/deployment-check.php" style="display: inline-block; margin-top: 15px; padding: 10px; background: #007bff; color: white; text-decoration: none;">Run Deployment Check</a>
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
