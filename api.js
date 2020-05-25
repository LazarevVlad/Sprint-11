/* Можно лучше: довольно общее название для класса, лучше добавить отразить что это за сервер, например MestoApi */
class Api {
  constructor(options) {
    this.options = options;
  }
  getUserInfo() {
    return (
      fetch(`${this.options.baseUrl}/users/me`, {
        headers: {
          authorization: this.options.token,
        },
      })
        /*
      Можно лучше: проверка ответа сервера и преобразование из json
      дублируется во всех методах класса Api, лучше вынести в отдельный метод:
        _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
        }
      Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
      не используется вне класса Api   
    */
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
    );
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: {
        authorization: this.options.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  sendUserInfo(nameValue, aboutValue) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.options.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }
  addNewCard(form) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.options.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.options.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }
  setLike(cardId) {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.options.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }
  deleteLike(cardId) {
    return fetch(`${this.options.baseUrl}/cards/like/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.options.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }
  changeAvatar(avatarValue) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.options.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarValue,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.status));
      })
      .catch((err) => Promise.reject(new Error(err.message)));
  }
}
