    const countDownDate = new Date("Nov 8, 2025 15:00:00").getTime();
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("days").innerHTML = String(days).padStart(2, '0');
            document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "";
                document.getElementById("message").innerHTML = "¡El gran día ha llegado!";
            }
        }, 1000);

        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        sections.forEach(section => observer.observe(section));
        
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('modal-img');
            const closeBtn = document.querySelector('.close');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const photoItems = document.querySelectorAll('.photo-item img');
            let currentIndex = 0;

            function showImage(index) {
                modalImg.src = photoItems[index].src;
                currentIndex = index;
            }

            photoItems.forEach((img, index) => {
                img.addEventListener('click', () => {
                    modal.style.display = "flex";
                    showImage(index);
                });
            });

            closeBtn.addEventListener('click', () => modal.style.display = "none");
            prevBtn.addEventListener('click', () => showImage((currentIndex > 0) ? currentIndex - 1 : photoItems.length - 1));
            nextBtn.addEventListener('click', () => showImage((currentIndex < photoItems.length - 1) ? currentIndex + 1 : 0));

            window.addEventListener('keydown', (e) => {
                if (modal.style.display === "flex") {
                    if (e.key === "ArrowLeft") prevBtn.click();
                    else if (e.key === "ArrowRight") nextBtn.click();
                    else if (e.key === "Escape") closeBtn.click();
                }
            });
        });
        window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  setTimeout(() => {
    loader.classList.add("hidden");
    content.classList.remove("hidden");
  }, 1500); 
});