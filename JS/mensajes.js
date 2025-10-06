const form = document.getElementById('form-dedicatorias');
const lista = document.getElementById('lista-dedicatorias');
const API_URL = "https://api.sheetbest.com/sheets/5defd4ae-5d40-48c9-9926-c14c312fdc28";

async function cargarMensajes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    lista.innerHTML = ''; // Limpiar lista antes de mostrar
    data.reverse().forEach(msg => {
      const card = document.createElement('div');
      card.className = 'card bg-[#1a2a3a] border border-[#b0c4de]/30 rounded-xl p-4 shadow-md w-64';
      card.innerHTML = `
        <p class="font-bold text-[#b0c4de] mt-2">${msg["Nombre "] || msg.Nombre}</p>
        <p class="mensaje text-gray-200 italic">“${msg.Mensaje}”</p>
      `;
      lista.appendChild(card);
    });
  } catch (err) {
    console.error('Error al cargar mensajes:', err);
    lista.innerHTML = '<p class="text-red-400">No se pudieron cargar los mensajes.</p>';
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !mensaje) {
    alert("Por favor completa ambos campos.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ "Nombre ": nombre, "Mensaje": mensaje }])
    });

    if (!res.ok) throw new Error("Error al enviar mensaje");

    // Mostrar inmediatamente el mensaje en pantalla
    const card = document.createElement('div');
    card.className = 'card bg-[#1a2a3a] border border-[#b0c4de]/30 rounded-xl p-4 shadow-md w-64 animate-fade-in';
    card.innerHTML = `
      <p class="font-bold text-[#b0c4de] mt-2">${nombre}</p>
      <p class="mensaje text-gray-200 italic">“${mensaje}”</p>
    `;
    lista.prepend(card);

    form.reset();

  } catch (err) {
    console.error(err);
    alert("No se pudo enviar el mensaje");
  }
});

document.addEventListener('DOMContentLoaded', cargarMensajes);
