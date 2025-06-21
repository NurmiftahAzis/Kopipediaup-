<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "kopipedia_db");

if ($conn->connect_error) {
    echo json_encode(["error" => "Koneksi gagal ke database"]);
    exit();
}

// Eksekusi query
$query = "SELECT * FROM kopi";
$result = $conn->query($query);

// Cek apakah query berhasil
if (!$result) {
    echo json_encode(["error" => "Query gagal: " . $conn->error]);
    exit();
}

$kopiList = [];

while ($row = $result->fetch_assoc()) {
    $kopiList[] = $row;
}

echo json_encode($kopiList);
?>