const content = document.querySelector('.content');
const popupSection = content.querySelector('.popup')
const elementTemplate = document.querySelector('#matrix-element-template').content;
const closeButtons = document.querySelectorAll('.popup__close-button');

const profilePopup = document.querySelector('.popup__container_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const userName = profilePopup.querySelector('#userName');
const userDescription = profilePopup.querySelector('#userDescription');
const profileEditButton = document.querySelector('.profile__button_type_edit');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const cardPopup = document.querySelector('.popup__container_card');
const imageName = cardPopup.querySelector('#imageName');
const imageUrl = cardPopup.querySelector('#imageUrl');
const elementAddButton = document.querySelector('.profile__button_type_add')
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup__container_image');
const bigImage = imagePopup.querySelector('.popup__image');
const matrix = document.querySelector('.elements');

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

function openPopup(popup) {
    popupSection.classList.add('popup_opened')
    popup.classList.add('popup__container_opened')
}

function closePopup(popup) {
    popupSection.classList.remove('popup_opened')
    popup.classList.remove('popup__container_opened')
}

function addListenersToAllButtons() {
    closeButtons.forEach((item) => {
        item.addEventListener('click', (evt) => {closePopup(evt.target.parentElement)})
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
    elementAddButton.addEventListener('click', (evt => {openPopup(cardPopup)}));
    cardPopupForm.addEventListener('submit', (evt => {
        evt.preventDefault();
        addElementToMatrix(imageName.value, imageUrl.value);
        imageName.value = '';
        imageUrl.value = '';
        closePopup(cardPopup);
    }));
}

function addElementToMatrix (name, url) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    image.src = url;
    image.alt = name;
    element.querySelector('.element__name').textContent = name;

    const likeButton = element.querySelector('.element__button');
    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__button_liked');
    });

    const deleteButton = element.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', (evt) => {
        const elementToDelete = deleteButton.closest('.element');
        elementToDelete.remove();
    });

    image.addEventListener('click', (evt) => {
        bigImage.alt = name
        bigImage.src = url
        imagePopup.querySelector('.popup__description-text').textContent = name

        openPopup(imagePopup)
    })

    matrix.prepend(element);
}

function setInitialMatrix() {
    initialCards.forEach((item) => {
        addElementToMatrix(item.name, item.link)
    })
}

setInitialMatrix()
addListenersToAllButtons()