

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