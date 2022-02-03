const content = document.querySelector('.content');
const popupSection = content.querySelector('.popup')
const elementTemplate = document.querySelector('#matrix-element-template').content;
const popupTemplate = document.querySelector('#popup-template').content;
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

const editProfileSaveHandler = (evt) => {
    evt.preventDefault();
    syncInputAndFieldsValues(evt.target, evt.target.popupObject, 'field')
    changePopupVisibility()
}

const popups = [{
    id: 'profile-edit',
    title: 'Редактировать профиль',
    relatedButtonSelector: '.profile__button_type_edit',
    submitHandler: editProfileSaveHandler,
    inputs: [{
        id: 'userName',
        placeholder: 'Имя',
        relatedFieldSelector: '.profile__name'
    },{
        id: 'userDescription',
        placeholder: 'Род занятий',
        relatedFieldSelector: '.profile__description'
    }]
}]

function changePopupVisibility (popupObject) {
    // const popup = content.querySelector('#' + popupObject.id)
    let popup = content.querySelector('.popup')
    popup.classList.toggle('popup_opened')
    // TODO add popupObject
}

function openPopup (evt) {
    syncInputAndFieldsValues(evt.target, evt.target.popupObject, 'input')
    changePopupVisibility(evt.target.popupObject)
}

function addElementToMatrix (name, url) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = url;
    element.querySelector('.element__image').alt = name;
    element.querySelector('.element__name').textContent = name;
    const likeButton = element.querySelector('.element__button');

    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_liked');
    });

    matrix.prepend(element);
}

function syncInputAndFieldsValues(popup, popupObject, from) {
    popupObject.inputs.forEach((item) => {
        const input = document.querySelector('#' + item.id);
        const relatedField = document.querySelector(item.relatedFieldSelector);
        if (from === 'input') {
            input.value = relatedField.textContent;
        } else {
            relatedField.textContent = input.value
        }
    })
}


function addPopupToPage(popupObject) {
    const popup = popupTemplate.querySelector('.popup__container').cloneNode(true);
    popup.id = popupObject.id
    popup.querySelector('.popup__title').textContent = popupObject.title;
    const popupForm = popup.querySelector('.popup__form');
    let inputTemplate = document.querySelector('#popup-input').content;
    const popupSubmitButton = popupForm.querySelector('.popup__submit-button')
    popupObject.inputs.forEach((item) => {
        const input = inputTemplate.querySelector('.popup__text-input').cloneNode(true);
        input.placeholder = item.placeholder;
        input.id = item.id
        input.value = content.querySelector(item.relatedFieldSelector).textContent
        popupSubmitButton.before(input)
    })

    const editButton = content.querySelector(popupObject.relatedButtonSelector)
    editButton.popupObject = popupObject
    editButton.addEventListener('click', openPopup)

    popupForm.popupObject = popupObject
    popupForm.addEventListener('submit', popupObject.submitHandler)

    const popupCloseButton = popup.querySelector('.popup__close-button')
    popupCloseButton.popupObject = popupObject
    popupCloseButton.addEventListener('click', changePopupVisibility)

    popupSection.append(popup)
}

function setInitialMatrix() {
    initialCards.forEach((item) => {
        addElementToMatrix(item.name, item.link)
    })
}

function setPagePopups() {
    popups.forEach((item) => {
        addPopupToPage(item)
    })
}

setInitialMatrix()
setPagePopups()
// editButton.addEventListener('click', openPopup)
// popupCloseButton.addEventListener('click', changePopupVisibility)
// popupForm.addEventListener('submit', editProfile)
