class Meeting {
  constructor(name = '', description = '', date = '', startHour = '', startMin = '', endHour = '', endMin = '', mailIds = '') {
    if (typeof name === 'object') {
      Object.assign(this, name);
    }
    this.name = name;
    this.description = description;
    this.date = date;
    this.startHour = startHour;
    this.startMin = startMin;
    this.endHour = endHour;
    this.endMin = endMin;
    this.mailIds = mailIds;
  }

  validateName() {
    const namePat = /^[A-Z a-z]+[0-9]{0,4}$/;
    const error = [];

    if (!this.name.trim()) {
      error.push('Name is empty or has only spaces');
    }
    if (!namePat.test(this.name)) {
      error.push('Please enter a valid name.');
    }

    return error;
  }

  validateDate() {
    const error = [];

    if (!this.date) {
      error.push('Please enter a valid date.');
    }

    return error;
  }

  validateMailId() {
    const emailPat = /^([A-Za-z]+@[A-Za-z]+\.com,?)+$/;
    const error = [];

    if (!this.mailIds) {
      error.push('Email is empty');
    }
    if (!emailPat.test(this.mailIds)) {
      error.push('Email format is not valid.');
    }

    return error;
  }

  validateDescription() {
    const error = [];

    if (!this.description) {
      error.push('Please enter valid description.');
    }

    return error;
  }

  validateStartHour() {
    const error = [];

    if (!this.startHour) {
      error.push('Please enter a valid start hour.');
    } else if (this.startHour < 0 || this.startHour > 23) {
      error.push('Hours should be between 0 and 23.');
    }
    return error;
  }

  validateStartMin() {
    const error = [];

    if (!this.startMin) {
      error.push('Please enter valid start time.');
    } else if (this.startMin < 0 || this.startMin > 59) {
      error.push('Minutes should be between 0 and 59.');
    }

    return error;
  }

  validateEndHour() {
    const error = [];

    if (!this.endHour) {
      error.push('Please enter a valid end hour.');
    } else if (this.endHour < 0 || this.endHour > 23) {
      error.push('Hours should be between 0 and 23.');
    }

    return error;
  }

  validateEndMin() {
    const error = [];

    if (!this.endMin) {
      error.push('Please enter valid end time.');
    } else if (this.endMin < 0 || this.endMin > 59) {
      error.push('Minutes should be between 0 and 59.');
    }

    return error;
  }

  validateTime() {
    const error = [];
    if (this.startHour < this.endHour) {
      return;
    }
    if (this.startHour > this.endHour) {
      error.push('End time should be greater than start time.');
    } else if (this.startHour === this.endHour) {
      if (this.startMin > this.endMin) {
        error.push('End time should be greater than start time.');
      }
    }
    // eslint-disable-next-line consistent-return
    return error;
  }

  setName(name) {
    this.name = name;
    return this.validateName();
  }

  setDate(date) {
    this.date = date;
    return this.validateDate();
  }

  setStartHour(startHour) {
    this.startHour = startHour;
    return this.validateStartHour();
  }

  setStartMin(startMin) {
    this.startMin = startMin;
    return this.validateStartMin();
  }

  setEndHour(endHour) {
    this.endHour = endHour;
    return this.validateEndHour();
  }

  setEndMin(endMin) {
    this.endMin = endMin;
    return this.validateEndMin();
  }

  setDescription(description) {
    this.description = description;
    return this.validateDescription();
  }

  setMailIds(mailIds) {
    this.mailIds = mailIds;
    return this.validateMailId();
  }

  setTime({
    startHour, startMin, endHour, endMin,
  }) {
    this.startHour = startHour;
    this.StartMin = startMin;
    this.endHour = endHour;
    this.endMin = endMin;
    const error1 = this.validateTime();
    return error1;
  }
}

export default Meeting;
