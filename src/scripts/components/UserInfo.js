import { profileDescription, profileName } from "../utils/constants";

export default class UserInfo {
    constructor(profileNameSelector, profileDescriptionSelector) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            userDescription: this._profileDescription.textContent
        }
    }

    setUserInfo({userName, userDescription}) {
        this._profileName.textContent = userName;
        this._profileDescription.textContent = userDescription;
    }
}