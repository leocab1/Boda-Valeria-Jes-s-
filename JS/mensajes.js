const form = document.getElementById('form-dedicatorias');
const lista = document.getElementById('lista-dedicatorias');
const API_URL = "https://sheetdb.io/api/v1/turyrtjzajysy";

function cargarMensajes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(json => {
      const data = json.data; 
      lista.innerHTML = '';
      data.reverse().forEach(msg => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <p class="mensaje">“${msg.Mensaje}”</p>
          <p class="font-bold">${msg.Nombre}</p>
        `;
        lista.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error al cargar mensajes:', err);
      lista.innerHTML = '<p>No se pudieron cargar los mensajes.</p>';
    });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !mensaje) {
    alert("Por favor completa ambos campos.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { Nombre: nombre, Mensaje: mensaje } })
  })
  .then(res => {
    if (!res.ok) throw new Error('Error al enviar mensaje');
    return res.json();
  })
  .then(data => {
    console.log("Mensaje enviado:", data);
    const card = document.createElement('div');
    card.className = 'card bg-[#1a2a3a] border border-[#b0c4de]/30 rounded-xl p-4 shadow-md w-64 animate-fade-in';
    card.innerHTML = `
      <p class="font-bold text-[#b0c4de] mt-2">${nombre}</p>
      <p class="mensaje text-gray-200 italic">“${mensaje}”</p>
    `;
    lista.prepend(card);
    form.reset();
  })
  .catch(err => {
    console.error(err);
    alert("No se pudo enviar el mensaje");
  });
});

