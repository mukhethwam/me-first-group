
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process for cPanel deployment...');

// Run the Vite build
try {
  console.log('Building the project with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
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
  fs.writeFileSync(indexPhpPath, '<?php include_once("index.html"); ?>');
  console.log('\nCreated index.php file for PHP hosting compatibility');
  
  // Create a server-side .htaccess file for path routing and MIME types
  const htaccessPath = path.join(distPath, '.htaccess');
  const htaccessContent = `
# Enable rewriting
RewriteEngine On

# Allow cross-domain access
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"

# Handle SPA routes by redirecting to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L,QSA]

# Set correct MIME types
AddType application/javascript .js
AddType application/javascript .mjs
AddType application/javascript .tsx
AddType application/javascript .ts
AddType text/plain .json
AddType text/css .css

# Allow Cross Origin
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  # Ensure JS files are served with the correct MIME type
  <FilesMatch "\\.(js|mjs|jsx|ts|tsx)$">
    Header set Content-Type "application/javascript"
  </FilesMatch>
  <FilesMatch "\\.css$">
    Header set Content-Type "text/css"
  </FilesMatch>
  
  # Handle JSON files as text/plain since hosting doesn't support JSON
  <FilesMatch "\\.json$">
    Header set Content-Type "text/plain"
  </FilesMatch>
  
  # Ensure proper module handling
  <FilesMatch "\\.js$">
    Header set Content-Type "application/javascript"
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

# Handle various script file extensions
<FilesMatch "\\.(tsx|ts|jsx|js|mjs)$">
  Header set Cache-Control "no-cache, must-revalidate"
  Header set Pragma "no-cache"
</FilesMatch>

# Special handling for JSON files
<FilesMatch "\\.json$">
  ForceType text/plain
</FilesMatch>

# Fix for some hosts that don't properly handle module scripts
<IfModule mod_rewrite.c>
  RewriteCond %{HTTP_USER_AGENT} !(Chrome|Firefox|Safari) [NC]
  RewriteRule \\.js$ - [T=application/javascript]
</IfModule>
`;
  
  fs.writeFileSync(htaccessPath, htaccessContent);
  console.log('\nCreated .htaccess file for proper routing and MIME types');
  
  // Create a simple deployment-check.php file to verify PHP is working
  const checkPhpPath = path.join(distPath, 'deployment-check.php');
  fs.writeFileSync(checkPhpPath, '<?php echo "Server environment: " . php_uname() . "<br>PHP version: " . phpversion(); ?>');
  console.log('\nCreated deployment-check.php for server verification');
  
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
  console.log('4. Note: Both .json and .js versions of config files are included for maximum compatibility');
  console.log('\nAlternatively, you can set up automatic deployment using Git repositories in cPanel.');
  console.log('\nYour site is now ready for cPanel hosting!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
