import {openPopup, closePopupOnOverlayClick, closePopup, imagePopup} from './popupTools.js'
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'


const buttonsClose = document.querySelectorAll('.popup__close-button');

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
const cardAddButton = document.querySelector('.profile__button_type_add')
const cardPopupForm = cardPopup.querySelector('.popup__form');

const cardList = document.querySelector('.elements');

const selectorObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text-input',
    submitButtonSelector: '.popup__submit-button',
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

function renderCard(name, link) {
    const card = new Card(name, link, '#matrix-element-template');
    cardList.prepend(card.generateCard());
}

function addAllListeners(selectorObject) {
    imagePopup.addEventListener('click', (evt) => closePopupOnOverlayClick(evt.target));

    profilePopup.addEventListener('click', (evt) => closePopupOnOverlayClick(evt.target));
    cardPopup.addEventListener('click', (evt) => closePopupOnOverlayClick(evt.target));
    buttonsClose.forEach((item) => {
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
        const formSection = document.querySelector('.popup-card');
        const form = formSection.querySelector(`${selectorObject.formSelector}`)
        const formValidator = new FormValidator(selectorObject, form);
        formValidator.toggleButtonState();
        openPopup(cardPopup)
    }));
    cardPopupForm.addEventListener('submit', (evt => {
        evt.preventDefault();
        renderCard(imageName.value, imageUrl.value)
        cardPopupForm.reset();
        closePopup(cardPopup);
    }));
}

function setInitialCardList() {
    initialCards.forEach((item) => {
        renderCard(item.name, item.link);
    })
}

function enableValidation(selectorObject) {
    // И снова прошу прощения, но не понял, зачем делать две формы отдельными переменными?
    const formList = Array.from(document.querySelectorAll(`${selectorObject.formSelector}`));
    formList.forEach((form) => {
        const newForm = new FormValidator(selectorObject, form)
        newForm.enableValidation()
    });
}

enableValidation(selectorObject);

setInitialCardList()
addAllListeners(selectorObject)