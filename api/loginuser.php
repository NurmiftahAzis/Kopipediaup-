<?php
session_start();
$conn = new mysqli("localhost", "root", "", "kopipedia_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, fullname, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['fullname'] = $user['fullname'];
            $_SESSION['email'] = $user['email'];

            // Simpan waktu login
            $loginTime = date('Y-m-d H:i:s');
            $logStmt = $conn->prepare("INSERT INTO user_logins (user_id, login_time) VALUES (?, ?)");
            $logStmt->bind_param("is", $user['id'], $loginTime);
            $logStmt->execute();

            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Password salah."]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Akun tidak ditemukan."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Permintaan tidak valid."]);
}
?>
