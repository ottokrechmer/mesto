export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this)
        this._popupOpenedSelector = 'popup_opened'
    }

    open() {
        this._popup.classList.add(this._popupOpenedSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupOpenedSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => this._handleOverlayClickClose(evt));
        this._closeButton.addEventListener('click', this.close.bind(this));
    }

    _handleOverlayClickClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}