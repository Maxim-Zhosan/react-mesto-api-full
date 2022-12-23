import { URL } from './constants';

    function getJsonOrError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    // export function checkToken(token) {
    //     return fetch(`${URL}/users/me`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(res => getJsonOrError(res))
    // }

    export function checkToken() {
        return fetch(`${URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => getJsonOrError(res))
    }

    export function authUser(data) {
        return fetch(`${URL}/signin`, {
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