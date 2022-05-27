export class Card {
  constructor(
    { data, handleLikeClick, handleDeleteIconClick, handleCardClick },
    cardSelector,
    dataUser,
    addLikeCard,
    deleteLikeCard
  ) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._deleteLikeCard = deleteLikeCard;
    this._addLikeCard = addLikeCard;

    this._data = data;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._userId = dataUser._id;
  }

  _getCardElement() {
    const cardsItem = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardsItem;
  }

  _deleteCard() {
    this._elementCard.remove();
  }

  _toggleLike() {
    this._likeBtn.classList.toggle("cards__like_active");
  }

  _setEventListener() {
    this._deleteCardBtn = this._elementCard.querySelector(".cards__trash");

    if (this._cardOwnerId !== this._userId) {
      this._elementCard.querySelector(".cards__trash").remove();
    }

    this._deleteCardBtn.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId);
    });

    this._likeBtn = this._elementCard.querySelector(".cards__like");

    if (this._likes.some((user) => user._id === this._userId)) {
      this._likeBtn.classList.add("cards__like_active");
    }

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._image);
    });
  }

  generateCard() {
    this._elementCard = this._getCardElement();
    this._cardImage = this._elementCard.querySelector(".cards__image");

    this._numberLike = this._elementCard.querySelector(".cards__like-number");
    this._numberLike.textContent = this._likes.length;

    this._setEventListener();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._elementCard.querySelector(".cards__text").textContent = this._name;

    return this._elementCard;
  }
}
