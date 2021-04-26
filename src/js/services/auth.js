import makeAjaxRequest from '../utils/makeAjaxRequest.js';

const LS_KEYS = {
  EMAIL: 'email',
  TOKEN: 'token',
};

function storeUserInfo(responseJson) {
  localStorage.setItem(LS_KEYS.EMAIL, responseJson.email);
  localStorage.setItem(LS_KEYS.TOKEN, responseJson.token);
}

function getToken() {
  return localStorage.getItem(LS_KEYS.TOKEN);
}

function getEmail() {
  return localStorage.getItem(LS_KEYS.EMAIL);
}

function logout() {
  localStorage.clear();
  window.location = '../auth/signin/signin';
}

function login(email, password) {
  return makeAjaxRequest(
    {
      method: 'POST',
      endpoint: 'auth/login',
      body: {
        email,
        password,
      },
    },
  ).then(storeUserInfo);
}

function signUp(name, email, password) {
  return makeAjaxRequest({
    method: 'POST',
    endpoint: 'auth/register',
    body: {
      name,
      email,
      password,
    },
  });
}

export {
  getToken,
  getEmail,
  login,
  signUp,
  logout,
};
