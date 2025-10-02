 (async () => {
      const lista = document.getElementById('lista-dedicatorias');

      const API_URL = "https://api.allorigins.win/raw?url=" +
        encodeURIComponent("https://api.sheetbest.com/sheets/5defd4ae-5d40-48c9-9926-c14c312fdc28");

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

      cargarMensajes();
    })();