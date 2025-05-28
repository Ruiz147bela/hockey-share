const BACKEND_URL = "http://afd7a257f21c149a0b802a37b39f2e21-41552196.us-east-1.elb.amazonaws.com";

document.addEventListener("DOMContentLoaded", () => {
  cargarNavbar();
  const imgInput = document.getElementById("imagen");
  const preview = document.getElementById("preview");

  imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    }
  });

  document.getElementById("form-implemento").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const club = document.getElementById("club").value;
    const pista = document.getElementById("pista").value.trim();
    const estado = parseInt(document.getElementById("estado").value);
    const descripcion = document.getElementById("descripcion").value.trim();
    const contacto = document.getElementById("contacto").value.trim();
    const id_usuario = localStorage.getItem("usuario_id");
    const imagen_url = document.getElementById("preview").src || "https://via.placeholder.com/400x300?text=Sin+imagen";

    if (!nombre || !club || !pista || !estado || !descripcion || !id_usuario) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const data = {
      nombre,
      descripcion,
      estado,
      tipo: detectarTipo(nombre),
      pista,
      imagen_url,
      contacto,
      id_usuario: parseInt(id_usuario),
      club
    };

    fetch(`${BACKEND_URL}/implementos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) throw new Error("Error al registrar el implemento.");
      return res.json();
    })
    .then(() => {
      alert("✅ Implemento registrado exitosamente.");
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("❌ Error: " + err.message);
    });
  });
});

function detectarTipo(nombre) {
  const n = nombre.toLowerCase();
  if (n.includes("casco")) return "cascos";
  if (n.includes("stick")) return "sticks";
  if (n.includes("guante")) return "guantes";
  return "otros";
}

function cargarNavbar() {
  fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar-container").innerHTML = html;
    });
}
