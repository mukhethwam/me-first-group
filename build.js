
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process for web deployment...');

// Run the Vite build
try {
  console.log('Building the project with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
  // Verify the build output
  const distPath = path.join(__dirname, 'dist');
  
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('\nVerifying build output: ✓ index.html found');
    
    // Check for JS files
    const assets = fs.readdirSync(path.join(distPath, 'assets'));
    const jsFiles = assets.filter(file => file.endsWith('.js'));
    
    if (jsFiles.length > 0) {
      console.log(`\nVerifying JS files: ✓ Found ${jsFiles.length} JavaScript files`);
    } else {
      console.error('\nError: No JavaScript files found in the assets folder!');
      process.exit(1);
    }
    
    // Copy .htaccess to dist folder
    if (fs.existsSync('.htaccess')) {
      fs.copyFileSync('.htaccess', path.join(distPath, '.htaccess'));
      console.log('\nCopied .htaccess file to dist folder');
    }
    
    console.log('\nThe website has been successfully built for web hosting.');
    console.log('You can find all the required files in the "dist" folder.');
  } else {
    console.error('\nError: index.html not found in the dist folder!');
    process.exit(1);
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
