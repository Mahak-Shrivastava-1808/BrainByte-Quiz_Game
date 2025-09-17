<?php
$conn = new mysqli("localhost", "root", "", "quizdb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$usernameOrEmail = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ? OR email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: home.html"); // ✅ Redirect on successful login
        exit;
    } else {
        echo "Incorrect password.";
    }
} else {
    echo "User not found.";
}

$conn->close();
?>