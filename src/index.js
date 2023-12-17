import "./pages/index.css";
import "./images/avatar.jpg";
import {initialCards} from "./scripts/cards.js";
import {createCard, deleteCard, likeCard} from "./scripts/card.js";
import {openModal, closeModal, handleOverlayClick} from "./scripts/modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonCloseList = document.querySelectorAll('.popup__close'); 
const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;
const placeNameInput = newPlaceForm['place-name'];
const linkInput = newPlaceForm.link;
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption')


/* спасибо, я пытался сделать через popup, но не знал, что будет массив на выходе */
buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', handleOverlayClick);
    btn.addEventListener('click', () => closeModal(popup)); 
  });

// @todo: Функция создания карточки

profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

profileEditButton.addEventListener('click', () => {
    setEditProfileInput();
    openModal(popupTypeEdit);
});

const setEditProfileInput = () => {
    nameInput.value = name.textContent;
    jobInput.value = description.textContent;
};

const handleProfileEditFormSubmit = (evt) => {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
    closeModal(popupTypeEdit);
};

const handleImageClick = (name, link) => {
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', name);
    popupCaption.textContent = name;
    openModal(popupTypeImage);
};

const handleNewPlaceFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(linkInput.value);
    placesList.prepend(createCard(placeNameInput.value, linkInput.value, deleteCard, likeCard, handleImageClick));
    closeModal(popupTypeNewCard);
    newPlaceForm.reset();
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