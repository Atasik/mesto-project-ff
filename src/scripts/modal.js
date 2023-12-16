export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);
};

export const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscapeKey);
};

const handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
        const currModal = document.querySelector('.popup_is-opened');
        closeModal(currModal);
    };
};

const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("popup")) {
        const currModal = document.querySelector('.popup_is-opened');
        closeModal(currModal);
    };
};