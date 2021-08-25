const popup = document.querySelector('.popup')
const popupButton = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about-me');
const closeButton = popup.querySelector('.popup__close');
const saveButton = popup.querySelector('.popup__save');
const formElement = document.querySelector('.popup__container');
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

const initialCards = [
  {
    name: 'Швейцария',
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

//открытие и закрытие формы редактирования профиля//

function openPopup() {
  popup.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closedPopup() {
  popup.classList.remove('popup_is-opened');
}

popupButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closedPopup);

//редактирование профиля//

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closedPopup();
}

formElement.addEventListener('submit', formSubmitHandler);

//открытие и закрытие формы добавления карточки//

function openPopupAdd() {
  popupAdd.classList.add('popup_is-opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_is-opened');
}

addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', closePopupAdd);

//инициализация карточки//

function createCards(name, link) {
  const newCards = cardsListTemplate.content.firstElementChild.cloneNode(true);
  const cardName = newCards.querySelector('.cards__title');
  const cardLink = newCards.querySelector('.cards__image');

  newCards.querySelector('.cards__like').addEventListener('click', pressLike);
  newCards.querySelector('.cards__trash').addEventListener('click', deleteCard);
  cardLink.addEventListener('click', () => handlePreviewPicture(cardName, cardLink));
  closeButtonPopupImage.addEventListener('click', closePopupImage);

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

function addCard(evt) {
  evt.preventDefault();

  const cardObject = { name: placeInput.value, link: linkInput.value };
  initCards(cardObject);
  formAdd.reset();
  closePopupAdd();
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

function openPopupImage() {
  popupImage.classList.add('popup_is-opened');
}

function closePopupImage() {
  popupImage.classList.remove('popup_is-opened');
}

function handlePreviewPicture(title, img) {
  openPopupImage();
  popupImage.querySelector('.popup__title').textContent = title.textContent;
  popupImage.querySelector('.popup__picture').alt = img.alt;
  popupImage.querySelector('.popup__picture').src = img.src;
}


















































