export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeKey);
};

export const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscapeKey);
};

const handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
        const currModal = document.querySelector('.popup_is-opened');
        closeModal(currModal);
    };
};

export const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains("popup")) {
        closeModal(evt.target);
    };
};