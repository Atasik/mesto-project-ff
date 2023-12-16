import "./pages/index.css";
import {initialCards} from "./scripts/cards.js";
import {createCard, deleteCard, likeCard} from "./scripts/card.js";
import {openModal, closeModal} from "./scripts/modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeEditCloseButton = popupTypeEdit.querySelector('.popup__close');
const popupTypeNewCardCloseButton = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close');
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;
const placeNameInput = newPlaceForm['place-name'];
const linkInput = newPlaceForm.link;
popupTypeImage.classList.add('popup_is-animated');
popupTypeNewCard.classList.add('popup_is-animated');
popupTypeEdit.classList.add('popup_is-animated');

// @todo: Функция создания карточки

profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

profileEditButton.addEventListener('click', () => {
    setEditProfileInput();
    openModal(popupTypeEdit);
});

popupTypeEditCloseButton.addEventListener('click', () => {
    setEditProfileInput();
    closeModal(popupTypeEdit);
});

popupTypeNewCardCloseButton.addEventListener('click', () => {
    closeModal(popupTypeNewCard);
});

popupTypeImageCloseButton.addEventListener('click', () => {
    closeModal(popupTypeImage);
});

const setEditProfileInput = () => {
    const name = document.querySelector(".profile__title");
    const description = document.querySelector(".profile__description");
    nameInput.value = name.textContent;
    jobInput.value = description.textContent;
};

const handleProfileEditFormSubmit = (evt) => {
    evt.preventDefault();
    const name = document.querySelector(".profile__title");
    const description = document.querySelector(".profile__description");
    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
};

const handleImageClick = (name, link) => {
    popupTypeImage.querySelector('.popup__image').setAttribute('src', link);
    popupTypeImage.querySelector('.popup__image').setAttribute('alt', name);
    popupTypeImage.querySelector('.popup__caption').textContent = name;
    openModal(popupTypeImage);
};

const handleNewPlaceFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(linkInput.value);
    placesList.prepend(createCard(placeNameInput.value, linkInput.value, deleteCard, likeCard, handleImageClick));
};


editProfileForm.addEventListener('submit', handleProfileEditFormSubmit);
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const renderCards = (cards) => {
    cards.forEach((item) => {
        placesList.append(createCard(item.name, item.link, deleteCard, likeCard, handleImageClick));
    });
};

renderCards(initialCards);