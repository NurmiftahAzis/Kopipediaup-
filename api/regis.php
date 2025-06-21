<?php
// Tampilkan error (untuk debugging sementara, nanti bisa dimatikan di production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Pastikan response berupa JSON
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "kopipedia_db");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Koneksi database gagal."]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullname = $_POST['fullname'] ?? '';
    $email = $_POST['email'] ?? '';
    $passwordRaw = $_POST['password'] ?? '';

    if (!$fullname || !$email || !$passwordRaw) {
        echo json_encode(["success" => false, "error" => "Semua field wajib diisi."]);
        exit();
    }

    $password = password_hash($passwordRaw, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $fullname, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Email sudah digunakan atau kesalahan lainnya."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Permintaan tidak valid."]);
}
?>
