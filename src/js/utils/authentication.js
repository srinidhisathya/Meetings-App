class Authentication {
  authenticate() {
    if (localStorage.getItem('token') === null) {
      window.location.href = '../auth/signin/signin';
    }
  }
}

const auth = new Authentication();
auth.authenticate();
