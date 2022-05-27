import { Popup } from "./Popup.js";

export class PopupWithAvatar extends Popup {
  constructor(_popupSelector, callBackSubmit) {
    super(_popupSelector);
    this._submitForm = callBackSubmit;
  }

  _getInputValues() {
    this.form = this._popupSelector.querySelector(".popup__form");
    this.input = this.form.querySelector(".popup__input");
    return this.input.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._getInputValues();

    this.form.addEventListener("submit", this._submitForm);
  }
}
