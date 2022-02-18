const showInputError = (selectorObject, form, input, errorMessage) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(`${selectorObject.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${selectorObject.errorClassVisible}`);
};

const hideInputError = (selectorObject, form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(`${selectorObject.inputErrorClass}`);
    errorElement.classList.remove(`${selectorObject.errorClassVisible}`);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((item) => {
        return !item.validity.valid;
    })
};

const toggleButtonState = (selectorObject, inputList, button) => {
    if (hasInvalidInput(inputList)) {
        button.classList.add(`${selectorObject.inactiveButtonClass}`);
        button.setAttribute('disabled', 'disabled')
    } else {
        button.classList.remove(`${selectorObject.inactiveButtonClass}`);
        button.removeAttribute('disabled')
    }
};

const checkInputValidity = (selectorObject, form, input) => {
    if (!input.validity.valid) {
        showInputError(selectorObject, form, input, input.validationMessage);
    } else {
        hideInputError(selectorObject, form, input);
    }
};

const setEventListeners = (selectorObject, form) => {
    const inputList = Array.from(form.querySelectorAll(`.${selectorObject.inputSelector}`));
    const button = form.querySelector(`.${selectorObject.submitButtonSelector}`);
    toggleButtonState(selectorObject, inputList, button);
    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            checkInputValidity(selectorObject, form, input);
            toggleButtonState(selectorObject, inputList, button);
        });
    });
};

const enableValidation = (selectorObject) => {
    const formList = Array.from(document.querySelectorAll(`.${selectorObject.formSelector}`));
    formList.forEach((form) => {
        form.setAttribute('novalidate', 'novalidate')
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(selectorObject, form);
    });
};


enableValidation({
    formSelector: 'popup__form',
    inputSelector: 'popup__text-input',
    submitButtonSelector: 'popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error',
    errorClassVisible: 'popup__error_visible'
});