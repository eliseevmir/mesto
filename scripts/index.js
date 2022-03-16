const createProfileBtn = document.querySelector(".profile__button-create");
const addCardsBtn = document.querySelector(".profile__button-add");

const closePopupProfileBtn = document.querySelector(".popup__close-profile");
const closePopupCardsBtn = document.querySelector(".popup__close-cards");

const popupFormProfile = document.querySelector(".popup__form-profile");
const popupFormCards = document.querySelector(".popup__form-cards");

const formName = document.querySelector(".profile__title");
const formInfo = document.querySelector(".profile__subtitle");

const popupCreateProfile = document.querySelector(".popup_create-profile");
const popupCardsAdd = document.querySelector(".popup_cards-add");

let popupInputName = document.querySelector("input[name ='user-name']");
let popupInputInfo = document.querySelector("input[name ='user-info']");

function openPopup (arg) {
  arg.classList.add("popup_opened")
}

function closePopup (arg) {
  arg.classList.remove("popup_opened")
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  formName.textContent = popupInputName.value;
  formInfo.textContent = popupInputInfo.value;
  closePopup(popupCreateProfile)
};

createProfileBtn.addEventListener("click", ()=> {
  popupInputName.setAttribute("value", formName.textContent);
  popupInputInfo.setAttribute("value", formInfo.textContent);
  openPopup(popupCreateProfile)
})

closePopupProfileBtn.addEventListener("click", ()=>{
  closePopup(popupCreateProfile)
})

popupFormProfile.addEventListener("submit", handleProfileFormSubmit);

addCardsBtn.addEventListener("click", ()=> {
  openPopup(popupCardsAdd)
})

closePopupCardsBtn.addEventListener("click", ()=> {
  closePopup(popupCardsAdd)
})

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

initialCards.forEach(function (item) {
  const templaneCards = document.querySelector(".template__cards").content;
  const cardsItem = templaneCards.querySelector(".cards__item").cloneNode(true);
  cardsItem.querySelector(".cards__image").src = item.link;
  cardsItem.querySelector(".cards__image").alt = item.name;
  cardsItem.querySelector(".cards__text").textContent = item.name;
  document.querySelector(".cards").append(cardsItem);
})
