export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendererItems = items;
    this._renderer = renderer;
    this._rendererSelector = containerSelector;
  }

  rendererCards() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._rendererSelector.append(cardElement);
  }
}
