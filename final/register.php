<?php
// PHP errors show karne ke liye (troubleshooting)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$host = "localhost";
$dbname = "quizdb";
$username = "root";   // Default XAMPP username
$password = "";       // Default XAMPP password is blank

// Database connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get form data from POST
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$user = $_POST['username'];
$pass = $_POST['password'];

// Validate input (optional: add more checks)
if (empty($fullname) || empty($email) || empty($user) || empty($pass)) {
  die("All fields are required.");
}

// Hash the password before storing
$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

// Prepare SQL statement to insert user
$stmt = $conn->prepare("INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $fullname, $email, $user, $hashedPassword);

// Execute and check result
if ($stmt->execute()) {
  echo "<h2>Registration Successful!</h2>";
  echo "<p><a href='login.html'>Click here to login</a></p>";
} else {
  echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>