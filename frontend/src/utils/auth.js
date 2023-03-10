import { URL } from './constants';

    function getJsonOrError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    export function checkToken() {
        return fetch(`${URL}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => getJsonOrError(res))
    }

    export function authUser(data) {
        return fetch(`${URL}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                password: data.password,
                email: data.email
            })
        })
            .then(res => getJsonOrError(res))
    }

    export function registerNewUser(data) {
        return fetch(`${URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                password: data.password,
                email: data.email
            })
        })
            .then(res => getJsonOrError(res))
    }
