<?php
// Configuration
$botToken = '7991709198:AAG_8HnC2YO8rhUYZbO2thYvJ5fI-jBDocc'; // Replace with your Telegram bot token
$chatId = '6612577683'; // Replace with your chat ID

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');


// Set JSON content type and CORS headers for all responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Method not allowed']));
}

// Verify request origin
$allowedOrigins = [
    'http://chames.youssef.tn',
    'https://chames.youssef.tn',
    'http://www.chames.youssef.tn',
    'https://www.chames.youssef.tn'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// If origin is in allowed list, set it specifically for better security
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    http_response_code(403);
    die(json_encode(['success' => false, 'error' => 'Forbidden']));
}

// Get and validate form data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

if (!$name || !$email || !$subject || !$message) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'Invalid input']));
}

// Prepare message for Telegram
$telegramMessage = "New Contact Form Message\n\n"
    . "Name: $name\n"
    . "Email: $email\n"
    . "Subject: $subject\n\n"
    . "Message:\n$message";

// Send to Telegram
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$data = array(
    'chat_id' => $chatId,
    'text' => $telegramMessage,
    'parse_mode' => 'HTML'
);

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded']
]);

// Execute the request
$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for errors
if ($result === false) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Error sending message: ' . $error]));
}

curl_close($ch);

// Check response
$response = json_decode($result, true);
if ($httpCode !== 200 || !isset($response['ok']) || !$response['ok']) {
    http_response_code(500);
    $errorMessage = isset($response['description']) ? $response['description'] : 'Unknown error';
    die(json_encode(['success' => false, 'error' => 'Telegram API error: ' . $errorMessage]));
}

// Send success response
echo json_encode(['success' => true]);
?>
