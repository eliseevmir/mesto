import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(_popupSelector) {
    super(_popupSelector);
  }

  open(textImage, linkImage) {
    super.setEventListeners();

    this._popupSelector.classList.add("popup_opened");
    const imageScale = this._popupSelector.querySelector(".popup__image-scale");
    const imageText = this._popupSelector.querySelector(".popup__image-text");
    imageScale.src = linkImage;
    imageText.textContent = textImage;

    document.addEventListener("keydown", this._handleEscClose);
  }
}
