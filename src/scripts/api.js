const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
        authorization: 'd00fcef6-e916-444a-bb6d-05c2cb1eeeb5',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return request(`/cards`, {
        headers: config.headers
    });
}

export const getUser = () => {
    return request(`/users/me`, {
        headers: config.headers
    });
}

export const updateUser = (name, about) => {
    return request(`/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    });
}

export const createNewCard = (name, link) => {
    return request(`/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    });
}

export const removeCard = (cardId) => {
    return request(`/cards/${cardId} `, {
        method: 'DELETE',
        headers: config.headers
    });
}

export const createLike = (cardId) => {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    });
}

export const removeLike = (cardId) => {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });
}


export const updateAvatar = (avatar) => {
    return request(`/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    });
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (endpoint, options) => {
    return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse)
}