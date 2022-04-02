import {closeButtonSelector, popupOpenedSelector} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(closeButtonSelector);
    }

    open() {
        this._popup.classList.add(popupOpenedSelector);
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove(popupOpenedSelector);
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClickClose.bind(this));
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