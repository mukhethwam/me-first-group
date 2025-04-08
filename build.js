
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// Run the Vite build
try {
  console.log('Building the project with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
  // Verify the build output contains HTML files
  const distPath = path.join(__dirname, 'dist');
  
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('\nVerifying build output: ✓ index.html found');
  } else {
    console.error('\nError: index.html not found in the dist folder!');
    process.exit(1);
  }
  
  console.log('\nThe website has been successfully built for HTML hosting.');
  console.log('You can find all the required files in the "dist" folder.');
  console.log('\nFollow these steps to deploy your website:');
  console.log('1. Upload ALL files from the "dist" folder to your web hosting.');
  console.log('2. Make sure you maintain the folder structure exactly as it is.');
  console.log('3. If you need to use Google Maps, set your API key in index.html.');
  console.log('\nYour site is now ready for standard HTML hosting!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
