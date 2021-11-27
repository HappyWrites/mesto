class FormValidator {
  constructor(initialConfig, formName) {
    this._formSelector = initialConfig.formSelector;
    this._inputSelector = initialConfig.inputSelector;
    this._submitButtonSelector = initialConfig.submitButtonSelector;
    this._inactiveButtonClass = initialConfig.inactiveButtonClass;
    this._inputErrorClass = initialConfig.inputErrorClass;
    this._errorClass = initialConfig.errorClass;
    this._initialConfig = initialConfig;
    this._formName = formName;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formName.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formName.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  };

  _toggleButtonState = (inputList, buttonElement, buttonInactiveClass) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(buttonInactiveClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(buttonInactiveClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    const buttonElement = this._formName.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  resetErrorForm(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const submitButton = form.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState(inputList, submitButton, this._inactiveButtonClass);
  };
}

const initialConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

export { FormValidator, initialConfig };
