import {openPopup, closePopupOnOverlayClick, closePopup} from './popupTools.js'
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'


const closeButtons = document.querySelectorAll('.popup__close-button');

const profilePopup = document.querySelector('.popup-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const userName = profilePopup.querySelector('#userName');
const userDescription = profilePopup.querySelector('#userDescription');
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const cardPopup = document.querySelector('.popup-card');
const imageName = cardPopup.querySelector('#imageName');
const imageUrl = cardPopup.querySelector('#imageUrl');
const cardPopupSubmitButton = cardPopup.querySelector('.popup__submit-button');
const cardAddButton = document.querySelector('.profile__button_type_add')
const cardPopupForm = cardPopup.querySelector('.popup__form');

const cardList = document.querySelector('.elements');

const selectorObject = {
    formSelector: 'popup__form',
    inputSelector: 'popup__text-input',
    submitButtonSelector: 'popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
    errorClassVisible: 'popup__error_visible'
};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addAllListeners() {

    profilePopup.addEventListener('click', (evt) => closePopupOnOverlayClick(evt.target));
    cardPopup.addEventListener('click', (evt) => closePopupOnOverlayClick(evt.target));
    closeButtons.forEach((item) => {
        item.addEventListener('click', () => {closePopup(item.closest('.popup'))})
    });
    profileEditButton.addEventListener('click', (evt => {
        userName.value = profileName.textContent;
        userDescription.value = profileDescription.textContent;
        openPopup(profilePopup);
    }));
    profilePopupForm.addEventListener('submit', (evt => {
        evt.preventDefault();
        profileName.textContent = userName.value;
        profileDescription.textContent = userDescription.value;
        closePopup(profilePopup);
    }));
    cardAddButton.addEventListener('click', (evt => {
        cardPopupSubmitButton.classList.add('popup__submit-button_disabled')
        cardPopupSubmitButton.setAttribute('disabled', 'disabled')
        openPopup(cardPopup)
    }));
    cardPopupForm.addEventListener('submit', (evt => {
        evt.preventDefault();
        const card = new Card(imageName.value, imageUrl.value, '#matrix-element-template')
        cardList.prepend(card.generateCard())
        cardPopupForm.reset();
        closePopup(cardPopup);
    }));
}

function setInitialCardList() {
    initialCards.forEach((item) => {
        const card = new Card(item.name, item.link, '#matrix-element-template')
        cardList.append(card.generateCard());
    })
}

function enableValidation(selectorObject) {
    const formList = Array.from(document.querySelectorAll(`.${selectorObject.formSelector}`));
    formList.forEach((form) => {
        const newForm = new FormValidator(selectorObject, form)
        newForm.enableValidation()
    });
}

enableValidation(selectorObject);

setInitialCardList()
addAllListeners()