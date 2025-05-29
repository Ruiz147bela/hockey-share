const BACKEND_URL = "http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com";

document.addEventListener("DOMContentLoaded", () => {
  cargarNavbar();
  cargarNuevosImplementos();
});

function cargarNavbar() {
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
      const username = localStorage.getItem("usuario");
      const userNav = document.getElementById("user-nav");
      if (userNav) {
        if (username) {
          userNav.innerHTML = `👤 ${username}
            <a href="nuevo.html" style="margin-left:1rem; color:#b71c1c; font-weight:bold;">+ Nuevo</a>
            <a href="#" onclick="logout()" style="margin-left:1rem; color:#b71c1c;">Cerrar sesión</a>`;
        } else {
          userNav.innerHTML = `<a href="login.html" style="color:#b71c1c; font-weight:bold;">Login</a>`;
        }
      }
    })
    .catch(err => {
      console.error("Error al cargar navbar:", err);
    });
}

function logout() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("usuario_id");
  localStorage.removeItem("rol");
  location.reload();
}

function goToDetalle(nombre) {
  const encoded = encodeURIComponent(nombre);
  window.location.href = `detalle.html?nombre=${encoded}`;
}

function scrollLeft(id) {
  document.getElementById(id).scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight(id) {
  document.getElementById(id).scrollBy({ left: 300, behavior: 'smooth' });
}

function cargarNuevosImplementos() {
  const track = document.querySelector(".carousel-track");

  fetch(`${BACKEND_URL}/implementos`)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo obtener la lista de implementos");
      return res.json();
    })
    .then(implementos => {
      if (!implementos.length) {
        track.innerHTML = "<p>No hay implementos disponibles en este momento.</p>";
        return;
      }

      // Mostrar los últimos 5
      track.innerHTML = "";
      implementos.slice(-5).reverse().forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${item.nombre}</h3>
          <p>Estado: ${"⭐".repeat(item.estado)}</p>
        `;
        div.addEventListener("click", () => goToDetalle(item.nombre));
        track.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error al cargar implementos:", err);
      track.innerHTML = "<p style='color:red;'>Error al cargar los implementos. Intenta más tarde.</p>";
    });
}
