// Прямо в курсе нас учили, что константы должны быть вынесены: http://joxi.ru/krDP4RaHGJRnJr в отдельный модуль :(

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
        // Я сделал как вы советовали, не работает. Он даже не заходит в функциию _handleOverlayClickClose
        // this._popup.addEventListener('click', () => this._handleOverlayClickClose);
        this._popup.addEventListener('click', this._handleOverlayClickClose.bind(this));
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