export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if(res.ok){
      return res.json();
    } 
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  
  
  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          password: password,
          email: email
      })
    })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
  };
  
  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password, 
        email: email
      })
    })
    .then(checkResponse)
  };
  
  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
    .then(data => data)
  }