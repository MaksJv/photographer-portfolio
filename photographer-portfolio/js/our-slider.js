let currentSlide = 0;  // Початковий слайд

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showSlide, 10);  // Затримка для коректної ініціалізації
});

function showSlide() {
    const slides = document.querySelectorAll('.slide');
    const sliderContainer = document.querySelector('.our-background-partners-logos');
    if (!slides.length || !sliderContainer) return;

    const slideWidth = slides[0].offsetWidth; // Ширина одного слайда
    const gap = 30;  // Відступ між картками
    const offset = -currentSlide * (slideWidth + gap); // Розрахунок зсуву

    console.log(`Current Slide: ${currentSlide}, Offset: ${offset}px`);  // Для відлагодження
    sliderContainer.style.transform = `translateX(${offset}px)`; // Застосування зсуву
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide();
}

document.querySelector('.slider-arrow.left').addEventListener('click', prevSlide);
document.querySelector('.slider-arrow.right').addEventListener('click', nextSlide);
