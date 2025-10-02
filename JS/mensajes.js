const nombre = document.getElementById('nombre').value.trim();
const mensaje = document.getElementById('mensaje').value.trim();

fetch("https://sheetdb.io/api/v1/qe0emre9epqit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    data: { Nombre: nombre, Mensaje: mensaje }
  })
})
.then(res => {
  if (!res.ok) throw new Error("Error al enviar mensaje");
  return res.json();
})
.then(data => {
  console.log("Mensaje enviado:", data);
})
.catch(err => {
  console.error(err);
  alert("No se pudo enviar el mensaje");
});
