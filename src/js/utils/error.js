function showError(formControlEl, error, selector) {
  const errorElement = formControlEl.closest('.add-meeting-form').querySelector(selector);
  errorElement.innerHTML = error;
  errorElement.style.display = 'block';
}

function hideError(formControlEl, selector) {
  console.log(formControlEl, selector);
  const errorElement = formControlEl.closest('.add-meeting-form').querySelector(selector);
  errorElement.innerHTML = '';
  errorElement.style.display = 'none';
}

export {
  showError,
  hideError,
};
