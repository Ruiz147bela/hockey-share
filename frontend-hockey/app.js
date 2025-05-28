// ========== Registro local desde formulario (si existe) ==========
document.getElementById("register-form")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const estado = document.getElementById("estado").value;

  // Modo demostración: muestra en lista local
  const li = document.createElement("li");
  li.textContent = `${nombre} - Estado: ${estado}`;
  document.getElementById("inventario-lista").appendChild(li);

  document.getElementById("register-form").reset();
});

// ========== Scroll horizontal ==========
function scrollLeft(id) {
  const el = document.getElementById(id);
  el.scrollBy({ left: -200, behavior: 'smooth' });
}

function scrollRight(id) {
  const el = document.getElementById(id);
  el.scrollBy({ left: 200, behavior: 'smooth' });
}

// ========== Redirección: Nuevos Implementos ==========
document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', () => {
    const nombre = encodeURIComponent(card.dataset.nombre || card.querySelector("h3")?.textContent);
    window.location.href = `detalle.html?nombre=${nombre}`;
  });
});

// ========== Redirección: Categorías (Cascos, Sticks, etc.) ==========
document.querySelectorAll('#imp-carousel .card').forEach((card) => {
  card.addEventListener('click', () => {
    const tipo = encodeURIComponent(card.dataset.tipo || card.textContent.trim().toLowerCase());
    window.location.href = `categoria.html?tipo=${tipo}`;
  });
});

// ========== Redirección: Clubes ==========
document.querySelectorAll('#club-carousel .card').forEach((card) => {
  card.addEventListener('click', () => {
    const club = encodeURIComponent(card.dataset.club || card.textContent.trim());
    window.location.href = `club.html?club=${club}`;
  });
});
