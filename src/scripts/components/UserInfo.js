export default class UserInfo {
    constructor(profileNameSelector, profileDescriptionSelector, avatarSelector) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            userDescription: this._profileDescription.textContent
        }
    }

    getUserAvatar() {
        return {avatarUrl: this._avatar.src}
    }

    setUserInfo(userName, userDescription) {
        this._profileName.textContent = userName;
        this._profileDescription.textContent = userDescription;
    }

    setUserId(id) {
        this._id = id
    }

    getUserId() {
        return this._id
    }

    setUserAvatar(avatarUrl) {
        this._avatar.src = avatarUrl;
    }
}