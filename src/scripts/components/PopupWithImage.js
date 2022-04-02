import Popup from "./Popup";
import { bigImage, imageDescription } from "../utils/constants";

export default class PopupWithImage extends Popup {
    constructor({imageName, imageUrl}, popupSelector) {
        super(popupSelector);
        this._imageName = imageName;
        this._imageUrl = imageUrl;
    }

    open() {
        bigImage.alt = this._imageName;
        bigImage.src = this._imageUrl;
        imageDescription.textContent = this._imageName;
        super.open();
    }
 }