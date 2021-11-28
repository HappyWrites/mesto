import { FormValidator, initialConfig } from "./FormValidator.js";
import { Card, config } from "./Card.js";

const initialCards = [
  {
    name: 'Канада',
    link: 'https://images.unsplash.com/photo-1626515728846-d09aacfee23d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80'
  },
  {
    name: 'Америка',
    link: 'https://images.unsplash.com/photo-1629233796529-4a04bf1aee52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
    name: 'Швейцария',
    link: 'https://images.unsplash.com/photo-1622115064943-f3cdd1af1b17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
    name: 'Южная Америка',
    link: 'https://images.unsplash.com/photo-1628435444324-b0856c6f7018?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1628632577468-645afac21c82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
    name: 'Турция',
    link: 'https://images.unsplash.com/photo-1629146460443-6edd470c8bc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80'
  }
];

const cardsList = document.querySelector('.cards__items');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupButtonEditProfile = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-me');
const closeButtonEditProfile = document.querySelector('.popup__close_type_edit');
const saveButton = document.querySelector('.popup__save_type_edit');
const formElementEditProfile = document.querySelector('.popup__container_type_edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about-me');
const addButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = document.querySelector('.popup__container_type_add');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const createButton = document.querySelector('.popup__save_type_add');
const closeButtonAdd = document.querySelector('.popup__close-add');
const closeButtonPopupImage = document.querySelector('.popup__close_type_image');
const popupImage = document.querySelector('.popup_type_image');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupTitleImage = popupImage.querySelector('.popup__title');

function createCard(card) {
  const newCard = new Card(card.name, card.link, config, '#cards-list-template', handlePreviewPicture);
  const cardElement = newCard.createCard();

  return cardElement;
}

function renderCard(card) {
  cardsList.prepend(createCard(card));
}


initialCards.forEach(card => renderCard(card));

const formValidatorForPopupEditProfile = new FormValidator(initialConfig, formElementEditProfile);
formValidatorForPopupEditProfile.enableValidation();

const formValidatorForPopupAddCard = new FormValidator(initialConfig, formAdd);
formValidatorForPopupAddCard.enableValidation();

//открытие и закрытие попапов//

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//передача данных полей ввода//

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidatorForPopupEditProfile.resetErrorForm();
}

popupButtonEditProfile.addEventListener('click', openPopupEditProfile);
closeButtonEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

//редактирование профиля//

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElementEditProfile.addEventListener('submit', editProfile);

//открытие попапа с контентом//
const openPopupAddContent = () => {
  openPopup(popupAdd);
  formAdd.reset();
  formValidatorForPopupAddCard.resetErrorForm();
}

//добавление карточки через форму//
addButton.addEventListener('click', openPopupAddContent);
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));

function addCard(evt) {
  evt.preventDefault();

  const cardObject = { name: placeInput.value, link: linkInput.value };
  renderCard(cardObject);
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCard);

//открытие и закрытие попапа с картинкой//

function handlePreviewPicture(title, img) {
  openPopup(popupImage);
  popupTitleImage.textContent = title.textContent;
  popupPicture.alt = img.alt;
  popupPicture.src = img.src;
}

closeButtonPopupImage.addEventListener('click', () => closePopup(popupImage));

//закрытие попапа кликом на оверлей//

function closePopupClickOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
};

popupEditProfile.addEventListener('click', closePopupClickOverlay);
popupAdd.addEventListener('click', closePopupClickOverlay);
popupImage.addEventListener('click', closePopupClickOverlay);

//закрытие попапа на ESC//
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  }
};

