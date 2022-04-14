export default class FormValidator {
    constructor(data, popupSelector) {
        this._form = document.querySelector(popupSelector).querySelector('.popup__form')
        this._inputList = Array.from(this._form.querySelectorAll(data.popupTextInputSelector));
        this._button = this._form.querySelector(data.submitButtonSelector);
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClassVisible = data.errorClassVisible;
    }

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            // Нет, я делаю preventDefault только в PopupWithConfirmation, так как у него нет инпутов и, следовательно, нет класса-валидатора.
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.toggleButtonState();
            });
        })
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    };

    _showInputError(input, errorMessage) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(`${this._inputErrorClass}`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._errorClassVisible}`);
    };

    _hideInputError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(`${this._inputErrorClass}`);
        errorElement.classList.remove(`${this._errorClassVisible}`);
        errorElement.textContent = '';
    };

    _hasInvalidInput() {
        return this._inputList.some((item) => {
            return !item.validity.valid;
        })
    };

    toggleInputState() {
        this._inputList.forEach((input) => {this._hideInputError(input)})
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._button.classList.add(`${this._inactiveButtonClass}`);
            this._button.setAttribute('disabled', 'disabled')
        } else {
            this._button.classList.remove(`${this._inactiveButtonClass}`);
            this._button.removeAttribute('disabled')
        }
    };
}

