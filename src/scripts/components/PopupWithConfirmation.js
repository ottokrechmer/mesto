import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(submitHandler, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._card, this._cardId);
        })
    }

    close() {
        super.close();
    }

    open(card, cardId) {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }
}