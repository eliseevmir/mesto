import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(_popupSelector, callBackSubmit) {
    super(_popupSelector);
    this._submitForm = callBackSubmit;
  }

  getInputValues() {
    this.form = this._popupSelector.querySelector(".popup__form");
    this.input = Array.from(this.form.querySelectorAll(".popup__input"));
    this.inputValues = {};

    this.input.forEach((element) => {
      this.inputValues[element.name] = element.value;
    });
    return this.inputValues;
  }

  setEventListeners() {
    this.getInputValues();
    this.form.addEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
    this.form.reset()
  }
}
