// Pindahkan fungsi ke luar agar bisa diakses global
function goLogin() {
    window.location.href = "login/index.html";
}

function logout() {
    localStorage.removeItem("username");
    location.reload();
}

// Gunakan DOMContentLoaded hanya untuk logika manipulasi tampilan
document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("username");
    const userInfo = document.getElementById("userInfo");
    const authArea = document.getElementById("authArea");

    if (user && userInfo && authArea) {
        userInfo.innerText = "Halo, " + user;
        authArea.innerHTML = `<button onclick="logout()" class="nav-cta">Logout</button>`;
    }

    window.goLogin = goLogin;
    window.logout = logout;
});