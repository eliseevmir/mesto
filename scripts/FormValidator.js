export class FormValidator {
  constructor (data, cardSelector) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inactiveButtonClass = data.inactiveButtonClass;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.formSelector = cardSelector;
  };

  _showInputError(inputElement) {
    inputElement.classList.add(this.inputErrorClass);
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement) {
    inputElement.classList.remove(this.inputErrorClass);
     const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
     errorElement.classList.remove(this.errorClass);
     errorElement.textContent = "";
  };

  _isValid(inputElement) {
    !inputElement.validity.valid ?
    this._showInputError(inputElement):
    this._hideInputError(inputElement);
  };

  _hasValidate(inputForm) {
    return inputForm.some(input => {
      return !input.validity.valid;
    });
  };

  _toggleButton(buttonForm, inputForm) {
    if (this._hasValidate(inputForm)) {
      buttonForm.classList.add(this.inactiveButtonClass);
      buttonForm.setAttribute("disabled", "disabled");
    } else {
      buttonForm.classList.remove(this.inactiveButtonClass);
      buttonForm.removeAttribute("disabled");
    };
  };

  _setEventListener() {
    const inputForm = Array.from(this.formSelector.querySelectorAll(this.inputSelector));
    const buttonForm = this.formSelector.querySelector(this.submitButtonSelector);

    inputForm.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButton(buttonForm, inputForm);
      });
    });
  };

  enableValidation() {
    this._setEventListener();
  };
};
