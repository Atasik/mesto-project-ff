// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = (name, link, deleteFunction) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').setAttribute('src', link)
    const cardDescription = card.querySelector('.card__description');
    cardDescription.querySelector('.card__title').textContent = name;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {  
        deleteFunction(card);
    });

    return card;
}

// @todo: Функция удаления карточки
const deleteCard = (card) => {
    card.remove();
}

// @todo: Вывести карточки на страницу
const renderCards = (cards) => {
    cards.forEach( (item) => {
        placesList.append(addCard(item.name, item.link, deleteCard));
    })
}

renderCards(initialCards);