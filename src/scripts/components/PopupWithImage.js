import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageDescription = this._popup.querySelector('.popup__description-text')
        this._bigImage = this._popup.querySelector('.popup__image')
    }

    open(imageName, imageUrl) {
        this._bigImage.alt = imageName;
        this._bigImage.src = imageUrl;
        this._imageDescription.textContent = this._imageName;
        super.open();
    }
 }