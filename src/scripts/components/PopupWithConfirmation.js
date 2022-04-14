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
            this._submitHandler(this._card);
        })
    }

    close() {
        super.close();
    }

    open(card) {
        super.open();
        this._card = card;
    }
}