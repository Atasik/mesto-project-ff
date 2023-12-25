const showInputError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const popupButton = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.errorClass, validationConfig.inputErrorClass);
        toggleButtonState(inputList, popupButton, validationConfig.inactiveButtonClass);
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass);
    } else {
        enableButton(buttonElement, inactiveButtonClass);
    }
};

const enableButton = (button, settings) => {
    button.disabled = false;
    button.classList.remove(settings);
}

const disableButton = (button, settings) => {
    button.disabled = true;
    button.classList.add(settings);
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        const popupButton = formElement.querySelector(validationConfig.submitButtonSelector);

        toggleButtonState(inputList, popupButton, validationConfig.inactiveButtonClass);

        formElement.addEventListener('reset', () => {
            disableButton(popupButton, validationConfig.inactiveButtonClass)
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement, validationConfig.errorClass, validationConfig.inputErrorClass);
                toggleButtonState(inputList, popupButton, validationConfig.inactiveButtonClass);
            });
        });
    });
};

const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    } else {
        hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
};