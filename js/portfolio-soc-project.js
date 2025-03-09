const headerTitleChange = [
  'The view from the top is always worth the climb',
  'Social Projects by Patrick Jackson',
  'The purpose of our life is to be happy'
];

function getRandomTitle(arr){
  const randomIdx = Math.floor(Math.random() * arr.length);
  return arr[randomIdx];
}

function updateTitle(){
  const headerTitleText = document.querySelector('.hero__title');
  headerTitleText.innerText = getRandomTitle(headerTitleChange);
}

setInterval(updateTitle, 6000);

const slides = [
  '<div><img src="img/mountain.webp" alt="mountain"/></div>',
  '<div><img src="img/portfolio_photo_left.jpg" alt="mountain"/></div>',
  '<div><img src="img/portfolio_photo_right_bottom.jpg" alt="mountain"/></div>',
  '<div><img src="img/portfolio_photo_right_top.jpg" alt="mountain"/></div>',
];

let currentSlideIdx = 0;

function renderSlide(){
  const slideContainer = document.querySelector('.carousel');
  slideContainer.innerHTML = slides[currentSlideIdx];
}

function nextSlide(){
  currentSlideIdx++;
  if (currentSlideIdx >= slides.length) {
    currentSlideIdx = 0;
  }

  renderSlide();
}

function prevSlide(){
  currentSlideIdx--;
  if (currentSlideIdx <= slides.length) {
    currentSlideIdx = 0;
  }

  renderSlide();
}

renderSlide();
setInterval(nextSlide, 3000);

const nextBtn = document.querySelector('.carousel_btn-next');
nextBtn.addEventListener('click', nextSlide);

const prevBtn = document.querySelector('.carousel_btn-prev');
prevBtn.addEventListener('click', prevSlide);