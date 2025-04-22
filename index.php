
<?php
// Enable detailed error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set higher timeout limits
ini_set('max_execution_time', 300);
ini_set('memory_limit', '256M');

// Log access for debugging
$logFile = __DIR__ . '/php-access.log';
$logMessage = date('Y-m-d H:i:s') . ' - Accessed: ' . $_SERVER['REQUEST_URI'] . ' - IP: ' . $_SERVER['REMOTE_ADDR'] . "\n";
@file_put_contents($logFile, $logMessage, FILE_APPEND);

// If the request is for a specific file with extension, serve it directly
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/i', $_SERVER['REQUEST_URI'])) {
    return false; // Let the server handle the request
}

// Otherwise, serve index.html for any other route (SPA handling)
include_once('index.html');
?>
