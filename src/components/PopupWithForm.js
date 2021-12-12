import { Popup } from '../components/Popup.js';
import { config } from '../utils/config.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, resetErrorForm, submitCallback, getterCallback = null) {
    super(popupSelector);
    this._form = this._popup.querySelector(config.formSelector);
    this._inputList = this._form.querySelectorAll(config.inputSelector);
    this._resetErrorForm = resetErrorForm;
    this._submitCallback = submitCallback;
    this._getterCallBack = getterCallback;
  }

  openPopup() {
    super.openPopup();    
    if (this._getterCallBack) {
      const data = this._getter();
      this._inputList.forEach((input) => {
        input.value = data[input.name];
      });
    }
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const values = this._getInputValues();

      this._submitCallback(values)

      this.closePopup();
    })
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
    this._resetErrorForm();
  }
}

