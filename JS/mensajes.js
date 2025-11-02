const form = document.getElementById('form-dedicatorias');
const lista = document.getElementById('lista-dedicatorias');
const API_URL = "https://api.sheetbest.com/sheets/8da9de60-c7e5-461c-bb28-8cd6f68ea03e";

async function cargarMensajes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json(); 
    lista.innerHTML = '';

    data.reverse().forEach(msg => {
      const card = document.createElement('div');
      card.className = 'card flex flex-col min-w-[220px] max-w-[220px] bg-[#1f2c3a] rounded-xl p-4 shadow-lg text-[#e0e6ed] flex-shrink-0';
      card.innerHTML = `
        <p class="mensaje">“${msg.Mensaje}”</p>
        <p class="font-bold">${msg.Nombre}</p>
      `;
      lista.appendChild(card);
    });

  } catch (err) {
    console.error('Error al cargar mensajes:', err);
    lista.innerHTML = '<p style="color:red;">No se pudieron cargar los mensajes.</p>';
  }
}

// Función para enviar mensaje
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !mensaje) {
    alert("Por favor completa ambos campos.");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ Nombre: nombre, Mensaje: mensaje }]) // Sheetbest espera un array
    });

    // Agregar mensaje enviado al inicio
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