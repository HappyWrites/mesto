import './styles/index.css';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { config } from "./utils/config.js";
import { arrayCards } from "./utils/arrayCards.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";


const popupWithImage = new PopupWithImage(config.popupTypeImage);
popupWithImage.setEventListeners();

function createCard(card) {
  const newCard = new Card(card.name, card.link, config, '#cards-list-template', () => popupWithImage.openPopup(card));
  const cardElement = newCard.createCard();

  return cardElement;
}

const CardsList = new Section({
  items: arrayCards,
  renderer: (card) => {
    CardsList.addItem(createCard(card))
  }
}, '.cards__items')

CardsList.renderItems();


const formElementEditProfile = document.querySelector('.popup__container_type_edit-profile');
const formAdd = document.querySelector('.popup__container_type_add');

const formValidatorForPopupEditProfile = new FormValidator(config, formElementEditProfile);
formValidatorForPopupEditProfile.enableValidation();

const formValidatorForPopupAddCard = new FormValidator(config, formAdd);
formValidatorForPopupAddCard.enableValidation();


const addButton = document.querySelector('.profile__add');
const buttonEditProfile = document.querySelector('.profile__edit');

const popupWithFormAddCard = new PopupWithForm(config.popupTypeAddCard, () => formValidatorForPopupAddCard.resetErrorForm(), addCardViaForm)
function addCardViaForm(input) {

  CardsList.addItem(createCard({ name: input.name, link: input.link }));

};

addButton.addEventListener('click', () => popupWithFormAddCard.openPopup());
popupWithFormAddCard.setEventListeners();


const newUserInfo = new UserInfo('.profile__name', '.profile__about-me');
const popupWithFormEditProfile = new PopupWithForm('.popup_type_edit-profile', () => formValidatorForPopupAddCard.resetErrorForm(), editProfileViaForm, () => newUserInfo.getUserInfo())

function editProfileViaForm(input) {
  newUserInfo.setUserInfo(input);
}

buttonEditProfile.addEventListener('click', () => popupWithFormEditProfile.openPopup())
popupWithFormEditProfile.setEventListeners();
