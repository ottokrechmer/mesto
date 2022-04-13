export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl,
        this._headers = options.headers
    }

    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() {
        return fetch(this._baseUrl.concat('/users/me'), {
            headers: this._headers
        })
        .then(this._parseResponse);
    }
    
    getCardList() {
        return fetch(this._baseUrl.concat('/cards'), {
            headers: this._headers
        })
        .then(this._parseResponse);
    }

    editUserProfile(name, about) {
        return fetch(this._baseUrl.concat('/users/me'), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then(this._parseResponse); 
    }

    addNewCard(name, link) {
        return fetch(this._baseUrl.concat('/cards'), {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              link: link
            })
        })
        .then(this._parseResponse); 
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl.concat(`/cards/${cardId}`), {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._parseResponse); 
    }

    addLikeToCard(cardId) {
        return fetch(this._baseUrl.concat(`/cards/${cardId}/likes`), {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._parseResponse); 
    }

    removeLikeFromCard(cardId) {
        return fetch(this._baseUrl.concat(`/cards/${cardId}/likes`), {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._parseResponse); 
    }

    editUserAvatar(avatar) {
        return fetch(this._baseUrl.concat('/users/me/avatar'), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._parseResponse); 
    }
}