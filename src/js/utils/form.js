function showError(formControlEl, error) {
  const errorElement = formControlEl.closest('.form-group').querySelector('.err-msg');
  errorElement.innerHTML = error;
  errorElement.style.display = 'block';
}

function hideError(formControlEl) {
  const errorElement = formControlEl.closest('.form-group').querySelector('.err-msg');
  errorElement.innerHTML = '';
  errorElement.style.display = 'none';
}

export {
  showError,
  hideError,
};
