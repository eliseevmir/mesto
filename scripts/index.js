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
    name: 'MUSTANG',
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

const createProfileBtn = document.querySelector(".profile__button-create");
const addCardsBtn = document.querySelector(".profile__button-add");

const closePopupProfileBtn = document.querySelector(".popup__close-profile");
const closePopupCardsBtn = document.querySelector(".popup__close-cards");
const closePopupImageBtn = document.querySelector(".popup__close-image");

const popupFormProfile = document.querySelector(".popup__form-profile");
const popupFormCards = document.querySelector(".popup__form-cards");

const formName = document.querySelector(".profile__title");
const formInfo = document.querySelector(".profile__subtitle");

const popupCreateProfile = document.querySelector(".popup_create-profile");
const popupCardsAdd = document.querySelector(".popup_cards-add");
const popupImage = document.querySelector(".popup_image");

const popupInputName = document.querySelector("input[name ='user-name']");
const popupInputInfo = document.querySelector("input[name ='user-info']");

const nameCard = document.querySelector("input[name ='name-card']");
const linkCard = document.querySelector("input[name ='link-card']");

const popupImageScale = document.querySelector(".popup__image-scale");
const popupImageText = document.querySelector(".popup__image-text");

const cards = document.querySelector(".cards");


cards.append(...(initialCards.map(createCard)));

function openPopup (arg) {
  arg.classList.add("popup_opened");
};

function closePopup (arg) {
  arg.classList.remove("popup_opened");
};

function handleProfileFormSubmit(event) {
  event.preventDefault();
  formName.textContent = popupInputName.value;
  formInfo.textContent = popupInputInfo.value;
  closePopup(popupCreateProfile);
};

function addNewCard (event) {
  event.preventDefault();
  const cardInfo = {
    name: nameCard.value,
    link: linkCard.value,
  };
  createCard(cardInfo);
  cards.prepend(createCard(cardInfo));
  event.target.reset();
  closePopup(popupCardsAdd);
};

function like (event) {
   event.target.classList.toggle("cards__like_active");
};

function deletCard (event) {
  event.target.closest(".cards__item").remove();
};

function fillingPopuoImage (arg) {
  popupImageScale.src = arg.link;
  popupImageScale.alt = arg.name;
  popupImageText.textContent = arg.name;
};

function createCard (obj) {
  const templateCards = document.querySelector(".template__cards").content;
  const cardsItem = templateCards.querySelector(".cards__item").cloneNode(true);
  const cardImage = cardsItem.querySelector(".cards__image");
  cardImage.src = obj.link;
  cardImage.alt = obj.name;
  cardsItem.querySelector(".cards__text").textContent = obj.name;

  const cardsLikeBtn = cardsItem.querySelector(".cards__like");
  cardsLikeBtn.addEventListener("click", like);

  cardImage.addEventListener("click", ()=> {
    fillingPopuoImage(obj);
    openPopup(popupImage);
  });
    const cardsDeleteBtn = cardsItem.querySelector(".cards__trash");
    cardsDeleteBtn.addEventListener("click", deletCard);

  return cardsItem;
};

createProfileBtn.addEventListener("click", ()=> {
  popupInputName.value = formName.textContent;
  popupInputInfo.value = formInfo.textContent;
  openPopup(popupCreateProfile);
});

closePopupProfileBtn.addEventListener("click", ()=> {
  closePopup(popupCreateProfile);
});

popupFormProfile.addEventListener("submit", handleProfileFormSubmit);

addCardsBtn.addEventListener("click", ()=> {
  openPopup(popupCardsAdd)
});

closePopupCardsBtn.addEventListener("click", ()=> {
  closePopup(popupCardsAdd)
});

closePopupImageBtn.addEventListener("click",()=> {
  closePopup(popupImage)
});

popupFormCards.addEventListener("submit", addNewCard);
