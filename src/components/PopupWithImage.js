import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(_popupSelector) {
    super(_popupSelector);
  }

  open(textImage, linkImage) {
    super.open();

    const imageScale = this._popupSelector.querySelector(".popup__image-scale");
    const imageText = this._popupSelector.querySelector(".popup__image-text");
    imageScale.src = linkImage;
    imageText.textContent = textImage;
  }
}
