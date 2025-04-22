const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting enhanced build process for cPanel deployment...');

// Run the Vite build
try {
  console.log('Building the project with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
  // Copy the fallback.js to dist
  console.log('\nAdding fallback script for robust loading...');
  if (fs.existsSync('fallback.js')) {
    fs.copyFileSync('fallback.js', path.join(__dirname, 'dist', 'fallback.js'));
    console.log('Copied fallback.js to dist folder');
  } else {
    console.log('fallback.js not found, will be created in next build');
  }
  
  // Copy deployment-check.php to dist if it exists
  if (fs.existsSync('deployment-check.php')) {
    fs.copyFileSync('deployment-check.php', path.join(__dirname, 'dist', 'deployment-check.php'));
    console.log('Copied deployment-check.php to dist folder');
  } else {
    console.log('deployment-check.php not found, will be created in next build');
  }
  
  // Convert any JSON files to JS module files
  console.log('\nConverting JSON files to JS modules for compatibility...');
  
  const distPath = path.join(__dirname, 'dist');
  
  function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.json')) {
        console.log(`Converting ${filePath} to JS module...`);
        const jsonContent = fs.readFileSync(filePath, 'utf8');
        const jsContent = `export default ${jsonContent};`;
        
        // Create a .js file with the same name
        const jsFilePath = filePath.replace('.json', '.js');
        fs.writeFileSync(jsFilePath, jsContent);
        
        // Keep the original .json file too for browsers that support it
        console.log(`Created JS module at ${jsFilePath}`);
      }
    });
  }
  
  processDirectory(distPath);
  
  // Create an index.php file that points to index.html for PHP hosting
  const indexPhpPath = path.join(distPath, 'index.php');
  fs.writeFileSync(indexPhpPath, `<?php
// If the request is for a specific file with extension, serve it directly
if (preg_match('/\\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/i', $_SERVER['REQUEST_URI'])) {
    return false; // Let the server handle the request
}

// Otherwise, serve index.html for any other route (SPA handling)
include_once('index.html');
?>`);
  
  console.log('\nCreated enhanced index.php file for PHP hosting compatibility');
  
  // Create a server-side .htaccess file for path routing and MIME types
  const htaccessPath = path.join(distPath, '.htaccess');
  const htaccessContent = `
# Enable rewriting
RewriteEngine On

# Allow cross-domain access
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"

# Fix common PHP + SPA issues, direct certain file types to PHP handler
RewriteCond %{REQUEST_URI} !^/(deployment-check\\.php|index\\.php) [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [L,QSA]

# Set correct MIME types
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType application/javascript .mjs
  AddType text/css .css
  AddType text/html .html
  AddType text/plain .json
</IfModule>

# Handle MIME types with headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  
  # Ensure JS files are served with the correct MIME type
  <FilesMatch "\\.(js|mjs)$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
  
  <FilesMatch "\\.css$">
    Header set Content-Type "text/css"
  </FilesMatch>
  
  # Handle JSON files as text/plain for compatibility
  <FilesMatch "\\.json$">
    Header set Content-Type "text/plain"
  </FilesMatch>
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/x-javascript application/json
</IfModule>

# Set caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/plain "access plus 1 day"
</IfModule>

# Prevent caching of index.html to ensure latest app is loaded
<FilesMatch "index\\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
  Header set Pragma "no-cache"
  Header set Expires 0
</FilesMatch>

# PHP settings that might help with script loading
<IfModule mod_php.c>
  php_value display_errors 1
  php_value memory_limit 256M
  php_value max_execution_time 60
  php_flag zlib.output_compression on
</IfModule>

# Alternative SPA routing for hosts that don't support RewriteRule properly
<IfModule !mod_rewrite.c>
  FallbackResource /index.php
</IfModule>
`;
  
  fs.writeFileSync(htaccessPath, htaccessContent);
  console.log('\nCreated enhanced .htaccess file for better cPanel compatibility');
  
  // Create a simple deployment-check.php file to verify PHP is working
  const checkPhpPath = path.join(distPath, 'deployment-check.php');
  const deploymentCheckContent = `<?php
// Basic server info display for debugging deployment issues
header("Content-Type: text/html");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deployment Check</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
        .section { background: #f4f4f4; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .success { color: green; }
        .warning { color: orange; }
        .error { color: red; }
        code { background: #e9e9e9; padding: 2px 5px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>Me First Group Website - Deployment Check</h1>
    
    <div class="section">
        <h2>Server Information</h2>
        <p>PHP Version: <?php echo phpversion(); ?></p>
        <p>Server Software: <?php echo $_SERVER['SERVER_SOFTWARE']; ?></p>
        <p>Document Root: <?php echo $_SERVER['DOCUMENT_ROOT']; ?></p>
        <p>Request URI: <?php echo $_SERVER['REQUEST_URI']; ?></p>
    </div>
    
    <div class="section">
        <h2>Critical Files Check</h2>
        <?php
        $files_to_check = [
            'index.html',
            'index.php',
            '.htaccess',
            'assets/index.js',
            'assets/index.css'
        ];
        
        foreach ($files_to_check as $file) {
            if (file_exists($file)) {
                echo "<p class='success'>✓ $file - Found</p>";
            } else {
                echo "<p class='error'>✗ $file - Missing</p>";
            }
        }
        ?>
    </div>
    
    <div class="section">
        <h2>MIME Type Configuration</h2>
        <?php
        $mime_types = [
            '.js' => 'application/javascript',
            '.css' => 'text/css',
            '.json' => 'text/plain',
            '.html' => 'text/html'
        ];
        
        echo "<p>Configured MIME types in .htaccess:</p><ul>";
        foreach ($mime_types as $ext => $mime) {
            echo "<li>$ext => $mime</li>";
        }
        echo "</ul>";
        ?>
    </div>
    
    <div class="section">
        <h2>Script Loading Test</h2>
        <div id="script-test-result">Testing script loading...</div>
        <script>
            document.getElementById('script-test-result').innerHTML = '<span class="success">JavaScript is working correctly</span>';
        </script>
    </div>
    
    <div class="section">
        <h2>Next Steps</h2>
        <p>If you're seeing this page correctly but your main site is blank:</p>
        <ol>
            <li>Check browser console for errors (Press F12)</li>
            <li>Verify that all files were uploaded from the <code>dist</code> folder</li>
            <li>Ensure proper MIME types are set in .htaccess</li>
            <li>Check if your cPanel host supports SPA routing</li>
        </ol>
        <p><a href="/" style="padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">Return to Homepage</a></p>
    </div>
    
    <footer style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ccc; text-align: center;">
        <p>Me First Group Website - Deployment Diagnostic Tool</p>
    </footer>
</body>
</html>`;
  
  fs.writeFileSync(checkPhpPath, deploymentCheckContent);
  console.log('\nCreated enhanced deployment-check.php for more detailed server verification');
  
  // Update cpanel.yml file
  const cpanelYmlPath = path.join(__dirname, '.cpanel.yml');
  const cpanelYmlContent = `---
deployment:
  tasks:
    - export DEPLOYPATH=/home/glades/public_html
    - /bin/mkdir -p $DEPLOYPATH
    - /bin/cp -R dist/* $DEPLOYPATH
    - /bin/cp dist/.htaccess $DEPLOYPATH
    - /bin/chmod 644 $DEPLOYPATH/.htaccess
    - /bin/chmod 755 $DEPLOYPATH/deployment-check.php
    - /bin/chmod 755 $DEPLOYPATH/index.php
    - echo "Deployment completed at $(date)"
`;
  
  fs.writeFileSync(cpanelYmlPath, cpanelYmlContent);
  console.log('\nUpdated .cpanel.yml file with proper permissions settings');
  
  // Create special deployment instructions for cPanel
  fs.copyFileSync('cpanel-deployment-instructions.html', path.join(distPath, 'cpanel-deployment-instructions.html'));
  console.log('\nIncluded cpanel-deployment-instructions.html in the dist folder');
  
  // Verify the build output contains HTML files
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('\nVerifying build output: ✓ index.html found');
  } else {
    console.error('\nError: index.html not found in the dist folder!');
    process.exit(1);
  }
  
  console.log('\nThe website has been successfully built for cPanel hosting.');
  console.log('You can find all the required files in the "dist" folder.');
  console.log('\nFollow these steps to deploy your website to cPanel:');
  console.log('1. Download the "dist" folder from your build environment');
  console.log('2. Log in to cPanel and use the File Manager to upload ALL files from the "dist" folder to your public_html directory');
  console.log('3. Make sure you maintain the folder structure exactly as it is');
  console.log('4. After uploading, visit your-domain.co.za/deployment-check.php to verify the setup');
  console.log('\nYour site is now ready for cPanel hosting!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
