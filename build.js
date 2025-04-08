
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// Run the Vite build
try {
  console.log('Building the project with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
  
  console.log('\nThe website has been built and is ready for deployment.');
  console.log('You can find all the required files in the "dist" folder.');
  console.log('\nFollow these steps to deploy your website:');
  console.log('1. Upload all files from the "dist" folder to your web hosting.');
  console.log('2. Make sure you upload the index.html and all assets folders.');
  console.log('3. If you need to use Google Maps, set your API key in index.html.');
  console.log('\nEnjoy your new website!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
