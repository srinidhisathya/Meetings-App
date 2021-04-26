import User from '../../js/models/User.js';
import { showError, hideError } from '../../js/utils/form.js';
import Alert from '../../js/utils/alert.js';
import { login } from '../../js/services/auth.js';

import '../../styles/scss/utils.scss';
import '../../styles/scss/pages/signin.scss';
import '../../styles/scss/app.scss';
import '../../styles/scss/nav.scss';
// import '../../notification/notification.css';

class LoginPage {
    loginForm = document.querySelector('form');

    user = new User();

    alert = new Alert();

    async loginToApp() {
      if (!this.user.isValidLogin()) {
        return;
      }
      try {
        await login(this.user.email, this.user.password);
        window.location = '../../calendar/calendar'; // path
      } catch (error) {
        this.alert.showErrorMessage('Login failed because of invalid credentials', 5);
        // alert("Login failed because of invalid credentials");
      }
    }

    onInputEmail = (event) => {
      const errors = this.user.setEmail(event.target.value);
      console.log(this.user);
      if (!errors.length) {
        hideError(event.target);
        return;
      }
      showError(event.target, errors.join(', '));
    }

    onInputPassword = (event) => {
      const errors = this.user.setPassword(event.target.value);
      console.log(this.user);
      if (!errors.length) {
        hideError(event.target);
        return;
      }
      showError(event.target, errors.join(', '));
    }

    onSubmitLoginForm = (event) => {
      event.preventDefault();
      this.loginToApp();

      if (!this.loginForm.email.value || !this.loginForm.password.value) {
        this.alert.showErrorMessage('Please enter your credentials', 5);
      }
    }

    addListeners() {
      this.loginForm.email.addEventListener('input', this.onInputEmail);
      this.loginForm.password.addEventListener('input', this.onInputPassword);
      this.loginForm.addEventListener('submit', this.onSubmitLoginForm);
    }

    init() {
      this.addListeners();
    }
}

const page = new LoginPage();
page.init();

export default LoginPage;
