import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal, handleOverlayClick } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { getInitialCards, getUser, updateUser, createNewCard, updateAvatar } from "./scripts/api.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
let userId = null;
const placesList = document.querySelector('.places__list');
const editProfileForm = document.forms["edit-profile"];
const editProfileAvatarForm = document.forms["edit-profile-avatar"];
const newPlaceForm = document.forms["new-place"];
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditImage = document.querySelector('.popup_type_edit_image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonCloseList = document.querySelectorAll('.popup__close');
const avatar = document.querySelector('.profile__image')
const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const nameInput = editProfileForm.name;
const jobInput = editProfileForm.description;
const avatarInput = editProfileAvatarForm['avatar-link'];
const placeNameInput = newPlaceForm['place-name'];
const linkInput = newPlaceForm.link;
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption')
const popupBtnEditProfile = editProfileForm.querySelector('.popup__button');
const popupBtnProfileAvatar = editProfileAvatarForm.querySelector('.popup__button');
const popupBtnNewPlace = newPlaceForm.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', handleOverlayClick);
  btn.addEventListener('click', () => closeModal(popup));
});

// @todo: Функция создания карточки

avatar.addEventListener('click', () => {
  openModal(popupTypeEditImage);
});

profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

profileEditButton.addEventListener('click', () => {
  setEditProfileInput();
  clearValidation(editProfileForm, validationConfig);
  openModal(popupTypeEdit);
});

const setEditProfileInput = () => {
  nameInput.value = name.textContent;
  jobInput.value = description.textContent;
};

const handleProfileImageEditFormSubmit = (evt) => {
  evt.preventDefault();
  popupBtnProfileAvatar.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then((res) => {
      avatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfileAvatarForm.reset();
      popupBtnProfileAvatar.textContent = 'Сохранить';
      closeModal(popupTypeEditImage);
  });
}

const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();
  popupBtnEditProfile.textContent = 'Сохранение...';
  updateUser(nameInput.value, jobInput.value)
    .then((res) => {
      name.textContent = res.name;
      description.textContent = res.about;
    })
    .catch((err) => console.log(err))
  .finally(() => {
      popupBtnEditProfile.textContent = 'Сохранить';
      closeModal(popupTypeEdit);
  });
};

const handleImageClick = (name, link) => {
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupCaption.textContent = name;
  openModal(popupTypeImage);
};

const handleNewPlaceFormSubmit = (evt) => {
  evt.preventDefault();
  popupBtnNewPlace.textContent = 'Сохранение...';
  createNewCard(placeNameInput.value, linkInput.value)
    .then((res) => {
      placesList.prepend(createCard(res, userId, deleteCard, likeCard, handleImageClick));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig);
      popupBtnNewPlace.textContent = 'Сохранить';
      closeModal(popupTypeNewCard);
    });
};


editProfileForm.addEventListener('submit', handleProfileEditFormSubmit);
editProfileAvatarForm.addEventListener('submit', handleProfileImageEditFormSubmit);
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const renderCards = (cards) => {
  cards.forEach((item) => {
    placesList.append(createCard(item, userId, deleteCard, likeCard, handleImageClick));
  });
};


Promise.all([getInitialCards(), getUser()])
  .then(([resCards, resUser]) => {
    userId = resUser._id;
    name.textContent = resUser.name;
    description.textContent = resUser.about;
    avatar.style.backgroundImage = `url(${resUser.avatar})`;
    renderCards(resCards);
  })
  .catch((err) => {
    console.log(err)
  });

enableValidation(validationConfig);