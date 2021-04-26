import addMeet from '../js/services/addMeeting.js';
import { showError, hideError } from '../js/utils/form.js';
import Meeting from '../js/models/Meeting.js';
import Alert from '../js/utils/alert.js';

import '../styles/scss/utils.scss';
import '../styles/scss/pages/addmeeting.scss';
import '../styles/scss/app.scss';
import '../styles/scss/nav.scss';

class AddMeetingPage {
  alert = new Alert();

  addMeetingForm = document.querySelector('form');

  dateEl = document.querySelector('#mdate');

  nameEl = document.querySelector('#meeting-name');

  descEl = document.querySelector('#desc');

  memberEl = document.querySelector('#eid');

  startHourEl = document.querySelector('#stime');

  startMinEl = document.querySelector('#stime-min');

  endHourEl = document.querySelector('#etime');

  endMinEl = document.querySelector('#etime-min');

  user = new Meeting();

  dateErrorCheck = (event) => {
    const errors = this.user.setDate(event.target.value);
    if (errors.length === 0) {
      hideError(event.target, '#date-error');
      return;
    }
    showError(event.target, errors.join(', '), '#date-error');
  }

  nameErrorCheck = (event) => {
    const errors = this.user.setName(event.target.value);
    console.log(event.target);
    if (errors.length === 0) {
      hideError(event.target, '#name-error');

      return;
    }
    showError(event.target, errors.join('. '), '#name-error');
  }

  descErrorCheck = (event) => {
    const errors = this.user.setDescription(event.target.value);
    if (errors.length === 0) {
      hideError(event.target, '#desc-error');
      return;
    }
    showError(event.target, errors.join(', '), '#desc-error');
  }

  memberErrorCheck = (event) => {
    const errors = this.user.setMailIds(event.target.value);

    if (errors.length === 0) {
      hideError(event.target, '#member-error');
      return;
    }
    showError(event.target, errors.join('. '), '#member-error');
  }

  startHourErrorCheck = (event) => {
    const errors = this.user.setStartHour(event.target.value);

    if (errors.length === 0) {
      hideError(event.target, '#start-hour-error');
      return;
    }
    showError(event.target, errors.join(', '), '#start-hour-error');
  };

  startMinErrorCheck = (event) => {
    const errors = this.user.setStartMin(event.target.value);

    if (errors.length === 0) {
      hideError(event.target, '#start-min-error');
      return;
    }
    showError(event.target, errors.join(', '), '#start-min-error');
  };

  endHourErrorCheck = (event) => {
    const errors = this.user.setEndHour(event.target.value);

    if (errors.length === 0) {
      hideError(event.target, '#end-hour-error');

      return;
    }

    showError(event.target, errors.join(', '), '#end-hour-error');
  };

  endMinErrorCheck = (event) => {
    const errors = this.user.setEndMin(event.target.value);
    if (errors.length === 0) {
      hideError(event.target, '#end-min-error');

      return;
    }

    showError(event.target, errors.join(', '), '#end-min-error');
  };

  async addMeeting({
    meetName, meetDesc, meetDate, startHour, startMin, endHour, endMin, emailIds,
  }) {
    const attendesDetails = [];
    for (let i = 0; i < emailIds.length; i++) {
      attendesDetails.push({ email: emailIds[i] });
    }
    console.log(attendesDetails);
    const startTime = {
      hours: startHour,
      minutes: startMin,
    };
    const endTime = {
      hours: endHour,
      minutes: endMin,
    };
    try {
      await addMeet({
        meetName, meetDesc, meetDate, startTime, endTime, attendesDetails,
      });
      this.alert.showSuccessMessage('Meeting has been added', 4);
    } catch (error) {
      this.alert.showErrorMessage(`Call to add meeting failed because ${error.message}`, 3);
    }
  }

