import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Sections.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithAvatar } from "./components/PopupWithAvatar.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  validSet,
  formValidators,
  createProfileBtn,
  addCardsBtn,
  popupImage,
  formName,
  formInfo,
  userAvatarBtn,
  popupCreateProfile,
  popupCardsAdd,
  popupInputName,
  popupInputInfo,
  popupDeleteCard,
  popupEditAvatar,
  cards,
} from "./utils/constants.js";
import "./index.css";
import { Api } from "./components/Api.js";
import { Popup } from "./components/Popup.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "5129c1ae-33e1-40e7-9179-9f9bc64e6a51",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((res) => {
    const [cardsPage, dataUser] = res;
    const rendererCard = new Section(
      {
        items: cardsPage,
        renderer: (item) => {
          const cardElement = createCard(item, ".template__cards", dataUser);

          rendererCard.addItem(cardElement);
        },
      },
      cards
    );
    rendererCard.rendererCards();

    formInfo.textContent = dataUser.about;
    formName.textContent = dataUser.name;
    userAvatarBtn.style.backgroundImage = `url(${dataUser.avatar})`;

    const popupScaleImage = new PopupWithImage(popupImage);

    const userProfileCard = new UserInfo({
      userName: formName,
      userInfo: formInfo,
    });

    const addNewCardPopup = new PopupWithForm(popupCardsAdd, (event) => {
      event.preventDefault();
      loadingData(event, "Создание...");

      const dataCard = addNewCardPopup._getInputValues();
      const cardInfo = {
        name: dataCard["title-card"],
        link: dataCard["link-card"],
        likes: [],
      };

      api
        .cardsPage(cardInfo.name, cardInfo.link)
        .then((res) => {
          const cardElement = createCard(res, ".template__cards", dataUser);
          cards.prepend(cardElement);
        })
        .catch((err) => console.log(err))
        .finally(() => loadingData(event, "Создать"));

      event.target.reset();
      addNewCardPopup.close();
    });

    const createProfilePopup = new PopupWithForm(
      popupCreateProfile,
      (event) => {
        event.preventDefault();
        loadingData(event, "Сохранение...");

        const dataForm = createProfilePopup._getInputValues();
        userProfileCard.setUserInfo(dataForm);
        api
          .editDataProfile(dataForm)
          .catch((err) => console.log(err))
          .finally(() => loadingData(event, "Сохранить"));

        event.target.reset();
        createProfilePopup.close();
      }
    );

    const popupAvatar = new PopupWithAvatar(popupEditAvatar, (event) => {
      event.preventDefault();
      loadingData(event, "Сохранение...");

      const urlAvatar = popupAvatar._getInputValues();
      api
        .changeAvatarProfile(urlAvatar)
        .then((res) => {
          userAvatarBtn.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch((err) => console.log(err))
        .finally(() => loadingData(event, "Сохранить"));

      event.target.reset();
      popupAvatar.close();
    });

    function addLikeCard(cardId) {
      return api.addLikeCard(cardId);
    }

    function deleteLikeCard(cardId) {
      return api.deleteLikeCard(cardId);
    }

    function loadingData(event, text) {
      event.target.querySelector(".popup__button").textContent = text;
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

    function createCard(item, selector) {
      const cardElement = new Card(
        {
          data: item,

          handleCardClick: (textImage, linkImage) => {
            popupScaleImage.open(textImage, linkImage);
          },

          handleLikeClick: (cont) => {
            if (cont._likes.some((user) => user._id === cont._userId)) {
              cont._deleteLikeCard(cont._cardId).then((res) => {
                cont._likes = res.likes;
                cont._toggleLike();
                cont._numberLike.textContent = res.likes.length;
              });
            } else {
              cont._addLikeCard(cont._cardId).then((res) => {
                cont._likes = res.likes;
                cont._toggleLike();
                cont._numberLike.textContent = res.likes.length;
              });
            }
          },

          handleDeleteIconClick: (cardId) => {
            const popupDelete = new Popup(popupDeleteCard);
            popupDelete.open();
            const buttonPopup = popupDeleteCard.querySelector(".popup__button");
            buttonPopup.addEventListener("click", () => {
              api.deleteCard(cardId).catch((err) => console.log(err));

              cardElement._deleteCard();
              popupDelete.close();
            });
          },
        },

        selector,
        dataUser,
        addLikeCard,
        deleteLikeCard
      );
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

    userAvatarBtn.addEventListener("click", () => {
      formValidators["avatar"].resetValidation();
      popupAvatar.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });
