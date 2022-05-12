export const initialCards = [
  {
    name: "BMW",
    link: "https://images.unsplash.com/photo-1583692717320-0c9661d49d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=335&q=80",
  },
  {
    name: "AUDI",
    link: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
  },
  {
    name: "FORD",
    link: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "PORSCHE",
    link: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "MERCEDES",
    link: "https://images.unsplash.com/photo-1576074436157-6555fe967d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "NISSAN GT-R",
    link: "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  },
];

export const validSet = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupFormSelector: ".popup__form",
};

export const formValidators = {};

export const createProfileBtn = document.querySelector(
  ".profile__button-create"
);
export const addCardsBtn = document.querySelector(".profile__button-add");
export const popupImage = document.querySelector(".popup_image");
export const formName = document.querySelector(".profile__title");
export const formInfo = document.querySelector(".profile__subtitle");
export const popupCreateProfile = document.querySelector(
  ".popup_create-profile"
);
export const popupCardsAdd = document.querySelector(".popup_cards-add");
export const popupInputName = document.querySelector(
  "input[name ='user-name']"
);
export const popupInputInfo = document.querySelector(
  "input[name ='user-info']"
);
export const cards = document.querySelector(".cards");
