export class Card {
  constructor (data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  };

  _getCardElement() {
     const cardsItem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".cards__item")
      .cloneNode(true);
     return cardsItem;
  };

  _trashCard(event) {
    event.target.closest(".cards__item").remove();
  };

  _toggleLike(event) {
   event.target.classList.toggle("cards__like_active");
  };

   _openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape);
    document.addEventListener("mousedown", this._clickOut);
  };

  _closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscape);
    document.removeEventListener("mousedown", this._clickOut);
  };

  _closeByEscape = (event) => {
    if (event.key === "Escape") {
      const activePopup = document.querySelector(".popup_opened");
      this._closePopup(activePopup);
    };
  };

  _clickOut = (event) => {
    if (event.target.classList.contains("popup") || event.target.classList.contains("popup__close")) {
      const activePopup = document.querySelector(".popup_opened");
      this._closePopup(activePopup);
    };
  };

  _fillingPopup(arg) {
    arg.querySelector(".popup__image-scale").src = this._image;
    arg.querySelector(".popup__image-scale").alt = this._name;
    arg.querySelector(".popup__image-text").textContent = this._name;
  };

  _setEventListener () {
    const deleteCard = this._elementCard.querySelector(".cards__trash");
    const likeBtn = this._elementCard.querySelector(".cards__like");
    const cardImage = this._elementCard.querySelector(".cards__image");
    const popupImage = document.querySelector(".popup_image");
    const closePopupImageBtn = popupImage.querySelector(".popup__close");


    deleteCard.addEventListener("click", this._trashCard);
    likeBtn.addEventListener("click", this._toggleLike);

    cardImage.addEventListener("click", () => {
      this._fillingPopup(popupImage);
      this._openPopup(popupImage);
    });

    closePopupImageBtn.addEventListener("click", () => {
      this._closePopup(popupImage);
    });
  };


  generateCard() {
    this._elementCard = this._getCardElement();
    this._setEventListener();

    this._elementCard.querySelector(".cards__image").src = this._image;
    this._elementCard.querySelector(".cards__image").alt = this._name;
    this._elementCard.querySelector(".cards__text").textContent = this._name;

    return this._elementCard;
  };

};

