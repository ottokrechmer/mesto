export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer,
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    setItems(items) {
        this._items = items;
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