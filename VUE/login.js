window.addEventListener('scroll', function () {
  const navbar = document.querySelector("#navbar nav");
  const loginBtn = document.querySelector(".login-btn");

  if (window.scrollY > 100) {
    navbar.classList.add("navbar-branco");
    loginBtn.classList.add("text-danger");
    loginBtn.classList.remove("text-white");
  } else {
    navbar.classList.remove("navbar-branco");
    loginBtn.classList.remove("text-danger");
    loginBtn.classList.add("text-white");
  }
});

function showRegister() {
  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('registerScreen').classList.remove('d-none');
}
window.showRegister = showRegister
function showLogin() {
  document.getElementById('registerScreen').classList.add('d-none');
  document.getElementById('loginScreen').classList.remove('d-none');
}
window.showLogin = showLogin;

document.getElementById("btnLogin").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  login(username, password)
  window.location.href="/accelair app/index.html"
});