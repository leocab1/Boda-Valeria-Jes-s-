document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musicaFondo");
  const btn = document.getElementById("btn-audio-flotante");

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        console.log("El usuario debe interactuar para reproducir la música 🎶");
      });
      btn.classList.add("activo");
    } else {
      audio.pause();
      btn.classList.remove("activo");
    }
  });
});
