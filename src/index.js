import Card from "./scripts/components/Card";
import Section from "./scripts/components/Section";
import { cardAddButton, 
    cardListSelector,
    cardPopupSelector,
    initialCards, 
    matrixTemplateSelector, 
    popupImageSelector, 
    profileDescriptionSelector, 
    profileEditButton, 
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

function createCard(element) {
    return new Card({
        name: element.name,
        url: element.link,
        handleCardClick: (name, url) => {
            imagePopup.open(name, url);
            imagePopup.setEventListeners();
        }
    }, matrixTemplateSelector)
}

const cardRenderer = (element) => {
    const card = createCard(element);
    const cardElement = card.generateCard();
    section.addItem(cardElement);
}

const section = new Section({
    items: initialCards,
    renderer: cardRenderer
}, cardListSelector)

function setInitialCardList() {
    section.render();
}

const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);

const profilePopup = new PopupWithForm({
    submitHandler: (inputValues) => {
        // Не очень понял замечание - параметры же возвращает функция _getInputValues
        userInfo.setUserInfo(inputValues);
        profilePopup.close();
    },
    validationHandler: (popupForm) => {
        return new FormValidator({
            inactiveButtonClass, 
            popupTextInputSelector, 
            submitButtonSelector, 
            inputErrorClass, 
            errorClassVisible}, popupForm)
    }
}, profilePopupSelector)

const addCardPopup = new PopupWithForm({
    submitHandler: (inputValues) => {
        cardRenderer({
            name: inputValues.imageName,
            link: inputValues.imageUrl
        });
        addCardPopup.close();
    },
    validationHandler: (popupForm) => {
        return new FormValidator({
            inactiveButtonClass, 
            popupTextInputSelector, 
            submitButtonSelector, 
            inputErrorClass, 
            errorClassVisible}, popupForm)
    }
}, cardPopupSelector)

function setButtonsEventListeners() {
    cardAddButton.addEventListener('click', (evt => {
        addCardPopup.open();
        addCardPopup.validationClass.toggleInputState();
    }));
    profileEditButton.addEventListener('click', (evt => {
        profilePopup.setInitialValues(userInfo.getUserInfo())
        profilePopup.open();
        profilePopup.validationClass.toggleInputState();
    }));
    addCardPopup.setEventListeners();
    profilePopup.setEventListeners();
}

setInitialCardList();
setButtonsEventListeners();