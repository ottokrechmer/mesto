import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(submitHandler, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._inputList = this._popup.querySelectorAll('.popup__text-input');
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const formValues = {}
        this._inputList.forEach(input => {
            formValues[input.id] = input.value;
        });
        return formValues;
      }
    
    setInitialValues(values) {
        this._inputList.forEach(input => {
          input.value = values[input.id];
        });
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            this._submitHandler(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    open() {
        super.open();
    }
}