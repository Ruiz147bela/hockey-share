const BACKEND_URL = "http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com";

document.addEventListener("DOMContentLoaded", () => {
  cargarNavbar();
});

function cargarNavbar() {
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
    });
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("error-msg");

  if (!username || !password) {
    errorDiv.textContent = "Por favor completa todos los campos.";
    errorDiv.style.display = "block";
    return;
  }

  fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: username, password: password })
  })
  .then(res => {
    if (!res.ok) throw new Error("Credenciales inválidas");
    return res.json();
  })
  .then(data => {
    localStorage.setItem("usuario", data.nombre);
    localStorage.setItem("usuario_id", data.id);  // útil para reseñas y nuevo.html
    localStorage.setItem("rol", data.rol);
    window.location.href = "index.html";
  })
  .catch(err => {
    errorDiv.textContent = err.message;
    errorDiv.style.display = "block";
  });
}
