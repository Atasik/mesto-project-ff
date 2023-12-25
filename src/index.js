import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal, handleOverlayClick } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { getInitialCards, getUser, updateUser, createNewCard, updateAvatar } from "./scripts/api.js";
import * as constants from "./scripts/constants.js";
import { handleSubmit } from "./scripts/utils.js";

let userId = null;

constants.buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', handleOverlayClick);
  btn.addEventListener('click', () => closeModal(popup));
});

constants.avatar.addEventListener('click', () => {
  openModal(constants.popupTypeEditImage);
});

constants.profileAddButton.addEventListener('click', () => {
  openModal(constants.popupTypeNewCard);
});

constants.profileEditButton.addEventListener('click', () => {
  setEditProfileInput();
  clearValidation(constants.editProfileForm, constants.validationConfig);
  openModal(constants.popupTypeEdit);
});

const setEditProfileInput = () => {
  constants.nameInput.value = constants.name.textContent;
  constants.jobInput.value = constants.description.textContent;
};

const handleProfileImageEditFormSubmit = (evt) => {
  const makeRequest = () => {
    return updateAvatar(constants.avatarInput.value).then((res) => {
      constants.avatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(constants.popupTypeEditImage);
    });
  }

  handleSubmit(makeRequest, evt);
}

const handleProfileEditFormSubmit = (evt) => {
  const makeRequest = () => {
    return updateUser(constants.nameInput.value, constants.jobInput.value).then((res) => {
      constants.name.textContent = res.name;
      constants.description.textContent = res.about;
      closeModal(constants.popupTypeEdit);
    });
  }

  handleSubmit(makeRequest, evt);
};

const handleImageClick = (name, link) => {
  constants.popupImage.setAttribute('src', link);
  constants.popupImage.setAttribute('alt', name);
  constants.popupCaption.textContent = name;
  openModal(constants.popupTypeImage);
};

const handleNewPlaceFormSubmit = (evt) => {
  const makeRequest = () => {
    return createNewCard(constants.placeNameInput.value, constants.linkInput.value).then((res) => {
      constants.placesList.prepend(createCard(
        res,
        userId,
        {
          deleteFunction: deleteCard,
          likeFunction: likeCard,
          openFunction: handleImageClick
        }));
      clearValidation(constants.newPlaceForm, constants.validationConfig);
      closeModal(constants.popupTypeNewCard);
    });
  }

  handleSubmit(makeRequest, evt);
};


constants.editProfileForm.addEventListener('submit', handleProfileEditFormSubmit);
constants.editProfileAvatarForm.addEventListener('submit', handleProfileImageEditFormSubmit);
constants.newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

const renderCards = (cards) => {
  cards.forEach((item) => {
    constants.placesList.append(createCard(
      item,
      userId,
      {
        deleteFunction: deleteCard,
        likeFunction: likeCard,
        openFunction: handleImageClick
      }));
  });
};


Promise.all([getInitialCards(), getUser()])
  .then(([resCards, resUser]) => {
    userId = resUser._id;
    constants.name.textContent = resUser.name;
    constants.description.textContent = resUser.about;
    constants.avatar.style.backgroundImage = `url(${resUser.avatar})`;
    renderCards(resCards);
  })
  .catch(console.error)

enableValidation(constants.validationConfig);