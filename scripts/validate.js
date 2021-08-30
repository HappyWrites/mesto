const showInputError = (formElement, inputElement, errorMessage, validationPar) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationPar.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationPar.errorClass);
};

const hideInputError = (formElement, inputElement, validationPar) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationPar.inputErrorClass);
  errorElement.classList.remove(validationPar.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

const toggleButtonState = (inputList, buttonElement, buttonInactiveClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonInactiveClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(buttonInactiveClass);
    buttonElement.removeAttribute('disabled');
  }
};

const checkInputValidity = (formElement, inputElement, validationPar) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationPar);
  } else {
    hideInputError(formElement, inputElement, validationPar);
  }
};

const setEventListeners = (formElement, validationPar) => {
  const inputList = Array.from(formElement.querySelectorAll(validationPar.inputSelector));
  const buttonElement = formElement.querySelector(validationPar.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationPar);
      toggleButtonState(inputList, buttonElement, validationPar.inactiveButtonClass);
    });
  });
};

const enableValidation = (validationPar) => {
  const formList = Array.from(document.querySelectorAll(validationPar.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationPar);
  });
};

function resetErrorForm(form, validationParam) {
  const inputList = Array.from(form.querySelectorAll(validationParam.inputSelector));
  const submitButton = form.querySelector(validationParam.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(form, inputElement, initialConfig);
  })
  toggleButtonState(inputList, submitButton, validationParam.inactiveButtonClass);
};

const initialConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

enableValidation(initialConfig);