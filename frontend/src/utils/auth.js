export const BASE_URL = 'https://api.mesto.aagronomovs.nomoredomains.xyz';

const checkResponse = (res) => {
    if(res.ok){
      return res.json();
    } 
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
  
  
  export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
       // 'Accept': 'application/json',
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
  
  export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
       // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password, 
        email: email
      })
    })
    .then(checkResponse)
  };
  
  export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
       // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        }
    })
    .then(checkResponse)
  }