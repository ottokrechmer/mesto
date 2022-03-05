import {closePopupOnOverlayClick, openPopup} from './popupTools.js'

const imagePopup = document.querySelector('.popup-image');
const bigImage = imagePopup.querySelector('.popup__image');
const imageDescription = imagePopup.querySelector('.popup__description-text')


class Card {
    constructor(name, url, templateSelector) {
        this._name = name;
        this._url = url;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();

        this._image = this._element.querySelector('.element__image');
        this._image.src = this._url;
        this._image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector('.element__button');
        likeButton.addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__button_liked');
        });

        const deleteButton = this._element.querySelector('.element__delete-button');
        deleteButton.addEventListener('click', (evt) => {
            const elementToDelete = deleteButton.closest('.element');
            elementToDelete.remove();
        });

        this._image.addEventListener('click', (evt) => {
            bigImage.alt = this._name;
            bigImage.src = this._url;
            imageDescription.textContent = this._name;

            openPopup(imagePopup)
        })
    }
}

imagePopup.addEventListener('click', (evt) => closePopupOnOverlayClick(evt.target));

export {Card}