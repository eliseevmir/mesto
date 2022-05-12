export class Card {
  constructor ({name, link}, cardSelector, handleCardClick) {
    this._name = name;
    this._image = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  };

  _getCardElement() {
     const cardsItem = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".cards__item")
      .cloneNode(true);
     return cardsItem;
  };

  _deleteCard(event) {
    event.target.closest(".cards__item").remove();
  };

  _toggleLike(event) {
   event.target.classList.toggle("cards__like_active");
  };

  _setEventListener () {
    const deleteCardBtn = this._elementCard.querySelector(".cards__trash");
    const likeBtn = this._elementCard.querySelector(".cards__like");

    deleteCardBtn.addEventListener("click", this._deleteCard);
    likeBtn.addEventListener("click", this._toggleLike);

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._image);
    });
  };

  generateCard() {
    this._elementCard = this._getCardElement();
    this._cardImage = this._elementCard.querySelector(".cards__image");
    this._setEventListener();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._elementCard.querySelector(".cards__text").textContent = this._name;

    return this._elementCard;
  };
};

