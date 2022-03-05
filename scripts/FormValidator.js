class FormValidator {
    constructor(selectorObject, form) {
        this._form = form
        this._inputList = Array.from(this._form.querySelectorAll(`.${selectorObject.inputSelector}`));
        this._button = this._form.querySelector(`.${selectorObject.submitButtonSelector}`);
        this._inactiveButtonClass = selectorObject.inactiveButtonClass;
        this._inputErrorClass = selectorObject.inputErrorClass;
        this._errorClassVisible = selectorObject.errorClassVisible;
    }

    enableValidation() {
        this._form.setAttribute('novalidate', 'novalidate')
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
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

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._button.classList.add(`${this._inactiveButtonClass}`);
            this._button.setAttribute('disabled', 'disabled')
        } else {
            this._button.classList.remove(`${this._inactiveButtonClass}`);
            this._button.removeAttribute('disabled')
        }
    };
}

export {FormValidator}