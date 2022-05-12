export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  };

  _handleEscClose = (event) => {
     if (event.key === "Escape") {
       this.close();
    };
  };

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("mousedown", this.setEventListeners);
  };

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("mousedown", this.setEventListeners);
  };

  setEventListeners = (event) => {
    if (event.target.classList.contains("popup") || event.target.classList.contains("popup__close")) {
    this.close();
    };
  };

};
