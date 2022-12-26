import { URL } from './constants';

class Api {
    constructor(host) {
        this._host = host;
    }

    _getJsonOrError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._host}/cards`, {
            credentials: 'include',
        })
            .then(res => this._getJsonOrError(res))
    }

    setUserInfo(data) {
        return fetch(`${this._host}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._getJsonOrError(res))
    }

    setUserAvatar(data) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._getJsonOrError(res))
    }
    
    getUserInformation() {
        return fetch(`${this._host}/users/me`, {
            credentials: 'include',
        })
            .then(res => this._getJsonOrError(res))
    }

    addNewCard(place) {
        return fetch(`${this._host}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: place.name,
                link: place.link,
            })
        })
            .then(res => this._getJsonOrError(res))
    }

    deleteCardFromServer(id) {
        return fetch(`${this._host}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => this._getJsonOrError(res))
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            credentials: 'include',
        })
            .then(res => this._getJsonOrError(res))
    }
};

const api = new Api(URL)

export default api;