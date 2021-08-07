let popup = document.querySelector('.popup')
let popupButton = document.querySelector('.profile__edit');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about-me');
let closeButton = popup.querySelector('.popup__close');
let saveButton = popup.querySelector('.popup__save');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__about-me');

function openPopup() {
  popup.classList.add('popup_is-opened');
}

function closedPopup () {
  popup.classList.remove('popup_is-opened');
}

popupButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closedPopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closedPopup ();
}

formElement.addEventListener('submit', formSubmitHandler); 