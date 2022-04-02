import { profileDescription, profileName } from "../utils/constants";

export default class UserInfo {
    constructor() {
        this._profileName = profileName;
        this._profileDescription = profileDescription;
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