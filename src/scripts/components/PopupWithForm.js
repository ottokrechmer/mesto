import FormValidator from "../FormValidator";
import { popupTextInputSelector, popupFormSelector } from "../utils/constants";
import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor({submitHandler}, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formValues = {};
        this._popupForm = this._popup.querySelector(popupFormSelector)
        this._validationClass = new FormValidator(this._popupForm)
        this._validationClass.enableValidation();
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll(popupTextInputSelector);
        this._inputList.forEach(input => {
          this._formValues[input.id] = input.value;
        });
        return this._formValues;
      }
    
    setInitialValues(values) {
        this._inputList = this._popup.querySelectorAll(popupTextInputSelector);
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
        super.open();
        this._validationClass.toggleButtonState();
    }
}