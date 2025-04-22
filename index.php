<?php
// If the request is for a specific file with extension, serve it directly
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json)$/i', $_SERVER['REQUEST_URI'])) {
    return false; // Let the server handle the request
}

// Otherwise, serve index.html for any other route (SPA handling)
include_once('index.html');
?>
