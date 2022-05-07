import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(_popupSelector, textImage, linkImage) {
    super(_popupSelector);
    this._textImage = textImage;
    this._linkImage = linkImage;
  };

  open() {
    this._popupSelector.classList.add("popup_opened");
    const image = this._popupSelector.querySelector(".popup__image-scale");
    const textImage = this._popupSelector.querySelector(".popup__image-text");
    image.src = this._linkImage;
    textImage.textContent = this._textImage;


    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("mousedown", this.setEventListeners);
  };
};
