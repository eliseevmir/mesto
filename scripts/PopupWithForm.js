import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(_popupSelector, callBackSubmit) {
    super(_popupSelector);
    this._submitForm = callBackSubmit;
  };

  _getInputValues() {
    this.form = this._popupSelector.querySelector(".popup__form");
    this.input = Array.from(this.form.querySelectorAll(".popup__input"));
    return this.input;
  };

  setEventListeners = (event) => {
    this._getInputValues();
    this.form.addEventListener("submit", this._submitForm);

    if (event.target.classList.contains("popup") || event.target.classList.contains("popup__close")) {
    this.close();
    };
  };
};