  validateOnSubmit() {
    const errorName = this.user.setName(this.nameEl.value);
    const errorDate = this.user.setDate(this.dateEl.value);
    const errorDesc = this.user.setDescription(this.descEl.value);
    const errorEmailID = this.user.setMailIds(this.memberEl.value);
    const errorStartHour = this.user.setStartHour(this.startHourEl.value);
    const errorStartMin = this.user.setStartMin(this.startMinEl.value);
    const errorEndHour = this.user.setEndHour(this.endHourEl.value);
    const errorEndMin = this.user.setEndMin(this.endMinEl.value);
    let firstErrorEl = null;

    if (errorName.length !== 0) {
      showError(this.nameEl, errorName.join('. '), '#name-error');
      firstErrorEl = firstErrorEl || this.nameEl;
    } else {
      hideError(this.nameEl, '#name-error');
    }

    if (errorDate.length !== 0) {
      showError(this.dateEl, errorDate.join(','), '#date-error');
      firstErrorEl = firstErrorEl || this.dateEl;
    } else {
      hideError(this.dateEl, '#date-error');
    }

    if (errorStartHour.length !== 0) {
      showError(this.startHourEl, errorStartHour.join(','), '#start-hour-error');
      firstErrorEl = firstErrorEl || this.startHourEl;
    } else {
      hideError(this.startHourEl, '#start-hour-error');
    }

    if (errorStartMin.length !== 0) {
      showError(this.startMinEl, errorStartMin.join(','), '#start-min-error');
      firstErrorEl = firstErrorEl || this.startMinEl;
    } else {
      hideError(this.startMinEl, '#start-min-error');
    }

    if (errorEndHour.length !== 0) {
      showError(this.endHourEl, errorEndHour.join(','), '#end-hour-error');
      firstErrorEl = firstErrorEl || this.endHourEl;
    } else {
      hideError(this.endHourEl, '#end-hour-error');
    }

    if (errorEndMin.length !== 0) {
      showError(this.endMinEl, errorEndMin.join(','), '#end-min-error');
      firstErrorEl = firstErrorEl || this.endMinEl;
    } else {
      hideError(this.endMinEl, '#end-min-error');
    }

    if (errorDesc.length !== 0) {
      showError(this.descEl, errorDesc.join(','), '#desc-error');
      firstErrorEl = firstErrorEl || this.descEl;
    } else {
      hideError(this.descEl, '#desc-error');
    }

    if (errorEmailID.length !== 0) {
      showError(this.memberEl, errorEmailID.join('. '), '#member-error');
      firstErrorEl = firstErrorEl || this.memberEl;
    } else {
      hideError(this.memberEl, '#member-error');
    }

    if (firstErrorEl) {
      firstErrorEl.focus();
    }
    return firstErrorEl === null;
  }

  addMeetingToApp = () => {
    if (!this.validateOnSubmit()) {
      return;
    }
    const error = this.user.setTime({
      startHour: this.startHourEl.value,
      startMin: this.startMinEl.value,
      endHour: this.endHourEl.value,
      endMin: this.endMinEl.value,
    });
    if (error) {
      this.alert.showErrorMessage('Please enter valid meeting time.', 3);
      return;
    }
    this.addMeeting({
      meetName: this.nameEl.value,
      meetDesc: this.descEl.value,
      meetDate: this.dateEl.value,
      startHour: this.startHourEl.value,
      startMin: this.startMinEl.value,
      endHour: this.endHourEl.value,
      endMin: this.endMinEl.value,
      emailIds: this.memberEl.value,
    });
  };

  onAddMeetForm = (event) => {
    event.preventDefault();
    this.addMeetingToApp();
  };

  addListeners() {
    this.nameEl.addEventListener('input', this.nameErrorCheck);
    this.dateEl.addEventListener('change', this.dateErrorCheck);
    this.startHourEl.addEventListener('input', this.startHourErrorCheck);
    this.startMinEl.addEventListener('input', this.startMinErrorCheck);
    this.endHourEl.addEventListener('input', this.endHourErrorCheck);
    this.endMinEl.addEventListener('input', this.endMinErrorCheck);
    this.descEl.addEventListener('input', this.descErrorCheck);
    this.memberEl.addEventListener('input', this.memberErrorCheck);
    this.addMeetingForm.addEventListener('submit', this.onAddMeetForm);
  }

  init() {
    this.alert.showInfoMessage('Loading Add meetings..', 1);
    this.addListeners();
  }
}

const addmeet = new AddMeetingPage();
addmeet.init();
