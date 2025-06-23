let currentSlide = 0; 

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showSlide, 10);  
});

function showSlide() {
    const slides = document.querySelectorAll('.slide');
    const sliderContainer = document.querySelector('.our-background-partners-logos');
    if (!slides.length || !sliderContainer) return;

    const slideWidth = slides[0].offsetWidth; 
    const gap = 30;  
    const offset = -currentSlide * (slideWidth + gap); 

    console.log(`Current Slide: ${currentSlide}, Offset: ${offset}px`); 
    sliderContainer.style.transform = `translateX(${offset}px)`;
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
