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
