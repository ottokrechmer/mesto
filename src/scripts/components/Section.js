export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items,
        this._renderer = renderer,
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    render() {
        this._items.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}