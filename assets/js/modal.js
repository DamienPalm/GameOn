const modalCloseButton = document.querySelector(".close");
const modalBackground = document.querySelector(".bground");
const modalOpenButton = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

modalOpenButton.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseButton.addEventListener("click", closeModal);

function launchModal() {
  modalBackground.classList.add("active");
}

function closeModal() {
  modalBackground.classList.remove("active");
}

function editNav() {
  const burgerMenu = document.getElementById("myTopnav");
  burgerMenu.classList.toggle("responsive");
}
