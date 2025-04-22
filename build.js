
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process for cPanel deployment...');

// Run the Vite build
try {
  console.log('Building the project with Vite...');
  execSync('npm run build:vite', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
  // Ensure .htaccess and fallback.html are copied to dist folder
  console.log('Copying critical files to the dist folder...');
  
  // Copy .htaccess
  try {
    fs.copyFileSync(
      path.join(__dirname, '.htaccess'),
      path.join(__dirname, 'dist', '.htaccess')
    );
    console.log('✓ .htaccess copied successfully');
  } catch (error) {
    console.error('Error copying .htaccess:', error.message);
  }
  
  // Copy fallback.html
  try {
    fs.copyFileSync(
      path.join(__dirname, 'public/fallback.html'),
      path.join(__dirname, 'dist', 'fallback.html')
    );
    console.log('✓ fallback.html copied successfully');
  } catch (error) {
    console.error('Error copying fallback.html:', error.message);
  }
  
  // Copy index.html if not in dist (shouldn't be necessary with proper Vite config)
  if (!fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
    console.log('Copying index.html to dist folder...');
    try {
      fs.copyFileSync(
        path.join(__dirname, 'index.html'),
        path.join(__dirname, 'dist', 'index.html')
      );
      console.log('✓ index.html copied successfully');
    } catch (error) {
      console.error('Error copying index.html:', error.message);
    }
  }
  
  // Verify the build output contains HTML files
  const distPath = path.join(__dirname, 'dist');
  
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('\nVerifying build output: ✓ index.html found');
  } else {
    console.error('\nError: index.html not found in the dist folder!');
    process.exit(1);
  }
  
  if (fs.existsSync(path.join(distPath, 'fallback.html'))) {
    console.log('Verifying build output: ✓ fallback.html found');
  } else {
    console.warn('\nWarning: fallback.html not found in the dist folder. Static fallback page may not be available.');
  }
  
  console.log('\nThe website has been successfully built for cPanel hosting.');
  console.log('You can find all the required files in the "dist" folder.');
  console.log('\nFollow these steps to deploy your website to cPanel:');
  console.log('1. Download the "dist" folder from your build environment');
  console.log('2. Log in to cPanel and use the File Manager to upload ALL files from the "dist" folder to your public_html directory (including .htaccess)');
  console.log('3. Make sure you maintain the folder structure exactly as it is');
  console.log('\nIf your site still shows a blank page, check the cPanel error logs in "Error Log" section of cPanel.');
  console.log('\nYour site is now ready for cPanel hosting!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
