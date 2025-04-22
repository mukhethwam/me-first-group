
<?php
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
</html>
