export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  setUserData({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  removeCard({ _id }) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Ошибка ${res.status}`);
      })
    }
  }

  likeSet(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  likeRemove(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }
}


export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'cce65d1e-fda6-465b-9ce4-eb05b78869dc',
    'Content-Type': 'application/json'
  }
});