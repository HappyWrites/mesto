export class FormValidator {
  constructor(initialConfig, formName) {
    this._formSelector = initialConfig.formSelector;
    this._inputSelector = initialConfig.inputSelector;
    this._submitButtonSelector = initialConfig.submitButtonSelector;
    this._inactiveButtonClass = initialConfig.inactiveButtonClass;
    this._inputErrorClass = initialConfig.inputErrorClass;
    this._errorClass = initialConfig.errorClass;
    this._initialConfig = initialConfig;
    this._formName = formName;
    this._inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    this._submitButton = this._formName.querySelector(this._submitButtonSelector);
    this._buttonElement = this._formName.querySelector(this._submitButtonSelector);
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
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement, this._inactiveButtonClass);
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };


  resetErrorForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState(this._inputList, this._submitButton, this._inactiveButtonClass);
  };
}
