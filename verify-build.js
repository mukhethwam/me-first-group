
const fs = require('fs');
const path = require('path');

// Paths to check
const requiredFiles = [
  'dist/index.html',
  'dist/assets',
  'dist/fallback.html',
  'dist/.htaccess'
];

let allFilesExists = true;

console.log('Verifying build output...\n');

// Check if dist folder exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.error('❌ dist folder not found! Build may have failed.');
  process.exit(1);
}

// Check required files
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
    
    // If it's the assets directory, check if it has content
    if (file === 'dist/assets') {
      const assetFiles = fs.readdirSync(path.join(__dirname, file));
      if (assetFiles.length === 0) {
        console.warn(`⚠️ ${file} directory is empty!`);
      } else {
        console.log(`   Found ${assetFiles.length} files in assets folder`);
      }
    }
  } else {
    console.error(`❌ ${file} MISSING!`);
    allFilesExists = false;
  }
});

if (allFilesExists) {
  console.log('\n✅ All required files exist for deployment.');
  console.log('Your build is ready to be deployed to cPanel or other hosting service.');
} else {
  console.error('\n❌ Some required files are missing!');
  console.error('Please fix the build issues before deploying.');
  process.exit(1);
}
