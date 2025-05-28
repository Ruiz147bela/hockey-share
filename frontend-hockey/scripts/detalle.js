const nombre = decodeURIComponent(new URLSearchParams(window.location.search).get("nombre"));
let implementoId = null;

document.addEventListener("DOMContentLoaded", () => {
  cargarNavbar();
  cargarImplemento();
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

function cargarImplemento() {
  fetch(`http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com/implementos/${nombre}`)
    .then(res => res.json())
    .then(item => {
      implementoId = item.id;
      document.getElementById("nombre").textContent = item.nombre;
      document.getElementById("desc").textContent = item.descripcion;
      document.getElementById("club").textContent = item.club;
      document.getElementById("pista").textContent = item.pista;
      document.getElementById("main-img").src = item.imagen_url;
      document.getElementById("stars").textContent = "⭐".repeat(item.estado) + "☆".repeat(5 - item.estado);
      cargarResenas();
    });
}

function cargarResenas() {
  if (!implementoId) return;
  fetch(`http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com/resenas?id_implemento=${implementoId}`)
    .then(res => res.json())
    .then(resenas => {
      const contenedor = document.getElementById("comentarios-publicados");
      contenedor.innerHTML = "";
      resenas.forEach(r => {
        const div = document.createElement("div");
        div.className = "comment-item";
        div.textContent = r.contenido;
        contenedor.appendChild(div);
      });
    });
}

function publicarComentario() {
  const texto = document.getElementById("comentario").value.trim();
  if (!texto || !implementoId) return;

  fetch("http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com/resenas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_implemento: implementoId,
      id_usuario: 1,  // Reemplazar luego con ID real del usuario autenticado
      contenido: texto
    })
  }).then(() => {
    document.getElementById("comentario").value = "";
    cargarResenas();
  });
}

function goToDetalle(nombre) {
  window.location.href = `detalle.html?nombre=${encodeURIComponent(nombre)}`;
}
