const modalCloseButton = document.querySelector(".closeModalButton");
const modalBackground = document.querySelector(".modalBackground");
const modalOpenButton = document.querySelectorAll(".modal-btn");
const burgerMenu = document.getElementById("myTopnav");
const subscribeForm = document.getElementById("subscribeForm");
const modalBody = document.querySelector(".modalBody");

modalOpenButton.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseButton.addEventListener("click", closeModal);
subscribeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate()) {
    showSuccessMessage();
    console.log("La validation a réussi");
  } else {
    console.log("La validation a échoué");
  }
});

function launchModal() {
  modalBackground.classList.add("active");
  document.body.setAttribute("class", "no-scroll");
}

function closeModal() {
  modalBackground.classList.remove("active");
  document.body.removeAttribute("class", "no-scroll");
}

function editNav() {
  burgerMenu.classList.toggle("openMenu");
}

function setErrorMessage(input, message) {
  const formData = input.closest(".formData");
  const errorMessage = formData.querySelector(".error-message");
  formData.className = "formData error";
  errorMessage.innerText = message;
  formData.setAttribute("data-error-visible", "true");
}

function setSuccess(input) {
  const formData = input.closest(".formData");
  formData.className = "formData";
  formData.setAttribute("data-error-visible", "false");
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
  const lastName = lastNameElement.value.trim();
  const email = emailElement.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const birthdate = birthdateElement.value;
  const quantity = quantityElement.value;
  const termsOfUse = termsOfUseElement.checked;

  formData.forEach((error) => {
    error.setAttribute("data-error-visible", "false");
  });

  if (firstName === "" || firstName.length < 2) {
    setErrorMessage(
      firstNameElement,
      "Veuillez saisir votre prénom (minimum 2 caractères)"
    );
    isValid = false;
  } else {
    setSuccess(firstNameElement);
  }

  if (lastName === "" || lastName.length < 2) {
    setErrorMessage(
      lastNameElement,
      "Veuillez saisir votre nom (minimum 2 caractères)"
    );
    isValid = false;
  } else {
    setSuccess(lastNameElement);
  }

  if (!emailRegex.test(email)) {
    setErrorMessage(emailElement, "Veuillez saisir un email valide");
    isValid = false;
  } else {
    setSuccess(emailElement);
  }

  if (birthdate === "") {
    setErrorMessage(
      birthdateElement,
      "Veuillez saisir votre date de naissance"
    );
    isValid = false;
  } else {
    setSuccess(birthdateElement);
  }

  if (quantity === "" || quantity < 0 || quantity > 99) {
    setErrorMessage(
      quantityElement,
      "Veuillez saisir le nombre de tournoi auquel vous avez participé (entre 0 et 99)"
    );
    isValid = false;
  } else {
    setSuccess(quantityElement);
  }

  if (!tournamentLocationElement) {
    const locationInput = document.querySelector("input[name='location']");
    setErrorMessage(locationInput, "Veuillez sélectionner un tournoi");
    isValid = false;
  } else {
    setSuccess(tournamentLocationElement);
  }

  if (!termsOfUse) {
    setErrorMessage(
      termsOfUseElement,
      "Veuillez accepter les conditions d'utilisation"
    );
    isValid = false;
  } else {
    setSuccess(termsOfUseElement);
  }

  if (isValid) {
    return true;
  } else {
    return false;
  }
}

function showSuccessMessage() {
  const successMessage = document.createElement("p");
  const closeButton = document.createElement("button");

  modalBody.innerHTML = "";

  successMessage.textContent = "Merci pour votre inscription";
  successMessage.setAttribute("class", "modal__thanks-text");
  modalBody.appendChild(successMessage);

  closeButton.textContent = "Fermer";
  closeButton.setAttribute("class", "btn-submit btn-close");
  closeButton.addEventListener("click", reload);
  modalBody.appendChild(closeButton);
}

function reload() {
  subscribeForm.reset();
  window.location.reload();
}
