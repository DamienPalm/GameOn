const modalCloseButton = document.querySelector(".close");
const modalBackground = document.querySelector(".bground");
const modalOpenButton = document.querySelectorAll(".modal-btn");
const burgerMenu = document.getElementById("myTopnav");
const subscribeForm = document.getElementById("subscribeForm");
const modalBody = document.querySelector(".modal-body");
let originalModalContent = modalBody.innerHTML;

modalOpenButton.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseButton.addEventListener("click", closeModal);
subscribeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate()) {
    this.submit();
  }
});

function launchModal() {
  modalBackground.classList.add("active");
  document.body.setAttribute("class", "no-scroll");
}

function closeModal() {
  modalBackground.classList.remove("active");
  document.body.removeAttribute("class", "no-scroll");
  modalBody.innerHTML = originalModalContent;
}

function editNav() {
  burgerMenu.classList.toggle("responsive");
}

function validate() {
  const formData = document.querySelectorAll(".formData");
  const firstNameElement = document.getElementById("first");
  const lastNameElement = document.getElementById("last");
  const emailElement = document.getElementById("email");
  const birthdateElement = document.getElementById("birthdate");
  const quantityElement = document.getElementById("quantity");
  const termsOfUseElement = document.getElementById("termsOfUse");
  const tournamentLocationElement = document.querySelector(
    "input[name='location']:checked"
  );
  let isValid = true;

  if (
    !firstNameElement ||
    !lastNameElement ||
    !emailElement ||
    !birthdateElement ||
    !quantityElement ||
    !termsOfUseElement
  ) {
    return false;
  }

  const firstName = firstNameElement.value.trim();
  const firstFormData = firstNameElement.closest(".formData");
  const lastName = lastNameElement.value.trim();
  const lastFormData = lastNameElement.closest(".formData");
  const email = emailElement.value.trim();
  const emailFormData = emailElement.closest(".formData");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const birthdate = birthdateElement.value;
  const birthdateFormData = birthdateElement.closest(".formData");
  const quantity = quantityElement.value;
  const quantityFormData = quantityElement.closest(".formData");
  const tournamentLocationFormData = document
    .querySelector("input[name='location']")
    .closest(".formData");
  const termsOfUse = termsOfUseElement.checked;
  const termsOfUseFormData = termsOfUseElement.closest(".formData");

  formData.forEach((error) => {
    error.setAttribute("data-error", "");
    error.setAttribute("data-error-visible", "false");
  });

  if (firstName === "" || firstName.length < 2) {
    firstFormData.setAttribute(
      "data-error",
      "Veuillez saisir votre prénom (minimum 2 caractères)"
    );
    firstFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (lastName === "" || lastName.length < 2) {
    lastFormData.setAttribute(
      "data-error",
      "Veuillez saisir votre nom (minimum 2 caractères)"
    );
    lastFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (!emailRegex.test(email)) {
    emailFormData.setAttribute("data-error", "Veuillez saisir un email valide");
    emailFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (birthdate === "") {
    birthdateFormData.setAttribute(
      "data-error",
      "Veuillez saisir votre date de naissance"
    );
    birthdateFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (quantity === "" || quantity < 0 || quantity > 99) {
    quantityFormData.setAttribute(
      "data-error",
      "Veuillez saisir le nombre de tournoi auquel vous avez participé (entre 0 et 99)"
    );
    quantityFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (!tournamentLocationElement) {
    tournamentLocationFormData.setAttribute(
      "data-error",
      "Veuillez selectionner un tournoi"
    );
    tournamentLocationFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (!termsOfUse) {
    termsOfUseFormData.setAttribute(
      "data-error",
      "Veuillez accepter les conditions d'utilisation"
    );
    termsOfUseFormData.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  if (isValid) {
    const successMessage = document.createElement("p");
    const closeButton = document.createElement("button");

    originalModalContent = modalBody.innerHTML;
    modalBody.innerHTML = "";

    successMessage.textContent = "Merci pour votre inscription";
    successMessage.setAttribute("class", "modal__thanks-text");
    modalBody.appendChild(successMessage);

    closeButton.textContent = "Fermer";
    closeButton.setAttribute("class", "btn-submit btn-close");
    closeButton.addEventListener("click", closeModal);
    modalBody.appendChild(closeButton);
  } else {
    return false;
  }
}
