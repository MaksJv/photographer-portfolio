let slideIndex = 1;

function openModal(idx) {
  document.getElementById("modalbox").style.display = "block";
  showSlides(idx);
}

function closeModal() {
  document.getElementById("modalbox").style.display = "none";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("modalslides");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
  }
}

document.querySelector('.prev').onclick = function () {
  plusSlides(-1);
};

document.querySelector('.next').onclick = function () {
  plusSlides(1);
};

document.querySelector('.close').addEventListener('click', () => {
  closeModal();
});

document.querySelectorAll('.column').forEach((img, idx) => {
  img.addEventListener('click', () => {
    openModal(idx);
    currentSlide(idx + 1);
  });
});

let currentZoom = 100; 
const zoomStep = 10; 

function zoomIn() {
  currentZoom += zoomStep;
  applyZoom();
}

function zoomOut() {
  currentZoom -= zoomStep;
  applyZoom();
}

function applyZoom() {
  let modalContent = document.querySelector('.modal-content');
  modalContent.style.transform = `translate(-50%, -50%) scale(${currentZoom / 100})`;
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.zoom-controls button').forEach(function(button) {
    button.addEventListener('click', function() {
      if (this.classList.contains('zoom-in')) {
        zoomIn();
      } else if (this.classList.contains('zoom-out')) {
        zoomOut();
      }
    });
  });
});

window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
