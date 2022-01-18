let content = document.querySelector('.content');
let username = content.querySelector('.profile__name')
let userDescription = content.querySelector('.profile__description')
let editButton = content.querySelector('.profile__button_type_edit')
let popup = content.querySelector('.popup')
let popupForm = popup.querySelector('.popup__container')
let popupCloseButton = popup.querySelector('.popup__close-button')
let usernameInput = popup.querySelector('#name')
let descriptionInput = popup.querySelector('#description')

function changePopupVisibility () {
    popup.classList.toggle('popup_opened')
}

function openPopup () {
    usernameInput.value = username.textContent
    descriptionInput.value = userDescription.textContent

    changePopupVisibility()
}

function editProfile (evt) {
    evt.preventDefault();

    username.textContent = usernameInput.value
    userDescription.textContent = descriptionInput.value

    changePopupVisibility()
}

editButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', changePopupVisibility)
popupForm.addEventListener('submit', editProfile)
