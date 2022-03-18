const createProfileBtn = document.querySelector(".profile__button-create");
const addCardsBtn = document.querySelector(".profile__button-add");

const closePopupProfileBtn = document.querySelector(".popup__close-profile");
const closePopupCardsBtn = document.querySelector(".popup__close-cards");
const closePopupImageBtn = document.querySelector(".popup__close-image");

const cardsLikeBtn = document.querySelector(".cards__like");

const popupFormProfile = document.querySelector(".popup__form-profile");
const popupFormCards = document.querySelector(".popup__form-cards");

const formName = document.querySelector(".profile__title");
const formInfo = document.querySelector(".profile__subtitle");

const popupCreateProfile = document.querySelector(".popup_create-profile");
const popupCardsAdd = document.querySelector(".popup_cards-add");
const popupImage = document.querySelector(".popup_image");

let popupInputName = document.querySelector("input[name ='user-name']");
let popupInputInfo = document.querySelector("input[name ='user-info']");

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

createProfileBtn.addEventListener("click", ()=> {
  popupInputName.setAttribute("value", formName.textContent);
  popupInputInfo.setAttribute("value", formInfo.textContent);
  openPopup(popupCreateProfile);
});

closePopupProfileBtn.addEventListener("click", ()=>{
  closePopup(popupCreateProfile);
});

popupFormProfile.addEventListener("submit", handleProfileFormSubmit);

addCardsBtn.addEventListener("click", ()=> {
  openPopup(popupCardsAdd)
});

closePopupCardsBtn.addEventListener("click", ()=> {
  closePopup(popupCardsAdd)
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const proba =
   {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }

document.querySelector(".cards").append(...(initialCards.map(newCard)));

function newCard (obj) {
  const templateCards = document.querySelector(".template__cards").content;
  const cardsItem = templateCards.querySelector(".cards__item").cloneNode(true);
  cardsItem.querySelector(".cards__image").src = obj.link;
  cardsItem.querySelector(".cards__image").alt = obj.name;
  cardsItem.querySelector(".cards__text").textContent = obj.name;

  const likeBtn = cardsItem.querySelector(".cards__like");
  likeBtn.addEventListener("click", ()=> {
    like(likeBtn);
  })

  const imageCard = cardsItem.querySelector(".cards__image");
  imageCard.addEventListener("click", ()=> {
    popupImage.querySelector(".popup__image-scale").src = obj.link;
    popupImage.querySelector(".popup__image-text").textContent = obj.name;
    openPopup(popupImage);
  })

  return cardsItem;
};

let nameCard = document.querySelector("input[name ='name-card']");
let linkCard = document.querySelector("input[name ='link-card']");

function addNewCard () {
  const cardInfo = {
    name: nameCard.value,
    link: linkCard.value,
  };
  newCard(cardInfo);
  document.querySelector(".cards").prepend(newCard(cardInfo));
  closePopup(popupCardsAdd);
};

popupFormCards.addEventListener("submit", addNewCard);

function like (arg){
  arg.classList.toggle("cards__like_active");
};

closePopupImageBtn.addEventListener("click",()=>{
  closePopup(popupImage)
});
