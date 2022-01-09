export class Card {
  constructor(card, config, template, openPopupWithImage, openPopupDeleteCard, userId, addLike, deleteLike) {
    this._name = card.name;
    this._link = card.link;
    this._cardId = card._id;
    this._ownerId = card.owner._id;
    this._config = config;
    this._template = template;
    this._openPopupWithImage = openPopupWithImage;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._userId = userId;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._likes = card.likes;

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
    this._elementDelete = this._element.querySelector(this._config.cardsTrash);
    this._elementLike = this._element.querySelector(this._config.cardsLike);
    this._element.querySelector(this._config.cardsLikeCounter).textContent = this._likes.length;
    this._checkLike();

    cardName.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._elementDelete.remove();
      this._elementDelete = null;
    }

    this._elementLike.addEventListener('click', () => {
      if (this._elementLike.classList.contains(this._config.cardsLikeActive)) {
        this._handleRemoveLike();
      } else {
        this._handleAppendLike();
      }
    });

    cardImage.addEventListener('click', () => this._handleCardClick());

    if (this._elementDelete) {
      this._elementDelete.addEventListener('click', () => this._handleOpenPopupDeleteClick());
    }

    return this._element;
  }

  _handleOpenPopupDeleteClick = () => {
    this._openPopupDeleteCard(this)
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._element.remove()
    this._element = null;
  }

  _handleCardClick = () => {
    this._openPopupWithImage({ name: this._name, link: this._link });
  }

  getNumberLikes(info) {
    this._element.querySelector(this._config.cardsLikeCounter).textContent = info.likes.length;
  }

  _checkLike() {
    if (this._likes.some(({ _id }) => _id === this._userId)) {
      this.appendLike();
    }
  }

  appendLike() {
    this._elementLike.classList.add(this._config.cardsLikeActive);
  }

  _handleAppendLike() {
    this._addLike(this)
  }

  removeLike() {
    this._elementLike.classList.remove(this._config.cardsLikeActive);
  }

  _handleRemoveLike() {
    this._deleteLike(this)
  }
};

