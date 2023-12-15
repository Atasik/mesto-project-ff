// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (name, link, deleteFunction) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {  
        deleteFunction(card);
    });
    card.querySelector('.card__image').setAttribute('src', link);
    card.querySelector('.card__image').setAttribute('alt', name);
    card.querySelector('.card__title').textContent = name;

    return card;
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
    card.remove();
};

// @todo: Вывести карточки на страницу
const renderCards = (cards) => {
    cards.forEach((item) => {
        placesList.append(createCard(item.name, item.link, deleteCard));
    });
};

renderCards(initialCards);