export default class Card {
    constructor({name, url, handleCardClick, handleDeleteClick}, templateSelector) {
        this._name = name;
        this._url = url;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
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
        this._likeButton = this._element.querySelector('.element__button');

        this._image = this._element.querySelector('.element__image');
        this._image.src = this._url;
        this._image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => {
            this._likeButton.classList.toggle('element__button_liked');
        });

        const deleteButton = this._element.querySelector('.element__delete-button');
        deleteButton.addEventListener('click', (evt) => {
            // this._element.remove();
            // this._element = null;
            this._handleDeleteClick(this._element);
        });

        this._image.addEventListener('click', (evt) => {
            this._handleCardClick(this._name, this._url)
        })
    }
}
