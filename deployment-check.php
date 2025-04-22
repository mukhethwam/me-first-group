
<?php
// Enable detailed error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set header to HTML
header("Content-Type: text/html");

// Function to check if a service is available
function check_service($name, $host, $port) {
    $start = microtime(true);
    $connection = @fsockopen($host, $port, $errno, $errstr, 5);
    $end = microtime(true);
    $status = $connection ? 'Available' : 'Unavailable';
    $time = $connection ? round(($end - $start) * 1000, 2) . ' ms' : 'Timeout';
    if ($connection) {
        fclose($connection);
    }
    return ['name' => $name, 'status' => $status, 'time' => $time, 'error' => $errstr];
}

// Function to get file permissions in human-readable format
function get_permissions($file) {
    if (!file_exists($file)) {
        return 'File not found';
    }
    $perms = fileperms($file);
    
    $info = '';
    
    // Owner
    $info .= (($perms & 0x0100) ? 'r' : '-');
    $info .= (($perms & 0x0080) ? 'w' : '-');
    $info .= (($perms & 0x0040) ? (($perms & 0x0800) ? 's' : 'x' ) : (($perms & 0x0800) ? 'S' : '-'));
    
    // Group
    $info .= (($perms & 0x0020) ? 'r' : '-');
    $info .= (($perms & 0x0010) ? 'w' : '-');
    $info .= (($perms & 0x0008) ? (($perms & 0x0400) ? 's' : 'x' ) : (($perms & 0x0400) ? 'S' : '-'));
    
    // World
    $info .= (($perms & 0x0004) ? 'r' : '-');
    $info .= (($perms & 0x0002) ? 'w' : '-');
    $info .= (($perms & 0x0001) ? (($perms & 0x0200) ? 't' : 'x' ) : (($perms & 0x0200) ? 'T' : '-'));
    
    return $info;
}

// Check server load
function get_server_load() {
    if (function_exists('sys_getloadavg')) {
        $load = sys_getloadavg();
        return $load[0];
    }
    return 'Unknown';
}

// Get server memory usage
function get_server_memory_usage() {
    if (function_exists('memory_get_usage')) {
        return round(memory_get_usage() / 1024 / 1024, 2) . ' MB';
    }
    return 'Unknown';
}

// Get disk free space
function get_disk_free_space() {
    $free_space = disk_free_space('/');
    if ($free_space === false) {
        return 'Unknown';
    }
    return round($free_space / 1024 / 1024 / 1024, 2) . ' GB';
}

// Check if mod_rewrite is enabled
function is_mod_rewrite_enabled() {
    if (function_exists('apache_get_modules')) {
        $modules = apache_get_modules();
        return in_array('mod_rewrite', $modules) ? 'Enabled' : 'Disabled';
    }
    return 'Unknown';
}

// Function to test file write permissions
function test_file_write() {
    $test_file = 'write-test-' . time() . '.txt';
    $result = @file_put_contents($test_file, 'Test write');
    if ($result !== false) {
        unlink($test_file);
        return 'Writable';
    }
    return 'Not writable';
}

// Perform essential service checks
$services = [
    check_service('Web Server', 'localhost', 80),
    check_service('DNS', '8.8.8.8', 53),
    check_service('External Connection', 'google.com', 80)
];

