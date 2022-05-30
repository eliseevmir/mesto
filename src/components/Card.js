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

    this.deleteLikeCard = deleteLikeCard;
    this.addLikeCard = addLikeCard;

    this.likes = data.likes;
    this.cardOwnerId = data.owner._id;
    this.cardId = data._id;
    this.userId = dataUser._id;
  }

  _getCardElement() {
    const cardsItem = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardsItem;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle("cards__like_active");
  }

  _setEventListener() {
    this._deleteCardBtn = this._elementCard.querySelector(".cards__trash");

    if (this.cardOwnerId !== this.userId) {
      this._elementCard.querySelector(".cards__trash").remove();
    }

    this._deleteCardBtn.addEventListener("click", () => {
      this._handleDeleteIconClick(this);
    });

    this._likeBtn = this._elementCard.querySelector(".cards__like");

    if (this.likes.some((user) => user._id === this.userId)) {
      this._likeBtn.classList.add("cards__like_active");
    }

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._image);
    });
  }

  deleteCard() {
    this._elementCard.remove();
  }

  updateLikes(res) {
    this.likes = res.likes;
    this._toggleLike();
    this._numberLike.textContent = res.likes.length;
  }

  generateCard() {
    this._elementCard = this._getCardElement();
    this._cardImage = this._elementCard.querySelector(".cards__image");

    this._numberLike = this._elementCard.querySelector(".cards__like-number");
    this._numberLike.textContent = this.likes.length;

    this._setEventListener();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._elementCard.querySelector(".cards__text").textContent = this._name;

    return this._elementCard;
  }
}
