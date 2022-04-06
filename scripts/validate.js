const validSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


const showInputError = (formElement, inputElement, messageError, {inputErrorClass, errorClass}) => {
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = messageError;
};


const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  inputElement.classList.remove(inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};


function isValid (formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  };
};


function setEventListener(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonForm = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => inputElement.addEventListener("input", () => {
    isValid(formElement, inputElement, rest);
    toggleButton(buttonForm, inputList, inactiveButtonClass);
  }));
};


function enableValidation({formSelector, ...rest}) {

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    setEventListener(formElement, rest)
  });
};


function hasValidate(inputAll) {
  return inputAll.some(input => {
    return !input.validity.valid
  });
};


function toggleButton(button, inputAll, inactiveButton) {
  if (hasValidate(inputAll)) {
    button.classList.add(inactiveButton);
    button.setAttribute("disabled", "disabled");
  } else {
    button.classList.remove(inactiveButton);
    button.removeAttribute("disabled");
  };
};


enableValidation(validSet);
