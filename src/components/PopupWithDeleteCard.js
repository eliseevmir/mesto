import { Popup } from "./Popup.js";

export class PopupWithDeleteCard extends Popup {
  constructor(_popupSelector, callBackSubmit) {
    super(_popupSelector);
    this._confirmDelete = callBackSubmit;
  }

  close() {
    super.close();
    this.btn.removeEventListener("click", this._confirmDelete);
  }

  open() {
    super.open();
    this.btn = this._popupSelector.querySelector(".popup__button");
    this.btn.addEventListener("click", this._confirmDelete);
  }

}
