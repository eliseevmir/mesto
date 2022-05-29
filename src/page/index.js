import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Sections.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithDeleteCard } from "../components/PopupWithDeleteCard.js";
import {
  validSet,
  formValidators,
  createProfileBtn,
  addCardsBtn,
  popupImage,
  popupImageScale,
  popupImageText,
  profileName,
  profileInfo,
  userAvatarBtn,
  popupCreateProfile,
  popupCardsAdd,
  popupInputName,
  popupInputInfo,
  popupDeleteCard,
  popupEditAvatar,
  cards,
} from "../utils/constants.js";
import "./index.css";
import { Api } from "../components/Api.js";

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

    const userProfileCard = new UserInfo(
      dataUser,
      profileName,
      profileInfo,
      userAvatarBtn
    );

    profileName.textContent = userProfileCard.name;
    profileInfo.textContent = userProfileCard.about;
    userAvatarBtn.style.backgroundImage = `url(${userProfileCard.avatar})`;

    const popupScaleImage = new PopupWithImage(
      popupImage,
      popupImageScale,
      popupImageText
    );

    const addNewCardPopup = new PopupWithForm(popupCardsAdd, (event) => {
      event.preventDefault();
      loadingData(event, "Создание...");

      const dataCard = addNewCardPopup.getInputValues();
      const cardInfo = {
        name: dataCard["title-card"],
        link: dataCard["link-card"],
        likes: [],
      };

      api
        .cardsPage(cardInfo.name, cardInfo.link)
        .then((res) => {
          const cardElement = createCard(res, ".template__cards", dataUser);
          rendererCard.prependItem(cardElement);
          addNewCardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => loadingData(event, "Создать"));
    });

    addNewCardPopup.setEventListeners();

    const createProfilePopup = new PopupWithForm(
      popupCreateProfile,
      (event) => {
        event.preventDefault();
        loadingData(event, "Сохранение...");

        const dataForm = createProfilePopup.getInputValues();
        api
          .editDataProfile(dataForm)
          .then((res) => {
            createProfilePopup.close();
            userProfileCard.setUserInfo(res);
          })
          .catch((err) => console.log(err))
          .finally(() => loadingData(event, "Сохранить"));
      }
    );

    createProfilePopup.setEventListeners();

    const popupAvatar = new PopupWithForm(popupEditAvatar, (event) => {
      event.preventDefault();
      loadingData(event, "Сохранение...");

      const urlAvatar = popupAvatar.getInputValues();
      api
        .changeAvatarProfile(urlAvatar["avatar-info"])
        .then((res) => {
          userProfileCard.setUserInfo(res);
          popupAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => loadingData(event, "Сохранить"));
    });

    popupAvatar.setEventListeners();

    const deletePopupCard = new PopupWithDeleteCard(popupDeleteCard, (card) => {
      api
        .deleteCard(card.cardId)
        .then(() => {
          card.deleteCard();
          deletePopupCard.close();
        })
        .catch((err) => console.log(err));
    });

    deletePopupCard.setEventListeners();

    function addLikeCard(cardId) {
      return api.addLikeCard(cardId);
    }

    function deleteLikeCard(cardId) {
      return api.deleteLikeCard(cardId);
    }

    function loadingData(event, text) {
      event.submitter.textContent = text;
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

          handleLikeClick: (card) => {
            if (card.likes.some((user) => user._id === card.userId)) {
              card
                .deleteLikeCard(card.cardId)
                .then((res) => {
                  card.likes = res.likes;
                  card.toggleLike();
                  card.numberLike.textContent = res.likes.length;
                })
                .catch((err) => console.log(err));
            } else {
              card
                .addLikeCard(card.cardId)
                .then((res) => {
                  card.likes = res.likes;
                  card.toggleLike();
                  card.numberLike.textContent = res.likes.length;
                })
                .catch((err) => console.log(err));
            }
          },

          handleDeleteIconClick: (card) => {
            deletePopupCard.open(card);
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
      popupInputInfo.value = dataInputForm.about;
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
