document.addEventListener('DOMContentLoaded', function() {

    const kopiListContainer = document.getElementById('kopi-list-container');
    const modal = document.getElementById('kopi-detail-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-btn');

    let allKopiData = [];

    // --- FITUR 1 & 2: Melihat Daftar Kopi & Detailnya ---
    async function fetchKopiList() {
        try {
            const response = await fetch('api/kopi_list.php');
            allKopiData = await response.json();
            
            kopiListContainer.innerHTML = ''; // Kosongkan placeholder
            allKopiData.forEach(kopi => {
                const card = document.createElement('div');
                card.className = 'kopi-card';
                card.dataset.id = kopi.id;
                card.innerHTML = `
                    <img src="${kopi.gambar_url || 'assets/images/about.jpg'}" alt="${kopi.nama}">
                    <div class="kopi-card-info">
                        <h3>${kopi.nama}</h3>
                        <p>${kopi.daerah}</p>
                        <button class="add-to-cart-btn" data-id="${kopi.id}">Tambah ke Keranjang</button>
                    </div>
                `;

                card.addEventListener('click', () => showKopiDetail(kopi.id));
                kopiListContainer.appendChild(card);

                const addToCartBtn = card.querySelector('.add-to-cart-btn');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        tambahKeKeranjang(kopi);
                    });
                }

            });
        }

        catch (error) {
            kopiListContainer.innerHTML = '<p>Gagal memuat data kopi. Silakan coba lagi nanti.</p>';
            console.error('Error fetching coffee list:', error);
        }
    }

    function tambahKeKeranjang(kopi) {
        let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

        const existing = keranjang.find(item => item.id === kopi.id);
        if (existing) {
            existing.jumlah += 1;
        } else {
            keranjang.push({ ...kopi, jumlah: 1 });
        }

        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        alert(`${kopi.nama} ditambahkan ke keranjang!`);
    }


    async function showKopiDetail(id) {
        try {
            const response = await fetch(`api/kopi_detail.php?id=${id}`);
            const kopi = await response.json();
            
            modalBody.innerHTML = `
                <h2>${kopi.nama} (${kopi.daerah})</h2>
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

    if (closeModalBtn) {
        closeModalBtn.onclick = () => modal.style.display = 'none';
    }
    if (modal) {
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
    }
    // Panggil fungsi utama untuk memuat data
    fetchKopiList();

    const form = document.getElementById('loginForm');
    const result = document.getElementById('login-result');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);

      const response = await fetch('loginuser.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = "index.html";
      } else {
        result.textContent = data.error;
      }
    });
});