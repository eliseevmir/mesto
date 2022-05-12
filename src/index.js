import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Sections.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  initialCards,
  validSet,
  formValidators,
  createProfileBtn,
  addCardsBtn,
  popupImage,
  formName,
  formInfo,
  popupCreateProfile,
  popupCardsAdd,
  popupInputName,
  popupInputInfo,
  cards,
} from "./utils/constants.js";
import "./index.css";

const popupScaleImage = new PopupWithImage(popupImage);

const userProfileCard = new UserInfo({
  userName: formName,
  userInfo: formInfo,
});

const addNewCardPopup = new PopupWithForm(popupCardsAdd, (event) => {
  event.preventDefault();

  const dataCard = addNewCardPopup._getInputValues();
  const cardInfo = {
    name: dataCard["title-card"],
    link: dataCard["link-card"],
  };
  const cardElement = createCard(cardInfo, ".template__cards", handleCardClick);
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

const rendererCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, ".template__cards", handleCardClick);
      rendererCard.addItem(cardElement);
    },
  },
  cards
);

rendererCard.rendererCards();

function handleCardClick(textImage, linkImage) {
  popupScaleImage.open(textImage, linkImage);
}

function enableValidation(data) {
  const formList = document.querySelectorAll(data.popupFormSelector);
  formList.forEach((formElement) => {
    const validator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(validSet);

function createCard(item, selector, handleCardClick) {
  const cardElement = new Card(item, selector, handleCardClick);
  return cardElement.generateCard();
}

addCardsBtn.addEventListener("click", () => {
  formValidators["cards"].resetValidation();
  addNewCardPopup.open();
});

createProfileBtn.addEventListener("click", () => {
  const dataInputForm = userProfileCard.getUserInfo();
  popupInputName.value = dataInputForm.name;
  popupInputInfo.value = dataInputForm.info;
  formValidators["profile"].resetValidation();
  createProfilePopup.open();
});
