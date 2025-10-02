const form = document.getElementById('form-dedicatorias');
const lista = document.getElementById('lista-dedicatorias');
const API_URL = "https://api.sheetbest.com/sheets/5defd4ae-5d40-48c9-9926-c14c312fdc28";

// Función para cargar mensajes existentes
async function cargarMensajes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
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
  } catch (err) {
    console.error('Error al cargar mensajes:', err);
    lista.innerHTML = '<p>No se pudieron cargar los mensajes.</p>';
  }
}

// Evento para enviar un mensaje nuevo
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  if (!nombre || !mensaje) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { Nombre: nombre, Mensaje: mensaje } })
    });

    if (!res.ok) throw new Error("Error al enviar mensaje");
    const data = await res.json();
    console.log("Mensaje enviado:", data);

    // Mostrar el mensaje recién enviado en pantalla
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p class="mensaje">“${mensaje}”</p>
      <p class="font-bold">${nombre}</p>
    `;
    lista.prepend(card);

    form.reset();
  } catch (err) {
    console.error(err);
    alert("No se pudo enviar el mensaje");
  }
});

// Cargar mensajes al inicio
document.addEventListener('DOMContentLoaded', cargarMensajes);
