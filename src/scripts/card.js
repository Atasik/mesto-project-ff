import { createLike, removeLike, removeCard } from "./api.js"
import { cardTemplate } from "./constants.js";

export const createCard = (item, userId, functions) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button')
    const cardImage = card.querySelector('.card__image');
    const likesCounter = card.querySelector('.card__like-counter');
    cardImage.setAttribute('src', item.link);
    cardImage.alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
    likesCounter.textContent = item.likes.length;
    renderLike(likeButton, userId, item.likes);
    likeButton.addEventListener('click', () => {
        functions.likeFunction(likeButton, likesCounter, item._id);
    });
    if (userId == item.owner._id) {
        deleteButton.addEventListener('click', () => {
            functions.deleteFunction(card, item._id);
        });
    } else {
        deleteButton.remove();
    }
    cardImage.addEventListener('click', () => {
        functions.openFunction(item.name, item.link)
    });
    return card;
};

export const deleteCard = (card, id) => {
    removeCard(id)
        .then(() => {
            card.remove();
        })
        .catch(console.error)
};

export const likeCard = (button, likesCounter, id) => {
    if (button.classList.contains('card__like-button_is-active')) {
        removeLike(id)
            .then((res) => {
                likesCounter.textContent = res.likes.length;
                button.classList.remove('card__like-button_is-active');
            })
            .catch(console.error);
    } else {
        createLike(id)
            .then((res) => {
                likesCounter.textContent = res.likes.length;
                button.classList.add('card__like-button_is-active');
            })
            .catch(console.error);
    }
};

const renderLike = (button, userId, likes) => {
    likes.forEach((like) => {
        if (userId == like._id) {
            button.classList.add('card__like-button_is-active');
        } 
    });
}