<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- 1. CONFIGURATION ---
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'admin123'); 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Kitchen";

// --- 2. DATABASE CONNECTION ---
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed.']);
    die();
}
$conn->set_charset("utf8mb4");

// --- 3. HELPER FUNCTIONS ---
function check_session() {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        return false;
    }
    return true;
}

function send_json($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    die();
}

// --- 4. ROUTING BASED ON 'action' ---
$action = isset($_POST['action']) ? $_POST['action'] : '';

switch ($action) {
    case 'login':
        handle_login();
        break;
    case 'logout':
        handle_logout();
        break;
    case 'fetch_data':
        handle_fetch_data();
        break;
    case 'delete':
        handle_delete();
        break;
    case 'update_gallery_item':
        handle_gallery_upload();
        break;
    default:
        send_json(['status' => 'error', 'message' => 'Invalid action.']);
}

// --- 5. ACTION HANDLERS ---

function handle_login() {
    $user = isset($_POST['username']) ? $_POST['username'] : '';
    $pass = isset($_POST['password']) ? $_POST['password'] : '';

    if ($user === ADMIN_USERNAME && $pass === ADMIN_PASSWORD) {
        $_SESSION['loggedin'] = true;
        send_json(['status' => 'success']);
    } else {
        send_json(['status' => 'error', 'message' => 'Invalid username or password.']);
    }
}

function handle_logout() {
    session_unset();
    session_destroy();
    send_json(['status' => 'success']);
}

function handle_fetch_data() {
    global $conn;
    if (!check_session()) {
        send_json(['status' => 'error', 'message' => 'Not authenticated.']);
    }

    $response = ['status' => 'success', 'requests' => [], 'reviews' => [], 'gallery' => []];

    $result = $conn->query("SELECT * FROM contact_requests ORDER BY submission_date DESC");
    while ($row = $result->fetch_assoc()) {
        $response['requests'][] = $row;
    }

    $result = $conn->query("SELECT * FROM reviews ORDER BY submission_date DESC");
    while ($row = $result->fetch_assoc()) {
        $response['reviews'][] = $row;
    }

    $result = $conn->query("SELECT item_key, media_path FROM site_gallery");
    while ($row = $result->fetch_assoc()) {
        $response['gallery'][$row['item_key']] = $row['media_path'];
    }

    send_json($response);
}

function handle_delete() {
    global $conn;
    if (!check_session()) {
        send_json(['status' => 'error', 'message' => 'Not authenticated.']);
    }

    $id = intval($_POST['id']);
    $type = $_POST['type'];
    $table_name = '';

    if ($type === 'request') {
        $table_name = 'contact_requests';
    } elseif ($type === 'review') {
        // --- ADDED: Delete review photo from server ---
        $table_name = 'reviews';
        $stmt_find = $conn->prepare("SELECT photo_path FROM reviews WHERE id = ?");
        $stmt_find->bind_param("i", $id);
        if ($stmt_find->execute()) {
            $result = $stmt_find->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (!empty($row['photo_path']) && file_exists($row['photo_path'])) {
                    unlink($row['photo_path']); // Delete the file
                }
            }
        }
        $stmt_find->close();
        // --- END OF ADDITION ---
    }

    if ($table_name && $id > 0) {
        $stmt = $conn->prepare("DELETE FROM $table_name WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            send_json(['status' => 'success', 'message' => ucfirst($type) . ' deleted successfully.']);
        } else {
            send_json(['status' => 'error', 'message' => 'Failed to delete.']);
        }
        $stmt->close();
    } else {
        send_json(['status' => 'error', 'message' => 'Invalid ID or type.']);
    }
}

// --- !! THIS FUNCTION IS COMPLETELY UPDATED !! ---
function handle_gallery_upload() {
    global $conn;
    if (!check_session()) {
        send_json(['status' => 'error', 'message' => 'Not authenticated.']);
    }

    $item_key = isset($_POST['item_key']) ? $_POST['item_key'] : '';
    if (empty($item_key) || !isset($_FILES['media_file'])) {
        send_json(['status' => 'error', 'message' => 'Missing data.']);
    }

    $file = $_FILES['media_file'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        send_json(['status' => 'error', 'message' => 'File upload error.']);
    }

    // --- 1. GET OLD PATH FROM DB TO DELETE IT ---
    $old_path = null;
    $stmt_find = $conn->prepare("SELECT media_path FROM site_gallery WHERE item_key = ?");
    $stmt_find->bind_param("s", $item_key);
    if ($stmt_find->execute()) {
        $result = $stmt_find->get_result();
        if ($result->num_rows > 0) {
            $old_path = $result->fetch_assoc()['media_path'];
        }
    }
    $stmt_find->close();

    // --- 2. DEFINE NEW PATH AND FILENAME ---
    // We assume 'admin_access.php' is in the root with 'media/'.
    // If it's in an 'admin/' folder, change 'media/' to '../media/'.
    $targetDir = "media/"; 
    
    $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = $item_key . '_' . time() . '.' . $fileExtension;
    $targetFile = $targetDir . $fileName; // Full server path to save
    $publicPath = "media/" . $fileName;  // Path to store in DB

    // --- 3. MOVE NEW FILE ---
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        
        // --- 4. DELETE OLD FILE (if it exists and is different) ---
        if ($old_path && $old_path !== $publicPath && file_exists($old_path)) {
            unlink($old_path); // Delete the old file
        }

        // --- 5. UPDATE DATABASE ---
        $stmt = $conn->prepare("UPDATE site_gallery SET media_path = ? WHERE item_key = ?");
        $stmt->bind_param("ss", $publicPath, $item_key);
        
        if ($stmt->execute()) {
            send_json(['status' => 'success', 'message' => "$item_key updated!", 'new_path' => $publicPath]);
        } else {
            send_json(['status' => 'error', 'message' => 'Database update failed.']);
        }
        $stmt->close();

    } else {
        send_json(['status' => 'error', 'message' => 'Failed to move uploaded file. Check folder permissions.']);
    }
}

// --- 6. CLOSE CONNECTION ---
$conn->close();
?>