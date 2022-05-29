export class Section {
  constructor({ items, renderer }, cardContainer) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._rendererConteiner = cardContainer;
  }

  rendererCards() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }

  prependItem(cardElement) {
    this._rendererConteiner.prepend(cardElement);
  }

  addItem(cardElement) {
    this._rendererConteiner.append(cardElement);
  }
}
