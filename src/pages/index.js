import Card from "../scripts/components/Card";
import Section from "../scripts/components/Section";
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
    errorClassVisible, 
    deletePopupSelector,
    avatarSelector,
    avatarPopupSelector} from "../scripts/utils/constants";
import './index.css';
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import UserInfo from "../scripts/components/UserInfo";
import FormValidator from "../scripts/components/FormValidator";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";


const imagePopup = new PopupWithImage(popupImageSelector);
const profileEditButton = document.querySelector(profileEditButtonSelector);
const cardAddButton = document.querySelector(cardAddButtonSelector);
const avatar = document.querySelector(avatarSelector);
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector, avatarSelector);
const section = new Section({
    items: initialCards,
    renderer: cardRenderer
}, cardListSelector)

const avatarPopup = new PopupWithForm(
    function (inputValues) {
        userInfo.setUserAvatar(inputValues);
        avatarPopup.close();
    }, avatarPopupSelector)

const avatarPopupValidator = new FormValidator({
    inactiveButtonClass, 
    popupTextInputSelector, 
    submitButtonSelector, 
    inputErrorClass, 
    errorClassVisible}, '.popup-avatar'
)

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

const deleteConfigmationPopup = new PopupWithConfirmation(
    function (card) {
        card.remove();
        card = null;
        deleteConfigmationPopup.close();
    }, deletePopupSelector)

function createCard(element) {
    const card = new Card({
        name: element.name,
        url: element.link,
        handleCardClick: (name, url) => {
            imagePopup.open(name, url);
        },
        handleDeleteClick: (card) => {
            deleteConfigmationPopup.open(card);
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
    avatar.addEventListener('click', (evt => {
        avatarPopup.setInitialValues(userInfo.getUserAvatar())
        avatarPopup.open();
        avatarPopupValidator.toggleInputState();
    }));
    addCardPopup.setEventListeners();
    profilePopup.setEventListeners();
    imagePopup.setEventListeners();
    avatarPopup.setEventListeners();
    deleteConfigmationPopup.setEventListeners();
}

function enableValidation() {
    profilePopupValidator.enableValidation();
    addCardPopupValidator.enableValidation();
    avatarPopupValidator.enableValidation();
}

setInitialCardList();
setEventListeners();
enableValidation();