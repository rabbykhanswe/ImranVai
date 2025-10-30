<?php
// --- ADD THESE 3 LINES FOR DEBUGGING ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// -----------------------------------------

// --- 1. DATABASE CONFIGURATION ---
// IMPORTANT: Make sure these details are 100% correct.
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "Kitchen";

// --- 2. CREATE AND CHECK DATABASE CONNECTION ---
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    // If connection fails, send a detailed error.
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Database Connection Failed: ' . $conn->connect_error]);
    die();
}
$conn->set_charset("utf8mb4");

// --- 3. PREPARE RESPONSE ARRAY ---
$response = [];
$formType = isset($_POST['form_type']) ? $_POST['form_type'] : '';

// --- 4. PROCESS THE REVIEW FORM ---
if ($formType === 'review' && $_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $location = htmlspecialchars(trim($_POST['location']));
    $rating = intval($_POST['rating']);
    $reviewText = htmlspecialchars(trim($_POST['reviewText']));
    $photoPath = null;

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            // Try to create the directory if it doesn't exist
            if (!mkdir($targetDir, 0755, true)) {
                $response = ['status' => 'error', 'message' => 'Failed to create uploads directory. Check permissions.'];
                header('Content-Type: application/json');
                echo json_encode($response);
                die();
            }
        }
        $fileName = uniqid() . '_' . basename($_FILES["photo"]["name"]);
        $targetFile = $targetDir . $fileName;

        if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFile)) {
            $photoPath = $targetFile;
        } else {
            $response = ['status' => 'error', 'message' => 'Could not move uploaded file. Check uploads folder permissions.'];
            header('Content-Type: application/json');
            echo json_encode($response);
            die();
        }
    }

    $stmt = $conn->prepare("INSERT INTO reviews (name, location, rating, review_text, photo_path) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $name, $location, $rating, $reviewText, $photoPath);

    if ($stmt->execute()) {
        $response = [
            'status' => 'success',
            'message' => 'Thank you! Your review has been submitted.',
            'review' => [
                'name' => $name,
                'location' => $location,
                'rating' => $rating,
                'review_text' => $reviewText,
                'photo_path' => $photoPath
            ]
        ];
    } else {
        // If execution fails, send the specific database error.
        $response = ['status' => 'error', 'message' => 'Database Execute Error: ' . $stmt->error];
    }
    $stmt->close();
}
// --- 5. PROCESS THE CONTACT FORM ---
elseif ($formType === 'contact' && $_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    $stmt = $conn->prepare("INSERT INTO contact_requests (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        $response = ['status' => 'success', 'message' => 'Thank you! We will get back to you soon.'];
    } else {
        $response = ['status' => 'error', 'message' => 'Database Execute Error: ' . $stmt->error];
    }
    $stmt->close();
}
// --- 6. HANDLE INVALID REQUESTS ---
else {
    $response = ['status' => 'error', 'message' => 'Invalid form submission type.'];
}

// --- 7. CLOSE CONNECTION AND SEND RESPONSE ---
$conn->close();
header('Content-Type: application/json');
echo json_encode($response);
?>