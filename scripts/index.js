const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupButtonEditProfile = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-me');
const closeButtonEditProfile = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__save');
const formElementEditProfile = document.querySelector('.popup__container_type_edit-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about-me');
const cardsList = document.querySelector('.cards__items');
const cardsListTemplate = document.getElementById('cards-list-template');
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
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

//передача данных полей ввода//

function takeDataProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupButtonEditProfile.addEventListener('click', takeDataProfile);
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

function createCards(name, link) {
  const newCards = cardsListTemplate.content.firstElementChild.cloneNode(true);
  const cardName = newCards.querySelector('.cards__title');
  const cardLink = newCards.querySelector('.cards__image');

  newCards.querySelector('.cards__like').addEventListener('click', pressLike);
  newCards.querySelector('.cards__trash').addEventListener('click', deleteCard);
  cardLink.addEventListener('click', () => handlePreviewPicture(cardName, cardLink));


  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;

  return newCards;
}

function initCards(card) {
  const newCard = createCards(card.name, card.link);
  cardsList.prepend(newCard);
}

initialCards.forEach(card => initCards(card));

//добавление карточки через форму//
addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));

function addCard(evt) {
  evt.preventDefault();

  const cardObject = { name: placeInput.value, link: linkInput.value };
  initCards(cardObject);
  formAdd.reset();
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