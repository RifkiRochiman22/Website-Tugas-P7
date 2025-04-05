document.addEventListener('DOMContentLoaded', function () {
    // --- FORM PEMESANAN ---
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const service = document.getElementById('service').value;
        alert(`Terima kasih, ${name}! Pemesanan untuk layanan ${service} pada tanggal ${date} telah diterima.`);
        form.reset();
    });

    // --- CAROUSEL GAMBAR ---
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots-container");
    const carousel = document.querySelector(".carousel-container");

    let currentSlide = 0;

    // Buat dot navigasi
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            dots[i].classList.remove("active");
        });
        slides[index].classList.add("active");
        dots[index].classList.add("active");
        currentSlide = index;
    }

    function changeSlide(n) {
        let newIndex = (currentSlide + n + slides.length) % slides.length;
        showSlide(newIndex);
    }

    prevBtn.addEventListener("click", () => changeSlide(-1));
    nextBtn.addEventListener("click", () => changeSlide(1));

    // Swipe untuk mobile
    let touchStartX = 0;
    carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (diff > 50) {
            changeSlide(1); // swipe left
        } else if (diff < -50) {
            changeSlide(-1); // swipe right
        }
    });

    // --- VANTA BIRDS Background ---
    if (typeof VANTA !== "undefined" && VANTA.BIRDS) {
        VANTA.BIRDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xffffff,
            color1: 0xffc0cb,
            color2: 0x000000,
            birdSize: 1.5,
            speedLimit: 3.00,
            separation: 40.00,
            alignment: 50.00,
            cohesion: 30.00,
            quantity: 4.00
        });
    } else {
        console.warn("VANTA.BIRDS tidak ditemukan. Pastikan vanta.birds.min.js sudah dimuat di HTML.");
    }
});
