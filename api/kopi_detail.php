<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "kopipedia_db");

if ($conn->connect_error) {
    echo json_encode(["error" => "Koneksi gagal"]);
    exit();
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$stmt = $conn->prepare("SELECT * FROM kopi WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$kopi = $result->fetch_assoc();

if ($kopi) {
    echo json_encode($kopi);
} else {
    echo json_encode(["error" => "Data tidak ditemukan"]);
}
?>