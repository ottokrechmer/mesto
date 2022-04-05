// Зачем убирать константы? Чтобы хардкодить строки селекторов прям в классе? Не лучше ли оставить все константы в соответсвующем файле?
import {closeButtonSelector, popupOpenedSelector} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(closeButtonSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add(popupOpenedSelector);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(popupOpenedSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        // Здесь без бинда не работает, потому что прилетает же не этот класс
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