// Files to check
$files_to_check = [
    'index.html',
    'index.php',
    '.htaccess',
    'assets/index.js',
    'assets/index.css',
    'fallback.js',
    '503-error.html'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Me First Group - Deployment Diagnostics</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 900px; margin: 0 auto; }
        h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
        .section { background: #f4f4f4; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .success { color: green; }
        .warning { color: orange; }
        .error { color: red; }
        code { background: #e9e9e9; padding: 2px 5px; border-radius: 3px; font-family: monospace; }
        pre { background: #e9e9e9; padding: 10px; border-radius: 5px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .action-buttons { margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 15px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px; }
        .btn:hover { background: #0069d9; }
    </style>
</head>
<body>
    <h1>Me First Group Website - Deployment Diagnostics</h1>
    
    <div class="section">
        <h2>Server Information</h2>
        <table>
            <tr>
                <td>PHP Version</td>
                <td><?php echo phpversion(); ?></td>
            </tr>
            <tr>
                <td>Server Software</td>
                <td><?php echo $_SERVER['SERVER_SOFTWARE']; ?></td>
            </tr>
            <tr>
                <td>Document Root</td>
                <td><?php echo $_SERVER['DOCUMENT_ROOT']; ?></td>
            </tr>
            <tr>
                <td>Request URI</td>
                <td><?php echo $_SERVER['REQUEST_URI']; ?></td>
            </tr>
            <tr>
                <td>Server Load</td>
                <td><?php echo get_server_load(); ?></td>
            </tr>
            <tr>
                <td>Memory Usage</td>
                <td><?php echo get_server_memory_usage(); ?></td>
            </tr>
            <tr>
                <td>Disk Free Space</td>
                <td><?php echo get_disk_free_space(); ?></td>
            </tr>
            <tr>
                <td>mod_rewrite</td>
                <td><?php echo is_mod_rewrite_enabled(); ?></td>
            </tr>
            <tr>
                <td>Directory Write Permissions</td>
                <td><?php echo test_file_write(); ?></td>
            </tr>
        </table>
    </div>
    
    <div class="section">
        <h2>Essential Services Check</h2>
        <table>
            <tr>
                <th>Service</th>
                <th>Status</th>
                <th>Response Time</th>
                <th>Error (if any)</th>
            </tr>
            <?php foreach ($services as $service): ?>
            <tr>
                <td><?php echo $service['name']; ?></td>
                <td class="<?php echo $service['status'] === 'Available' ? 'success' : 'error'; ?>">
                    <?php echo $service['status']; ?>
                </td>
                <td><?php echo $service['time']; ?></td>
                <td><?php echo $service['error']; ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
    
    <div class="section">
        <h2>Critical Files Check</h2>
        <table>
            <tr>
                <th>File</th>
                <th>Status</th>
                <th>Size</th>
                <th>Permissions</th>
                <th>Last Modified</th>
            </tr>
            <?php foreach ($files_to_check as $file): ?>
            <tr>
                <td><?php echo $file; ?></td>
                <?php if (file_exists($file)): ?>
                    <td class="success">Found</td>
                    <td><?php echo round(filesize($file) / 1024, 2); ?> KB</td>
                    <td><code><?php echo get_permissions($file); ?></code></td>
                    <td><?php echo date("Y-m-d H:i:s", filemtime($file)); ?></td>
                <?php else: ?>
                    <td class="error" colspan="4">Missing</td>
                <?php endif; ?>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
    
    <div class="section">
        <h2>PHP Configuration</h2>
        <table>
            <tr>
                <th>Setting</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>max_execution_time</td>
                <td><?php echo ini_get('max_execution_time'); ?> seconds</td>
            </tr>
            <tr>
                <td>memory_limit</td>
                <td><?php echo ini_get('memory_limit'); ?></td>
            </tr>
            <tr>
                <td>post_max_size</td>
                <td><?php echo ini_get('post_max_size'); ?></td>
            </tr>
            <tr>
                <td>upload_max_filesize</td>
                <td><?php echo ini_get('upload_max_filesize'); ?></td>
            </tr>
            <tr>
                <td>display_errors</td>
                <td><?php echo ini_get('display_errors') ? 'On' : 'Off'; ?></td>
            </tr>
            <tr>
                <td>allow_url_fopen</td>
                <td><?php echo ini_get('allow_url_fopen') ? 'On' : 'Off'; ?></td>
            </tr>
        </table>
    </div>
    
    <div class="section">
        <h2>Error Log Check</h2>
        <?php
        $error_log = ini_get('error_log');
        if ($error_log && file_exists($error_log) && is_readable($error_log)) {
            $log_content = file_get_contents($error_log);
            $recent_errors = array_slice(explode("\n", $log_content), -20);
            echo "<p>Most recent entries from error log:</p>";
            echo "<pre>";
            foreach ($recent_errors as $error) {
                if (trim($error)) echo htmlspecialchars($error) . "\n";
            }
            echo "</pre>";
        } else {
            echo "<p class='warning'>Error log not accessible or not set.</p>";
            
            // Check for access to app error logs in common locations
            $possible_logs = [
                'php-errors.log',
                'error_log',
                '../logs/error_log',
                '../logs/php-errors.log'
            ];
            
            foreach ($possible_logs as $log) {
                if (file_exists($log) && is_readable($log)) {
                    echo "<p>Found log file: $log</p>";
                    $log_content = file_get_contents($log);
                    $recent_errors = array_slice(explode("\n", $log_content), -10);
                    echo "<pre>";
                    foreach ($recent_errors as $error) {
                        if (trim($error)) echo htmlspecialchars($error) . "\n";
                    }
                    echo "</pre>";
                    break;
                }
            }
        }
        ?>
        
        <h3>PHP Access Log</h3>
        <?php
        $access_log = __DIR__ . '/php-access.log';
        if (file_exists($access_log) && is_readable($access_log)) {
            $log_content = file_get_contents($access_log);
            $recent_entries = array_slice(explode("\n", $log_content), -10);
            echo "<pre>";
            foreach ($recent_entries as $entry) {
                if (trim($entry)) echo htmlspecialchars($entry) . "\n";
            }
            echo "</pre>";
        } else {
            echo "<p class='warning'>PHP access log not yet created or not accessible.</p>";
        }
        ?>
    </div>
    
    <div class="section">
        <h2>Environment Information</h2>
        <p>The following information can help with debugging:</p>
        <pre><?php print_r($_SERVER); ?></pre>
    </div>
    
    <div class="section">
        <h2>Next Steps for 503 Service Unavailable Errors</h2>
        <ol>
            <li>Check the error logs above for specific PHP or server errors</li>
            <li>Verify that your .htaccess file has the correct settings</li>
            <li>Ensure all files have proper permissions (644 for files, 755 for directories)</li>
            <li>Check if your hosting account has resource limitations (CPU, memory)</li>
            <li>Contact your hosting provider with the information on this page</li>
        </ol>
        
        <div class="action-buttons">
            <a href="/" class="btn">Return to Homepage</a>
            <a href="/deployment-check.php?refresh=<?php echo time(); ?>" class="btn">Refresh Diagnostics</a>
        </div>
    </div>
    
    <footer style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ccc; text-align: center;">
        <p>Me First Group Website - Deployment Diagnostic Tool</p>
    </footer>
    
    <script>
        document.getElementById('script-test-result').innerHTML = '<span class="success">JavaScript is working correctly</span>';
    </script>
</body>
</html>
