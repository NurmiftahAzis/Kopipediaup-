document.addEventListener('DOMContentLoaded', function () {
    const kopiListContainer = document.getElementById('kopi-list-container');
    const modal = document.getElementById('kopi-detail-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-btn');

    let allKopiData = [];

    // --- AMBIL DAFTAR KOPI ---
    async function fetchKopiList() {
        try {
            const response = await fetch('api/kopi_list.php');
            allKopiData = await response.json();

            kopiListContainer.innerHTML = '';
            allKopiData.forEach(kopi => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.dataset.id = kopi.id;
                card.innerHTML = `
                    <img src="${kopi.gambar_url || 'assets/images/about.jpg'}" alt="${kopi.nama}">
                    <h3>${kopi.nama}</h3>
                    <p class="price">Rp ${kopi.harga}</p>
                    <a href="javascript:void(0)" class="btn btn-secondary lihat-detail">Lihat Detail</a>
                `;
                card.querySelector('.lihat-detail').addEventListener('click', () => showKopiDetail(kopi.id));
                kopiListContainer.appendChild(card);
            });
        } catch (error) {
            kopiListContainer.innerHTML = '<p>Gagal memuat daftar kopi.</p>';
            console.error('Error fetching coffee list:', error);
        }
    }

    // --- TAMPILKAN DETAIL KOPI ---
    async function showKopiDetail(id) {
        try {
            const response = await fetch(`api/kopi_detail.php?id=${id}`);
            const kopi = await response.json();

            modalBody.innerHTML = `
                <h2>${kopi.nama}</h2>
                <img src="${kopi.gambar_url || 'assets/images/about.jpg'}" alt="${kopi.nama}" style="width:100%; border-radius: 8px;">
                <h3>Deskripsi</h3>
                <p>${kopi.deskripsi}</p>
            `;
            modal.style.display = 'block';
        } catch (error) {
            modalBody.innerHTML = '<p>Gagal memuat detail kopi.</p>';
            console.error('Error fetching coffee detail:', error);
        }
    }

    // --- TUTUP MODAL ---
    closeModalBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // --- PANGGIL FUNGSI SAAT HALAMAN DIMUAT ---
    fetchKopiList();
});
