const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupButtonEditProfile = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-me');
const closeButtonEditProfile = document.querySelector('.popup__close_type_edit');
const saveButton = document.querySelector('.popup__save_type_edit');
const formElementEditProfile = document.querySelector('.popup__container_type_edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about-me');
const cardsList = document.querySelector('.cards__items');
const cardTemplate = document.getElementById('cards-list-template');
const addButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_add');
const formAdd = document.querySelector('.popup__container_type_add');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const createButton = document.querySelector('.popup__save_type_add');
const closeButtonAdd = document.querySelector('.popup__close-add');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonPopupImage = document.querySelector('.popup__close_type_image');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupTitleImage = popupImage.querySelector('.popup__title');

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
  resetErrorForm(popupEditProfile);
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

//инициализация карточки//

function createCard(name, link) {
  const newCard = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardName = newCard.querySelector('.cards__title');
  const cardLink = newCard.querySelector('.cards__image');

  newCard.querySelector('.cards__like').addEventListener('click', pressLike);
  newCard.querySelector('.cards__trash').addEventListener('click', deleteCard);
  cardLink.addEventListener('click', () => handlePreviewPicture(cardName, cardLink));


  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;

  return newCard;
}

function renderCard(card) {
  const newCard = createCard(card.name, card.link);
  cardsList.prepend(newCard);
}

initialCards.forEach(card => renderCard(card));


//открытие попапа с контентом//
const openPopupAddContent = () => {
  placeInput.value = '';
  linkInput.value = '';
  resetErrorForm(popupAdd);
  openPopup(popupAdd);
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

//лайк//

function pressLike(evt) {
  evt.target.classList.toggle('cards__like_active');
}

//удаление карточки//

function deleteCard(evt) {
  evt.target.closest('.cards__item').remove();
}

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
  const activePopup = document.querySelector('.popup_is-opened');

  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

//сброс значений открываемого попапа//
function resetErrorForm(form) {
  const errorList = Array.from(form.querySelectorAll('.popup__input-error'));
  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  const saveButton = form.querySelector('.popup__save');
  toggleButtonState(inputList, saveButton, 'popup__save_type_inactive');
};