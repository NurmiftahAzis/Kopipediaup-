document.addEventListener('DOMContentLoaded', function () {
  const keranjangContainer = document.getElementById('keranjang-container');
  const totalHargaDiv = document.getElementById('total-harga');

  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  if (keranjang.length === 0) {
    keranjangContainer.innerHTML = '<p>Keranjang kamu kosong.</p>';
    totalHargaDiv.textContent = '';
    return;
  }

  let total = 0;

  keranjang.forEach(kopi => {
    const item = document.createElement('div');
    item.className = 'kopi-card';
    item.innerHTML = `
      <img src="${kopi.gambar_url || 'assets/images/about.jpg'}" alt="${kopi.nama}">
      <div class="kopi-card-info">
        <h3>${kopi.nama}</h3>
        <p>Asal: ${kopi.daerah}</p>
        <p>Jumlah: ${kopi.jumlah}</p>
        <button class="hapus-btn fas fa-trash-alt" data-id="${kopi.id}">Hapus</button>
      </div>
    `;

    total += (kopi.jumlah * (kopi.harga || 20000)); // Harga default kalau belum ada

    keranjangContainer.appendChild(item);
  });

  totalHargaDiv.innerHTML = `<h3>Total: Rp ${total.toLocaleString('id-ID')}</h3>`;

  // Hapus item dari keranjang
  keranjangContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('hapus-btn')) {
      const id = e.target.dataset.id;
      keranjang = keranjang.filter(item => item.id !== id);
      localStorage.setItem('keranjang', JSON.stringify(keranjang));
      location.reload(); // refresh halaman
    }
  });
});
