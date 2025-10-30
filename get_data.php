<?php
// --- 1. DATABASE CONFIGURATION ---
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "Kitchen";

// --- 2. CREATE AND CHECK DATABASE CONNECTION ---
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Database Connection Failed']);
    die();
}
$conn->set_charset("utf8mb4");

// --- 3. FETCH GALLERY DATA ---
$response = ['status' => 'success', 'gallery' => []];
$gallery_data = [];

$result = $conn->query("SELECT item_key, media_path FROM site_gallery");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $gallery_data[$row['item_key']] = $row['media_path'];
    }
    $response['gallery'] = $gallery_data;
} else {
    $response['status'] = 'error';
    $response['message'] = 'Could not fetch gallery data.';
}

// --- 4. CLOSE CONNECTION AND SEND RESPONSE ---
$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>