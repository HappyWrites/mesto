class Card {
  constructor(name, link, config, template, handlePreviewPicture) {
    this._name = name;
    this._link = link;
    this._config = config;
    this._template = template;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
      .querySelector(this._config.cardsItem)
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();


    const cardName = this._element.querySelector(this._config.cardsTitle);
    const cardImage = this._element.querySelector(this._config.cardsImage);

    cardName.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._element.querySelector(this._config.cardsLike).addEventListener('click', () => this._pressLike());
    this._element.querySelector(this._config.cardsTrash).addEventListener('click', () => this._deleteCard());
    cardImage.addEventListener('click', () => this._handlePreviewPicture(cardName, cardImage));

    return this._element;
  }

  _pressLike() {
    event.currentTarget.classList.toggle(this._config.cardsLikeActive);
  }

  _deleteCard() {
    this._element.closest(this._config.cardsItem).remove();
  }
}

const config = {
  cardsItem: '.cards__item',
  cardsTitle: '.cards__title',
  cardsImage: '.cards__image',
  cardsLike: '.cards__like',
  cardsTrash: '.cards__trash',
  cardsLikeActive: 'cards__like_active',
}


export { Card, config };
