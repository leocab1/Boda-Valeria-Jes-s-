(async () => {
  const lista = document.getElementById('lista-dedicatorias');
  lista.innerHTML = '<p>Cargando mensajes...</p>';

  const API_URL = "https://api.sheetbest.com/sheets/5defd4ae-5d40-48c9-9926-c14c312fdc28";

  async function cargarMensajes() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Datos no válidos");

      lista.innerHTML = '';
      data.reverse().forEach(msg => {
        const nombre = msg.Nombre || "Anónimo";
        const mensaje = msg.Mensaje || "";

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <p class="mensaje">“${mensaje}”</p>
          <p class="font-bold">${nombre}</p>
        `;
        lista.appendChild(card);
      });

    } catch (err) {
      console.error('Error al cargar mensajes:', err);
      lista.innerHTML = '<p>No se pudieron cargar los mensajes.</p>';
    }
  }

  cargarMensajes();
})();
