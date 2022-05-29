import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(_popupElement, imageScale, ImageText) {
    super(_popupElement);
    this._imageScale = imageScale;
    this._imageText = ImageText;
  }

  open(textImage, linkImage) {
    super.open();

    this._imageScale.src = linkImage;
    this._imageScale.alt = textImage;
    this._imageText.textContent = textImage;
  }
}
