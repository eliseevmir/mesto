const createBtn = document.querySelector(".profile__button-create");
const closePopupBtn = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const formName = document.querySelector(".profile__title");
const formInfo = document.querySelector(".profile__subtitle");
const popupBtn = document.querySelector(".popup__button");

let popupInputName = document.querySelector("input[name ='user-name']");
let popupInputInfo = document.querySelector("input[name ='user-info']");

function openPopup () {
  popupInputName.setAttribute("value", formName.innerHTML);
  popupInputInfo.setAttribute("value", formInfo.innerHTML);
  popup.classList.add("popup_opened");
};

function closePopup () {
  popupInputName.value = formName.innerHTML;
  popupInputInfo.value = formInfo.innerHTML;
  popup.classList.remove("popup_opened");
};

function handleProfileFormSubmit (event) {
    event.preventDefault();
    formName.textContent = popupInputName.value;
    formInfo.textContent = popupInputInfo.value;
    closePopup()
};

createBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleProfileFormSubmit);
