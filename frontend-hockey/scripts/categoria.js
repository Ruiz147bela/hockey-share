document.addEventListener("DOMContentLoaded", () => {
  cargarNavbar();
  cargarCategoria();
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
    });
}

function logout() {
  localStorage.removeItem("usuario");
  location.reload();
}

function cargarCategoria() {
  const tipo = new URLSearchParams(window.location.search).get("tipo");
  document.getElementById("categoria-header").textContent =
    "Categoría: " + tipo.charAt(0).toUpperCase() + tipo.slice(1);

  const grid = document.getElementById("categoria-grid");

  fetch(`http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com/implementos?tipo=${tipo}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        grid.innerHTML = "<p>No se encontraron implementos en esta categoría.</p>";
        return;
      }

      data.forEach(item => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <h4>${item.nombre}</h4>
          <p>${item.descripcion}</p>
          <p><strong>Club:</strong> ${item.club}</p>
          <p><strong>Pista:</strong> ${item.pista}</p>
          <div class="stars">${'⭐'.repeat(item.estado)}${'☆'.repeat(5 - item.estado)}</div>
        `;
        div.addEventListener("click", () => {
          const nombre = encodeURIComponent(item.nombre);
          window.location.href = `detalle.html?nombre=${nombre}`;
        });
        grid.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = "<p>Error al cargar los implementos.</p>";
    });
}
