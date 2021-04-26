/* eslint-disable no-shadow */
const NC = (function () {
  let position; let ncContainer;
  function createNotificationsCenter(options) {
    ncContainer = document.createElement('div');

    ncContainer.classList.add('notifications-center');

    const ncPosition = position[options.position];
    ncContainer.style.top = ncPosition.top;
    ncContainer.style.right = ncPosition.right;
    ncContainer.style.bottom = ncPosition.bottom;
    ncContainer.style.left = ncPosition.left;

    document.body.appendChild(ncContainer);
  }

  function show({
    type, title, description, duration,
  }) {
    const ncNotification = document.createElement('div');

    ncNotification.classList.add('notification');
    ncNotification.classList.add(`notification-${type}`);
    ncNotification.innerHTML = `
            <span class="notification-close">&times;</span>
            <div class="notification-title">${title}</div>
            <div class="notification-description">${description}</div>
        `;

    ncContainer.appendChild(ncNotification);

    function hide() {
      ncNotification.remove();
    }

    ncNotification.querySelector('.notification-close').addEventListener('click', hide);

    if (duration) {
      setTimeout(hide, duration * 1000);
    }

    return {
      hide,
    };
  }

  function init(options) {
    createNotificationsCenter(options);
  }

  const NC = {
    init,
    show,
    POSITION: {
      TOP_RIGHT: 'top right',
      BOTTOM_RIGHT: 'bottom right',
      BOTTOM_LEFT: 'bottom left',
      TOP_LEFT: 'top left',
    },
  };

  position = {
    [NC.POSITION.TOP_RIGHT]: {
      top: '0px',
      right: '0px',
      bottom: 'auto',
      left: 'auto',
    },
    [NC.POSITION.BOTTOM_RIGHT]: {
      top: 'auto',
      right: '0px',
      bottom: '0px',
      left: 'auto',
    },
    [NC.POSITION.BOTTOM_LEFT]: {
      top: 'auto',
      right: 'auto',
      bottom: '0px',
      left: '0px',
    },
    [NC.POSITION.TOP_LEFT]: {
      top: '0px',
      right: 'auto',
      bottom: 'auto',
      left: '0px',
    },
  };

  return NC;
}());
NC.init({
  position: NC.POSITION.TOP_RIGHT,

});
