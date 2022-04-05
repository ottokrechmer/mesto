import { popupTextInputSelector, popupFormSelector } from "../utils/constants";
import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({submitHandler, validationHandler}, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._inputList = this._popup.querySelectorAll(popupTextInputSelector);
        this._popupForm = this._popup.querySelector(popupFormSelector);
        this.validationClass = validationHandler(this._popupForm);
        this.validationClass.enableValidation();
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
            this._submitHandler(evt);
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    open() {
        this.validationClass.toggleInputState();
        super.open();
    }
}