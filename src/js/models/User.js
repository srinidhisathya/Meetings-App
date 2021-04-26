class User {
  constructor(email = '', password = '', name = '', confirmPassword = '') {
    if (typeof email === 'object') {
      Object.assign(this, email);
    }
    this.email = email;
    this.password = password;
    this.name = name;
    this.confirmPassword = confirmPassword;
  }

  validateName() {
    const errors = [];

    if (!this.name.trim()) {
      errors.push('Name is empty or has only spaces');
    }
    return errors;
  }

  validateEmail() {
    const emailPat = /^[a-z0-9\.]+@[a-z]+\.com$/;
    const errors = [];

    if (!this.email.trim()) {
      errors.push('Email is empty or has only spaces');
    }

    if (!emailPat.test(this.email)) {
      errors.push('Email format is not valid');
    }
    return errors;
  }

  validatePassword() {
    const passwordPat = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
    const errors = [];

    if (!this.password) {
      errors.push('Password is empty');
    }

    if (!passwordPat.test(this.password)) {
      errors.push('Password must contain 1 uppercase,1 lowercase,1 digit ,1 special char & minimum 8 characters');
    }
    return errors;
  }

  validateConfirmPassword() {
    const errors = [];

    if (!this.confirmPassword) {
      errors.push('Password is empty');
    }

    if (this.confirmPassword !== this.password) {
      errors.push('Passwords do not match');
    }
    return errors;
  }

  validateLogin() {
    const errors = {};

    errors.email = this.validateEmail();
    errors.password = this.validatePassword();

    return errors;
  }

  validateSignUp() {
    const errors = {};

    errors.name = this.validateName();
    errors.email = this.validateEmail();
    errors.password = this.validatePassword();
    errors.confirmPassword = this.validateConfirmPassword();

    return errors;
  }

  isValidLogin() {
    const errors = this.validateLogin();
    return !errors.email.length && !errors.password.length;
  }

  isValidRegister() {
    const errors = this.validateSignUp();
    return (
      !errors.name.length
      && !errors.email.length
      && !errors.password.length
      && !errors.confirmPassword.length);
  }

  setName(name) {
    this.name = name;
    return this.validateName();
  }

  setEmail(email) {
    this.email = email;
    return this.validateEmail();
  }

  setPassword(password) {
    this.password = password;
    return this.validatePassword();
  }

  setConfirmPassword(confirmPassword) {
    this.confirmPassword = confirmPassword;
    return this.validateConfirmPassword();
  }
}

export default User;
