document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validasi input
    if (!username || !password) {
        const alertBox = document.getElementById("alertBox");
        alertBox.innerText = "Username dan Password tidak boleh kosong";
        alertBox.style.display = "block";
        setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000);
        return;
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            // Simpan username ke localStorage
            localStorage.setItem("username", data.username);
            // Redirect ke halaman utama
            window.location.href = "../index.html";
        } else {
            const alertBox = document.getElementById("alertBox");
            alertBox.innerText = data.message || "Username atau Password salah, silahkan coba lagi";
            alertBox.style.display = "block";

            setTimeout(() => {
                alertBox.style.display = "none";
            }, 3000);
        }
    } catch (error) {
        console.error("Error:", error);
        const alertBox = document.getElementById("alertBox");
        alertBox.innerText = "Terjadi kesalahan, silahkan coba lagi";
        alertBox.style.display = "block";

        setTimeout(() => {
            alertBox.style.display = "none";
        }, 3000);
    }
});