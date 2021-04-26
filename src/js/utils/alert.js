/* eslint-disable no-undef */
class Alert {
  showSuccessMessage(message, duration) {
    NC.show({
      type: 'success',
      title: 'Success',
      description: message,
      duration,
    });
  }

  showErrorMessage(message, duration) {
    NC.show({
      type: 'error',
      title: 'Oops!',
      description: message,
      duration,
    });
  }

  showInfoMessage(message, duration) {
    NC.show({
      type: 'info',
      title: 'Info',
      description: message,
      duration,
    });
  }
}

export default Alert;
