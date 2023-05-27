class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl
    this._headers = headers
  }
  _addResult (res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Получение карточек
  getInitialCards () {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._addResult(res))
  }

  // Добавить новую карточку
  addNewCard ({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',

      headers: this._headers,

      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._addResult(res))
  }

  // Удалить карточку
  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._addResult(res))
  }

  // Лайки
  addLike (id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._addResult(res))
  }

  // Удалить лайки
  deleteLike (id) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._addResult(res))
  }

  // Получeние данных юзера
  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._addResult(res))
  }

  // Редакт информации юзера
  editUserInfo ({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._addResult(res))
  }

  // Редакт аватара
  editUserAvatar (url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => this._addResult(res))
  }

  changeLikeCardStatus (id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        headers: this._headers,
        method: "PUT",
      })
        .then((res) => this._addResult(res))
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        headers: this._headers,
        method: "DELETE",
      })
        .then((res) => this._addResult(res))
    }
  }


}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '828326d9-3e7a-4e87-bb3e-57d75ba5d596',
    'Content-Type': 'application/json',
  }
})

export default api;
