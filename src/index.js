import Card from "./scripts/components/Card";
import Section from "./scripts/components/Section";
import { cardAddButtonSelector, 
    cardListSelector,
    cardPopupSelector,
    initialCards, 
    matrixTemplateSelector, 
    popupImageSelector, 
    profileDescriptionSelector, 
    profileEditButtonSelector, 
    profileNameSelector, 
    profilePopupSelector,
    inactiveButtonClass, 
    popupTextInputSelector, 
    submitButtonSelector, 
    inputErrorClass, 
    errorClassVisible } from "./scripts/utils/constants";
import './pages/index.css';
import PopupWithImage from "./scripts/components/PopupWithImage";
import PopupWithForm from "./scripts/components/PopupWithForm";
import UserInfo from "./scripts/components/UserInfo";
import FormValidator from "./scripts/components/FormValidator";


const imagePopup = new PopupWithImage(popupImageSelector);
const profileEditButton = document.querySelector(profileEditButtonSelector);
const cardAddButton = document.querySelector(cardAddButtonSelector);
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);
const section = new Section({
    items: initialCards,
    renderer: cardRenderer
}, cardListSelector)
const profilePopup = new PopupWithForm(
    function (inputValues) {
        userInfo.setUserInfo(inputValues);
        profilePopup.close();
    }, profilePopupSelector)

const profilePopupValidator = new FormValidator({
    inactiveButtonClass, 
    popupTextInputSelector, 
    submitButtonSelector, 
    inputErrorClass, 
    errorClassVisible}, '.popup-profile'
)
const addCardPopup = new PopupWithForm(
    function (inputValues) {
        cardRenderer({
            name: inputValues.imageName,
            link: inputValues.imageUrl
        });
        addCardPopup.close();
    }, cardPopupSelector)

const addCardPopupValidator = new FormValidator({
    inactiveButtonClass, 
    popupTextInputSelector, 
    submitButtonSelector, 
    inputErrorClass, 
    errorClassVisible}, '.popup-card'
)


function createCard(element) {
    const card = new Card({
        name: element.name,
        url: element.link,
        handleCardClick: (name, url) => {
            imagePopup.open(name, url);
        }
    }, matrixTemplateSelector)
    return card.generateCard();
}

function cardRenderer(element) {
    const cardElement = createCard(element);
    section.addItem(cardElement);
}

function setInitialCardList() {
    section.render();
}

function setEventListeners() {
    cardAddButton.addEventListener('click', (evt => {
        addCardPopup.open();
        addCardPopupValidator.toggleInputState();
    }));
    profileEditButton.addEventListener('click', (evt => {
        profilePopup.setInitialValues(userInfo.getUserInfo())
        profilePopup.open();
        profilePopupValidator.toggleInputState();
    }));
    addCardPopup.setEventListeners();
    profilePopup.setEventListeners();
    imagePopup.setEventListeners();
}

function enableValidation() {
    profilePopupValidator.enableValidation();
    addCardPopupValidator.enableValidation();
}

setInitialCardList();
setEventListeners();
enableValidation();