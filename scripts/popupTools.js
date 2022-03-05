function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupOnEscKeydown)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupOnEscKeydown)
}

function closePopupOnOverlayClick(popup) {
    if (popup.classList.contains('popup')) {
        closePopup(popup);
    }
}

function closePopupOnEscKeydown(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened')
        closePopup(popup)
    }
}

export {openPopup, closePopupOnOverlayClick, closePopupOnEscKeydown, closePopup}

