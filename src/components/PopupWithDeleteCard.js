import { Popup } from "./Popup.js";

export class PopupWithDeleteCard extends Popup {
  constructor(_popupElement, callBackSubmit) {
    super(_popupElement);
    this._confirmDelete = callBackSubmit;
  }

  open(card) {
    super.open();
    this.card = card;
  }

  setEventListeners() {
    this._buttonConfirmPopup =
      this._popupElement.querySelector(".popup__button");
    this._buttonConfirmPopup.addEventListener("click", () => {
      this._confirmDelete(this.card);
    });
  }
}
