const form = document.getElementById('form-dedicatorias');
const lista = document.getElementById('lista-dedicatorias');
const API_URL = "https://api.sheetbest.com/sheets/5defd4ae-5d40-48c9-9926-c14c312fdc28";

async function cargarMensajes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    lista.innerHTML = '';

    data.reverse().forEach(msg => {
      const card = document.createElement('div');
      card.style.minWidth = "220px";
      card.style.maxWidth = "250px";          // Limita ancho de la tarjeta
      card.style.maxHeight = "220px";         // Limita altura
      card.style.backgroundColor = "#1a2a3a";
      card.style.border = "1px solid rgba(176,196,222,0.3)";
      card.style.borderRadius = "12px";
      card.style.padding = "12px";
      card.style.flexShrink = "0";
      card.style.overflow = "hidden";         // Oculta exceso
      card.style.display = "flex";
      card.style.flexDirection = "column";

      const mensajeDiv = document.createElement('div');
      mensajeDiv.style.color = "#c9d6e4";
      mensajeDiv.style.fontStyle = "italic";
      mensajeDiv.style.flexGrow = "1";
      mensajeDiv.style.overflowY = "auto";   // Scroll interno si es muy largo
      mensajeDiv.style.wordWrap = "break-word";
      mensajeDiv.style.marginBottom = "6px";
      mensajeDiv.innerHTML = msg.Mensaje.split(/\n+/).map(p => `<p>${p.trim()}</p>`).join('');

      const nombreP = document.createElement('p');
      nombreP.style.fontWeight = "bold";
      nombreP.style.color = "white";
      nombreP.style.marginTop = "4px";
      nombreP.textContent = `- ${msg.Nombre}`;

      card.appendChild(mensajeDiv);
      card.appendChild(nombreP);
      lista.appendChild(card);
    });
  } catch (err) {
    console.error('Error al cargar mensajes:', err);
    lista.innerHTML = '<p style="color:red;">No se pudieron cargar los mensajes.</p>';
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
      body: JSON.stringify([{ Nombre: nombre, Mensaje: mensaje }])
    });

    if (!res.ok) throw new Error("Error al enviar mensaje");

    // Creamos la card de manera igual
    const card = document.createElement('div');
    card.style.minWidth = "220px";
    card.style.maxWidth = "250px";
    card.style.maxHeight = "220px";
    card.style.backgroundColor = "#1a2a3a";
    card.style.border = "1px solid rgba(176,196,222,0.3)";
    card.style.borderRadius = "12px";
    card.style.padding = "12px";
    card.style.flexShrink = "0";
    card.style.overflow = "hidden";
    card.style.display = "flex";
    card.style.flexDirection = "column";

    const mensajeDiv = document.createElement('div');
    mensajeDiv.style.color = "#c9d6e4";
    mensajeDiv.style.fontStyle = "italic";
    mensajeDiv.style.flexGrow = "1";
    mensajeDiv.style.overflowY = "auto";
    mensajeDiv.style.wordWrap = "break-word";
    mensajeDiv.style.marginBottom = "6px";
    mensajeDiv.innerHTML = mensaje.split(/\n+/).map(p => `<p>${p.trim()}</p>`).join('');

    const nombreP = document.createElement('p');
    nombreP.style.fontWeight = "bold";
    nombreP.style.color = "white";
    nombreP.style.marginTop = "4px";
    nombreP.textContent = `- ${nombre}`;

    card.appendChild(mensajeDiv);
    card.appendChild(nombreP);
    lista.prepend(card);

    form.reset();
  } catch (err) {
    console.error(err);
    alert("No se pudo enviar el mensaje");
  }
});

document.addEventListener('DOMContentLoaded', cargarMensajes);
