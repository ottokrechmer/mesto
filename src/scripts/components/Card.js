export default class Card {
    constructor({data, handleCardClick, handleDeleteClick}, templateSelector, userId) {
        this._name = data.name;
        this._url = data.link;
        this._owner = data.owner;
        this._likes = data.likes;
        this.cardId = data._id
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._templateSelector = templateSelector;
        this._userId = userId;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _checkIsLikedByUser() {
        return this._likes.some((item) => {
            return item._id === this._userId;
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.element__button');
        if (this._checkIsLikedByUser()) {
            this._likeButton.classList.add('element__button_liked');
        }
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._url;
        this._image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__like-count').textContent = this._likes.length;
        this._setEventListeners();

        if (this._owner._id != this._userId) {
            this._deleteButton.remove();
        }

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => {
            this._likeButton.classList.toggle('element__button_liked');
        });

        this._deleteButton.addEventListener('click', (evt) => {
            this._handleDeleteClick(this._element, this.cardId);
        });

        this._image.addEventListener('click', (evt) => {
            this._handleCardClick(this._name, this._url)
        })
    }
}
