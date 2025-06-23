const carousel = document.querySelector('.animated-carousel');
const carouselInner = carousel.querySelector('.animated-carousel__inner');
const prevButton = carousel.querySelector('.carousel__button--prev');
const nextButton = carousel.querySelector('.carousel__button--next');

let slidesPerView = getSlidesPerView();
let slides = Array.from(carouselInner.children);
let currentIndex = 0; 

setupCarousel();

function getSlidesPerView() {
    return 1; 
}

function setupCarousel() {
    
    slides = slides.filter(slide => !slide.classList.contains('clone'));

    
    const slideWidthPercentage = 100 / slidesPerView;
    slides.forEach(slide => {
        slide.style.flex = `0 0 ${slideWidthPercentage}%`;
    });

    
    carouselInner.innerHTML = ''; 
    carouselInner.append(...slides);

    
    slides = Array.from(carouselInner.children);

    updateCarousel();
}

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
}


prevButton.addEventListener('click', () => {
    if (--currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    if (++currentIndex >= slides.length) {
        currentIndex = 0;
    }
    updateCarousel();
});

window.addEventListener('resize', () => {
    slidesPerView = getSlidesPerView();
    setupCarousel();
});
