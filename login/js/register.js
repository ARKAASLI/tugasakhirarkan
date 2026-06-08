document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validasi input
    if (!username || !email || !password) {
        const message = document.getElementById("message");
        message.innerText = "Semua field harus diisi";
        message.style.display = "block";
        message.style.color = "#ff4e4e";
        return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const message = document.getElementById("message");
        message.innerText = "Format email tidak valid";
        message.style.display = "block";
        message.style.color = "#ff4e4e";
        return;
    }

    // Validasi panjang password
    if (password.length < 3) {
        const message = document.getElementById("message");
        message.innerText = "Password minimal 3 karakter";
        message.style.display = "block";
        message.style.color = "#ff4e4e";
        return;
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            const message = document.getElementById("message");
            message.innerText = "Registrasi berhasil! Silakan login";
            message.style.color = "#22c55e";
            message.style.display = "block";
            
            // Reset form
            document.getElementById("registerForm").reset();
            
            // Redirect ke login setelah 2 detik
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            const message = document.getElementById("message");
            message.innerText = data.message || "Username atau email sudah terdaftar";
            message.style.display = "block";
            message.style.color = "#ff4e4e";
        }
    } catch (error) {
        console.error("Error:", error);
        const message = document.getElementById("message");
        message.innerText = "Terjadi kesalahan, silahkan coba lagi";
        message.style.display = "block";
        message.style.color = "#ff4e4e";
    }
});