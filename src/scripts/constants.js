export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');
export const editProfileForm = document.forms["edit-profile"];
export const editProfileAvatarForm = document.forms["edit-profile-avatar"];
export const newPlaceForm = document.forms["new-place"];
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeEditImage = document.querySelector('.popup_type_edit_image');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const buttonCloseList = document.querySelectorAll('.popup__close');
export const avatar = document.querySelector('.profile__image')
export const name = document.querySelector(".profile__title");
export const description = document.querySelector(".profile__description");
export const nameInput = editProfileForm.name;
export const jobInput = editProfileForm.description;
export const avatarInput = editProfileAvatarForm['avatar-link'];
export const placeNameInput = newPlaceForm['place-name'];
export const linkInput = newPlaceForm.link;
export const popupImage = popupTypeImage.querySelector('.popup__image');
export const popupCaption = popupTypeImage.querySelector('.popup__caption')
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};