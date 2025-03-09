const modal = document.getElementById("myModal");

const img = document.getElementById("myImg");
const modalImg = document.getElementById("imgCl");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}

const span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}