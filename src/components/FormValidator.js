export class FormValidator {
  constructor(data, cardSelector) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.formSelector = cardSelector;
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this.inputErrorClass);
    const errorElement = this.formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.add(this.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this.inputErrorClass);
    const errorElement = this.formSelector.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }

  _isValid(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement)
      : this._hideInputError(inputElement);
  }

  _hasValidate(inputForm) {
    return inputForm.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButton() {
    if (this._hasValidate(this._formInputs)) {
      this._buttonForm.classList.add(this.inactiveButtonClass);
      this._buttonForm.setAttribute("disabled", "disabled");
    } else {
      this._buttonForm.classList.remove(this.inactiveButtonClass);
      this._buttonForm.removeAttribute("disabled");
    }
  }

  _setEventListener() {
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._formInputs = Array.from(
      this.formSelector.querySelectorAll(this.inputSelector)
    );
    this._buttonForm = this.formSelector.querySelector(
      this.submitButtonSelector
    );
    this._setEventListener();
  }

  resetValidation() {
    this._toggleButton();

    this._formInputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
