let createBtn = document.querySelector(".profile__button-create");
let closePopupBtn = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__form");
let formName = document.querySelector(".profile__title");
let formInfo = document.querySelector(".profile__subtitle");
let popupBtn = document.querySelector(".popup__button");

let popupInputName = document.querySelector("input[name ='user-name']");
let popupInputInfo = document.querySelector("input[name ='user-info']");

popupInputName.setAttribute("value", formName.innerHTML);
popupInputInfo.setAttribute("value", formInfo.innerHTML);

function openPopup () {
  popup.classList.add("popup_opened");
};

function closePopup () {
  popup.classList.remove("popup_opened");
};

function formSubmitHandler (event) {
    event.preventDefault();
    formName.textContent = popupInputName.value;
    formInfo.textContent = popupInputInfo.value;
    closePopup()
};

createBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
popupForm.addEventListener("submit", formSubmitHandler);
