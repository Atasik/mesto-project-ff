import {cardTemplate} from "../index.js"
 
export const createCard = (name, link, deleteFunction, likeFunction, openFunction) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button')
    const cardImage = card.querySelector('.card__image');
    cardImage.setAttribute('src', link);
    card.querySelector('.card__image').setAttribute('alt', name);
    card.querySelector('.card__title').textContent = name;
    likeButton.addEventListener('click', () => {
        likeFunction(likeButton);
    });
    deleteButton.addEventListener('click', () => {  
        deleteFunction(card);
    });
    cardImage.addEventListener('click', () => {
        openFunction(name, link)
    });
    return card;
};

export const deleteCard = (card) => {
    card.remove();
};

export const likeCard = (button) => {
    button.classList.toggle('card__like-button_is-active')
};