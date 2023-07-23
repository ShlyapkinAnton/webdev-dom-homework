const commentURL = 'https://wedev-api.sky.pro/api/v2/anton-shlyapkin/comments';
const userURL = 'https://wedev-api.sky.pro/api/user/login';
const regURL = 'https://wedev-api.sky.pro/api/user';

export let token;
export const setToken = (newToken) => {
  token = newToken;
};

//получение данных с api
export function getComments() {
    return fetch(commentURL, {
        method: "GET", 
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        return response.json();
    });
}

//добавление нового коментария в api
export function postComment(comment, name, func) {
  return fetch(commentURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body : JSON.stringify({
      text: func(comment),
      name: func(name),
      date: new Date(),
      likes: 0,
      isLiked: false,
      forceError: false,
    })
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json()
    } else {
      switch (response.status) {
        case 400: throw new Error('Имя и комментарий не могут быть меньше 3-х символов')
        case 500: throw new Error('Сервер упал')
        default: throw new Error('Что-то пошло не так, попробуйте позже')
      }
    }
  })
}

//авторизация
export function loginComment(login, password) { 
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    })
  }).then((response) => {
    if (response.status === 201) {
      console.log('Пользователь авторизован!')
      return response.json()
    } else {
      switch (response.status) {
        case 400: throw new Error('Неправильный логин или пароль!')
        case 500: throw new Error('Сервер упал')
        default: throw new Error('Что-то пошло не так, попробуйте позже')
      }
    }  
})
}

//Регистрация
export function registration(login, password, userName) {
  return fetch(regURL, {
    method: "POST",
    body : JSON.stringify({
      login: login,
      name: userName,
      password: password,
    })
  })
  .then((response) => {
    if (response.status === 201) {
      console.log('Вы успешно зарегистрировались!')
      return response.json()
    } else {
      switch (response.status) {
        case 400: throw new Error('Пользователь с таким логином уже сущетсвует!')
        case 500: throw new Error('Сервер упал')
        default: throw new Error('Что-то пошло не так, попробуйте позже')
      }
    }      
  })
}