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
    renderer: cardRenderer
}, cardListSelector)

const avatarPopup = new PopupWithForm(
    function (inputValues) {
        avatarPopup._submitButton.textContent = 'Сохранение...'
        api.editUserAvatar(inputValues.avatarUrl)
            .then((res) => {
                userInfo.setUserAvatar(res.avatar);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                avatarPopup._submitButton.textContent = 'Сохранить'
            });
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
        profilePopup._submitButton.textContent = 'Сохранение...'
        api.editUserProfile(inputValues.userName, inputValues.userDescription)
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                profilePopup._submitButton.textContent = 'Сохранить'
            });
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
        addCardPopup._submitButton.textContent = 'Сохранение...'
        api.addNewCard(inputValues.imageName, inputValues.imageUrl)
            .then((res) => {
                cardRenderer(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                addCardPopup._submitButton.textContent = 'Сохранить'
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
        deleteConfigmationPopup._submitButton.textContent = 'Удаление...'
        api.deleteCard(card.cardId)
            .then(() => {
                card._element.remove();
                card._element = null;
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

function cardRenderer(element) {
    const cardElement = createCard(element);
    section.addItem(cardElement);
}

function setInitialCardList() {
    api.getCardList()
        .then((res) => {
            section.setItems(res);
            section.render();
        })
        .catch((err) => {
            console.log(err);
    });
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

function setUserInfo() {
    api.getUserInfo()
        .then((result) => {
            userInfo.setUserInfo(result.name, result.about);
            userInfo.setUserAvatar(result.avatar);
            userInfo.setUserId(result._id);
        })
        .catch((err) => {
            console.log(err);
    });
}


setInitialCardList();
setEventListeners();
enableValidation();
setUserInfo();