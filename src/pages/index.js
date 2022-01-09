import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { config } from "../utils/config.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

const formElementEditProfile = document.querySelector('.popup__container_type_edit-profile');
const formAdd = document.querySelector('.popup__container_type_add');
const formElementEditAvatar = document.querySelector('.popup__container_type_edit-avatar')
const buttonAddCard = document.querySelector('.profile__add');
const buttonEditProfile = document.querySelector('.profile__edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_about-me');
const buttonsSave = document.querySelectorAll('.popup__save');
const buttonEditAvatar = document.querySelector('.profile__avatar-button');



const api = new Api('https://mesto.nomoreparties.co/v1/cohort-32', '0e36e0dc-917d-4b2c-8b4d-704f31f7e428');
const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item))
  }
}, '.cards__items')
const newUserInfo = new UserInfo(config.profileName, config.profileJob, config.profileAvatar);
const popupWithFormEditProfile = new PopupWithForm(config.popupEditProfile, () => formValidatorForPopupAddCard.resetErrorForm(), editProfileViaForm)
const popupWithFormAddCard = new PopupWithForm(config.popupTypeAddCard, () => formValidatorForPopupAddCard.resetErrorForm(), addCardViaForm)
const popupWithImage = new PopupWithImage(config.popupTypeImage);
const popupDeleteCard = new PopupDeleteCard(config.popupDeleteCard, handleDeleteCard)
const popupWithFormEditAvatar = new PopupWithForm(config.popupEditAvatar, () => formValidatorForPopupEditAvatar.resetErrorForm(), editAvatarViaForm)


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    newUserInfo.setUserInfo(userData)
    cardsList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(card) {
  const newCard = new Card(
    card,
    config,
    '#cards-list-template',
    () => popupWithImage.openPopup(card),
    handleOpenPopupDeleteCard,
    newUserInfo.getUserInfo().id,
    handleAddLike,
    handleDeleteLike
  );
  const cardElement = newCard.createCard();

  return cardElement;
}

function editProfileViaForm(input) {
  renderLoading(true);
  api.transferUserInfo(input)
    .then((result) => {
      newUserInfo.setUserInfo(result);
      popupWithFormEditProfile.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    })
}

const insertDataInInputs = () => {
  const dataProfile = newUserInfo.getUserInfo()
  inputName.value = dataProfile.name;
  inputJob.value = dataProfile.about;
}

function addCardViaForm(input) {
  renderLoading(true);
  api.addCard(input)
    .then((result) => {
      cardsList.addItem(createCard(result));
      popupWithFormAddCard.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    })
};

function renderLoading(isLoading) {
  if (isLoading) {
    buttonsSave.forEach(btn => btn.textContent = "Сохранение...")
  } else {
    buttonsSave.forEach(btn => btn.textContent = "Сохранить")
  }
}

function handleOpenPopupDeleteCard(card) {
  popupDeleteCard.openPopup(card)
}

function handleDeleteCard(card) {
  api.deleteCard(card.getCardId())
    .then(() => {
      card.deleteCard()
      popupDeleteCard.closePopup()
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAddLike(card) {
  api.addLike(card.getCardId())
    .then((res) => {
      card.getNumberLikes(res);
      card.appendLike();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteLike(card) {
  api.deleteLike(card.getCardId())
    .then((res) => {
      card.getNumberLikes(res);
      card.removeLike();
    })
    .catch((err) => {
      console.log(err);
    });
}

function editAvatarViaForm(input) {
  renderLoading(true);
  api.editAvatar(input)
    .then((result) => {
      newUserInfo.setUserInfo(result);
      popupWithFormEditAvatar.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false)
    })
}

buttonEditProfile.addEventListener('click', () => (insertDataInInputs(), popupWithFormEditProfile.openPopup()))
popupWithFormEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithFormEditAvatar.setEventListeners();
buttonAddCard.addEventListener('click', () => popupWithFormAddCard.openPopup());
popupDeleteCard.setEventListeners();
buttonEditAvatar.addEventListener('click', () => popupWithFormEditAvatar.openPopup());

const formValidatorForPopupEditProfile = new FormValidator(config, formElementEditProfile);
formValidatorForPopupEditProfile.enableValidation();

const formValidatorForPopupAddCard = new FormValidator(config, formAdd);
formValidatorForPopupAddCard.enableValidation();

const formValidatorForPopupEditAvatar = new FormValidator(config, formElementEditAvatar);
formValidatorForPopupEditAvatar.enableValidation();
