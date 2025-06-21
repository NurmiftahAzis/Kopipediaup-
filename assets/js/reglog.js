document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const registerResult = document.getElementById('register-result');
    const loginForm = document.getElementById('loginForm');
    const loginResult = document.getElementById('login-result');

    // Handle registrasi
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const response = await fetch('../api/regis.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                registerResult.textContent = "Pendaftaran berhasil! Silakan login.";
                registerResult.style.color = "green";
                registerForm.reset();

                setTimeout(() => {
                    window.location.href = "login.html"; // redirect ke halaman login
                }, 2000); // redirect setelah 2 detik
            } else {
                registerResult.textContent = data.error || "Gagal mendaftar.";
                registerResult.style.color = "red";
            }
        });
    }

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const response = await fetch('../api/loginuser.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "index.html"; // redirect ke halaman utama
            } else {
                loginResult.textContent = data.error || "Login gagal.";
                loginResult.style.color = "red";
            }
        });
    }
});
