import { Popup } from "../components/Popup.js";
import { config } from "../utils/config.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = document.querySelector(config.popupTitleImage);
    this._popupImage = document.querySelector(config.popupImage);
  }

  openPopup = ({ name, link }) => {
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;
    super.openPopup();
  }
}

