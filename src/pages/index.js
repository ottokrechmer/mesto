import Card from "../scripts/components/Card";
import Section from "../scripts/components/Section";
import { cardAddButtonSelector, 
    cardListSelector,
    cardPopupSelector,
    matrixTemplateSelector, 
    popupImageSelector, 
    profileDescriptionSelector, 
    profileEditButtonSelector, 
    profileNameSelector, 
    profilePopupSelector,
    deletePopupSelector,
    avatarSelector,
    avatarPopupSelector,
    validationObject} from "../scripts/utils/constants";
import './index.css';
import PopupWithImage from "../scripts/components/PopupWithImage";
import PopupWithForm from "../scripts/components/PopupWithForm";
import UserInfo from "../scripts/components/UserInfo";
import FormValidator from "../scripts/components/FormValidator";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";
import Api from "../scripts/components/Api";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '8ba23565-e2b5-43ed-a77b-a5d2ecde101d',
      'Content-Type': 'application/json'
    }
  });
const imagePopup = new PopupWithImage(popupImageSelector);
const profileEditButton = document.querySelector(profileEditButtonSelector);
const cardAddButton = document.querySelector(cardAddButtonSelector);
const avatar = document.querySelector(avatarSelector);
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector, avatarSelector);
const section = new Section({
    renderer: renderCard
}, cardListSelector)

const avatarPopup = new PopupWithForm(
    function (inputValues) {
        avatarPopup._submitButton.textContent = 'Сохранение...'
        api.editUserAvatar(inputValues.avatarUrl)
            .then((res) => {
                userInfo.setUserAvatar(res.avatar);
                avatarPopup.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                avatarPopup._submitButton.textContent = 'Сохранить'
            });
    }, avatarPopupSelector)

const avatarPopupValidator = new FormValidator(validationObject, '.popup-avatar')

const profilePopup = new PopupWithForm(
    function (inputValues) {
        profilePopup._submitButton.textContent = 'Сохранение...'
        api.editUserProfile(inputValues.userName, inputValues.userDescription)
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about);
                profilePopup.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                profilePopup._submitButton.textContent = 'Сохранить'
            });
    }, profilePopupSelector)

const profilePopupValidator = new FormValidator(validationObject, '.popup-profile')

const addCardPopup = new PopupWithForm(
    function (inputValues) {
        addCardPopup._submitButton.textContent = 'Сохранение...'
        api.addNewCard(inputValues.imageName, inputValues.imageUrl)
            .then((res) => {
                renderCard(res);
                addCardPopup.close();
                // Спасибо большое, простите, уже, видимо, голова не варит :)
                addCardPopupValidator.toggleButtonState();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                addCardPopup._submitButton.textContent = 'Сохранить'
            });
    }, cardPopupSelector)

const addCardPopupValidator = new FormValidator(validationObject, '.popup-card')

const deleteConfigmationPopup = new PopupWithConfirmation(
    function (card) {
        deleteConfigmationPopup._submitButton.textContent = 'Удаление...'
        api.deleteCard(card.cardId)
            .then(() => {
                card.deleteCard();
                deleteConfigmationPopup.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                deleteConfigmationPopup._submitButton.textContent = 'Ок'
            });
    }, deletePopupSelector)

function createCard(element) {
    const card = new Card({
        data: element,
        handleCardClick: (name, url) => {
            imagePopup.open(name, url);
        },
        handleDeleteClick: (card) => {
            deleteConfigmationPopup.open(card);
        },
        handleLikeClick: (card) => {
            if (!card._isLiked) {
                api.addLikeToCard(card.cardId)
                    .then((res) => {
                        card._likeButton.classList.toggle('element__button_liked');
                        card._likeCount.textContent = res.likes.length;
                        card._isLiked = true;
                    })
                    .catch((err) => {
                        console.log(err);
                });
            } else {
                api.removeLikeFromCard(card.cardId)
                    .then((res) => {
                        card._likeButton.classList.toggle('element__button_liked');
                        card._likeCount.textContent = res.likes.length;
                        card._isLiked = false;
                    })
                    .catch((err) => {
                        console.log(err);
                });
            }
        }
    }, matrixTemplateSelector, userInfo.getUserId())
    return card.generateCard();
}

function renderCard(element) {
    const cardElement = createCard(element);
    section.addItem(cardElement);
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

function getInitPageData() {
    Promise.all([
        api.getUserInfo(),
        api.getCardList()
    ])
    .then((values) => {
        userInfo.setUserInfo(values[0].name, values[0].about);
        userInfo.setUserAvatar(values[0].avatar);
        userInfo.setUserId(values[0]._id);
        section.setItems(values[1]);
        section.render();
    })
    .catch((err) => {
        console.log(err);
    })
}

getInitPageData();
setEventListeners();
enableValidation();