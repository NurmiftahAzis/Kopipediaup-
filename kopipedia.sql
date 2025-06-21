CREATE DATABASE IF NOT EXISTS kopipedia_db;
USE kopipedia_db;

CREATE TABLE kopi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    harga INT,
    gambar_url VARCHAR(255)
);

INSERT INTO kopi (nama, deskripsi, harga, gambar_url) VALUES
('Kopi Aceh Gayo', 'Nikmati perpaduan rasa yang kaya dengan sentuhan floral, fruity, dan sedikit rempah, serta keasaman yang cerah dan body yang medium.', 85000, 'assets/images/gayo.jpg'),
('Kopi Flores Bajawa', 'Kopi Flores Bajawa adalah salah satu permata tersembunyi dari kekayaan kopi Indonesia, berasal dari dataran tinggi vulkanik Bajawa, Kabupaten Ngada, di Pulau Flores, Nusa Tenggara Timur.', 88000, 'assets/images/flores.jpg'),
('Kopi Sumatra', 'Kopi Sumatera adalah salah satu kopi yang paling diakui dan dicari di dunia, terkenal dengan profil rasa yang kuat, tebal (full-bodied), dan kompleks.', 90000, 'assets/images/SumatraCoffee.jpg'),
('Kopi Luwak', 'Kopi Luwak adalah perpaduan sempurna antara alam, proses unik, dan cita rasa yang tak tertandingi, menjadikannya salah satu minuman kopi paling dicari di dunia.', 80000, 'assets/images/KopiLuwak.jpg'),
('Kopi Bali Kintamani', 'Kopi Arabika Kintamani Bali menawarkan pengalaman minum yang kompleks dan menyegarkan, dengan perpaduan rasa buah yang unik dan keasaman rendah yang menjadi daya tarik utamanya.', 95000, 'assets/images/bali.jpg');

CREATE TABLE keranjang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    kopi_id INT,
    jumlah INT,
    tanggal_ditambahkan DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (kopi_id) REFERENCES kopi(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type VARCHAR(50),
    activity_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);