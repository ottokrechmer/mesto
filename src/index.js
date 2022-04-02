import Card from "./scripts/components/Card";
import Section from "./scripts/components/Section";
import { cardAddButton, cardListSelector, cardPopupSelector, initialCards, matrixTemplateSelector, popupImageSelector, profileDescription, profileEditButton, profileName, profilePopupSelector } from "./scripts/utils/constants";
import './pages/index.css';
import PopupWithImage from "./scripts/components/PopupWithImage";
import PopupWithForm from "./scripts/components/PopupWithForm";
import UserInfo from "./scripts/components/UserInfo";


const cardRenderer = (element) => {
    const card = new Card({
        name: element.name,
        url: element.link,
        handleCardClick: (name, url) => {
            const popup = new PopupWithImage({
                imageName: name,
                imageUrl: url
            }, popupImageSelector)
            popup.open();
            popup.setEventListeners();
        }
    }, matrixTemplateSelector)
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

const userInfo = new UserInfo();

const profilePopup = new PopupWithForm({
    submitHandler: (evt) => {
        evt.preventDefault();
        userInfo.setUserInfo(profilePopup._getInputValues());
        profilePopup.close();
    }
}, profilePopupSelector)

const addCardPopup = new PopupWithForm({
    submitHandler: (evt) => {
        evt.preventDefault();
        const values = addCardPopup._getInputValues();
        cardRenderer({
            name: values.imageName,
            link: values.imageUrl
        });
        addCardPopup.close();
    }
}, cardPopupSelector)

function setButtonsEventListeners() {
    cardAddButton.addEventListener('click', (evt => {
        addCardPopup.open();
    }));
    profileEditButton.addEventListener('click', (evt => {
        profilePopup.setInitialValues({
            userName: profileName.textContent,
            userDescription: profileDescription.textContent
        })
        profilePopup.open();
    }));
    addCardPopup.setEventListeners();
    profilePopup.setEventListeners();
}

setInitialCardList();
setButtonsEventListeners();