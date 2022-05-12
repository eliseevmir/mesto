import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Sections.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import "../page/index.css";

const initialCards = [
  {
    name: 'BMW',
    link: 'https://images.unsplash.com/photo-1583692717320-0c9661d49d9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=335&q=80'
  },
  {
    name: 'AUDI',
    link: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
  },
  {
    name: 'FORD',
    link: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'PORSCHE',
    link: 'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'MERCEDES',
    link: 'https://images.unsplash.com/photo-1576074436157-6555fe967d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'NISSAN GT-R',
    link: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  }
];

const validSet = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  popupFormSelector: ".popup__form",
};

const formValidators = {};

const createProfileBtn = document.querySelector(".profile__button-create");
const addCardsBtn = document.querySelector(".profile__button-add");
const popupImage = document.querySelector(".popup_image");
const formName = document.querySelector(".profile__title");
const formInfo = document.querySelector(".profile__subtitle");
const popupCreateProfile = document.querySelector(".popup_create-profile");
const popupCardsAdd = document.querySelector(".popup_cards-add");
const popupInputName = document.querySelector("input[name ='user-name']");
const popupInputInfo = document.querySelector("input[name ='user-info']");
const cards = document.querySelector(".cards");

const userProfileCard = new UserInfo({userName: formName, userInfo: formInfo});

const addNewCardPopup = new PopupWithForm(popupCardsAdd, (event) => {
  event.preventDefault();

  const dataCard = addNewCardPopup._getInputValues();
  const cardInfo = {
    name: dataCard["title-card"],
    link: dataCard["link-card"],
  };
  const card = new Card (cardInfo, ".template__cards", handleCardClick);
  const cardElement = card.generateCard();
  cards.prepend(cardElement);

  event.target.reset();
  addNewCardPopup.close();
});

const createProfilePopup = new PopupWithForm(popupCreateProfile, (event) => {
  event.preventDefault();

  const dataForm = createProfilePopup._getInputValues();
  userProfileCard.setUserInfo(dataForm);

  event.target.reset();
  createProfilePopup.close();
});

const rendererCard = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, ".template__cards", handleCardClick);
  const cardElement = card.generateCard();
  rendererCard.addItem(cardElement);
}}, cards);

rendererCard.rendererCards();


function handleCardClick (textImage, linkImage) {
  const popupScaleImage = new PopupWithImage(popupImage, textImage, linkImage);
  popupScaleImage.open();
};


function enableValidation (data) {
  const formList = document.querySelectorAll(data.popupFormSelector);
  formList.forEach(formElement => {
    const validator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();

  });
};

enableValidation(validSet);


addCardsBtn.addEventListener("click", ()=> {
  formValidators["cards"].resetValidation();
  addNewCardPopup.open();
});


createProfileBtn.addEventListener("click", ()=> {
  const dataInputForm = userProfileCard.getUserInfo();
  popupInputName.value = dataInputForm.name;
  popupInputInfo.value = dataInputForm.info;
  formValidators["profile"].resetValidation();
  createProfilePopup.open();
});
