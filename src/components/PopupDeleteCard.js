import { Popup } from '../components/Popup.js'
import { config } from '../utils/config.js'

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector(config.formSelector)
  }


  openPopup = (card) => {
    super.openPopup();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(this._card);
    });
  }
}
