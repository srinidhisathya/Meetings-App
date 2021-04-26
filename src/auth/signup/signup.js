import User from '../../js/models/User.js';
import { showError, hideError } from '../../js/utils/form.js';
import Alert from '../../js/utils/alert.js';
import { signUp } from '../../js/services/auth.js';

import '../../styles/scss/utils.scss';
import '../../styles/scss/pages/signin.scss';
import '../../styles/scss/app.scss';
import '../../styles/scss/nav.scss';

class SignUpPage {
    signUpForm = document.querySelector('form');

    user = new User();

    alert = new Alert();

    async signUpToApp() {
      if (!this.user.isValidRegister()) {
        return;
      }
      try {
        await signUp(this.user.name, this.user.email, this.user.password);
        window.location = '/Milestone3/interactive-project/Interactive-Project-Final/src/auth/signin/signin'; // path
      } catch (error) {
        this.alert.showErrorMessage('Registration failed because user already exists !', 5);
      }
    }

    onInputName = (event) => {
      const errors = this.user.setName(event.target.value);
      if (!errors.length) {
        hideError(event.target);
        return;
      }
      showError(event.target, errors.join(', '));
    }

    onInputEmail = (event) => {
      const errors = this.user.setEmail(event.target.value);
      if (!errors.length) {
        hideError(event.target);
        return;
      }
      showError(event.target, errors.join(', '));
    }

    onInputPassword = (event) => {
      const errors = this.user.setPassword(event.target.value);
      if (!errors.length) {
        hideError(event.target);
        return;
      }
      showError(event.target, errors.join(', '));
    }

    onInputConfirmPassword = (event) => {
      const errors = this.user.setConfirmPassword(event.target.value);
      if (!errors.length) {
        hideError(event.target);
        return;
      }
      showError(event.target, errors.join(', '));
    }

    onSubmitSignUpForm = (event) => {
      event.preventDefault();
      this.signUpToApp();

      if (!this.signUpForm.name.value || !this.signUpForm.email.value || !this.signUpForm.password.value || !this.signUpForm['confirm-password'].value) {
        this.alert.showErrorMessage('Please enter your credentials', 5);
      }
    };

    addListeners() {
      this.signUpForm.name.addEventListener('input', this.onInputName);
      this.signUpForm.email.addEventListener('input', this.onInputEmail);
      this.signUpForm.password.addEventListener('input', this.onInputPassword);
      this.signUpForm['confirm-password'].addEventListener('input', this.onInputConfirmPassword);
      this.signUpForm.addEventListener('submit', this.onSubmitSignUpForm);
    }

    init() {
      this.addListeners();
    }
}

const page = new SignUpPage();
page.init();

export default SignUpPage;
