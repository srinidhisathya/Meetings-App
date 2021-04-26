import { getEmail, logout } from '../services/auth.js';

class Navbar {
  showLoggedUser() {
    const loggedInUser = document.querySelector('.nav-email');
    loggedInUser.innerText = getEmail();
  }

  init() {
    document.querySelectorAll('.nav-logout').forEach((link) => {
      link.addEventListener('click', logout);
    });
  }
}

const nav = new Navbar();
nav.init();
nav.showLoggedUser();
