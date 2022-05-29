import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(_popupElement, callBackSubmit) {
    super(_popupElement);
    this._submitForm = callBackSubmit;
  }

  getInputValues() {
    this._formInputs.forEach((element) => {
      this.inputValues[element.name] = element.value;
    });
    return this.inputValues;
  }

  setEventListeners() {
    this._form = this._popupElement.querySelector(".popup__form");
    this._formInputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this.inputValues = {};

    this._form.addEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
