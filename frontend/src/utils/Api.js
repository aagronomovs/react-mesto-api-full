class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                credentials: 'include',
                headers: this._headers
            })
            .then(this._getResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._getResponse);
    }

    updateUserInfo(data) { //name, about
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                }),
            })
            .then(this._getResponse);
    }

    postNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                }),
            })
            .then(this._getResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._getResponse);
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(
                    {avatar}),
            })
            .then(this._getResponse);
    }

    getLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._getResponse);
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._getResponse);
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.aagronomovs.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;