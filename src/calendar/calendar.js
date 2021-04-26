import Alert from '../js/utils/alert.js';
import dateFormatConvert from '../js/utils/date.js';
import fetchMeetings from '../js/services/calendar.js';
import Meeting from '../js/models/Meeting.js';

import '../styles/scss/utils.scss';
import '../styles/scss/pages/calendar.scss';
import '../styles/scss/app.scss';
import '../styles/scss/nav.scss';

class Calendar {
    alert = new Alert();

    currentMeetings = []

    calculateEventHeight(timeObj) {
      /**
         * one blue bar on the page represents 1 hr, which is of height 40px.
         * let barHeight = 40px.
         * one minute represents 40/60 => 2/3.
         * space between each bars is 5px.
         * let space = 5px.
         * start with the startHour iterate through endHour-1, add 45 (barHeight + space).
         * if endMin is zero subtract space(5 px).
         * else add that much height(2/3 * endMin).
         * */
      let height = (40 - (2 * (timeObj.startMinute / 3))) + 5;
      for (let start = timeObj.startHour, end = timeObj.endHour - 1; start < end; (start += 1)) {
        height += 40 + 5;
      }
      height += 2 * (timeObj.endMinute / 3);
      if (timeObj.endMinute === 0) {
        height -= 5;
      }
      return height;
    }

    showMeetings(meetings) {
      meetings.forEach((meeting) => {
        meeting = meeting.name;
        const eventHeight = this.calculateEventHeight(
          {
            startHour: meeting.startTime.hours,
            startMinute: meeting.startTime.minutes,
            endHour: meeting.endTime.hours,
            endMinute: meeting.endTime.minutes,
          },
        );
        console.log(eventHeight);
        let meetingAttendees = '';
        (meeting.attendees).forEach((member) => {
          meetingAttendees += `<li class='display-inline'>${member.email}</li>`;
        });
        const marginTop = 2 * ((meeting.startTime.minutes) / 3);

        const hours = document.querySelectorAll('.bar span');
        hours.forEach((hr) => {
          if (hr.innerText === parseInt(meeting.startTime.hours, 10).toString()) {
            this.currentMeetings.push(meeting._id);

            const division = hr.nextSibling;
            const msgBox = document.createElement('div');

            msgBox.className = 'event-box';
            msgBox.id = `${meeting._id}`;
            msgBox.style.top = `${marginTop}px`;

            const msgDivBox = document.createElement('div');
            msgDivBox.className = 'msg-box';
            msgDivBox.style.height = `${eventHeight}px`;

            msgDivBox.innerHTML = `
                        
                        <div class='title-heading underline'>${meeting.name}</div>
                        <span>Attendees :</span>
                        <ul class='display-inline attendees-list'>${meetingAttendees}</ul>
                        
                   `;
            msgBox.appendChild(msgDivBox);
            division.appendChild(msgBox);
          }
        });
      });
      this.alert.showSuccessMessage('Fetched Meetings Successfully', 3);
    }

    setDate(currentDate) {
      document.getElementById('today').value = currentDate;
      const readbleDate = dateFormatConvert(currentDate);
      const finalDate = readbleDate.split(' ');

      const date = finalDate[0];
      const month = finalDate[1];
      const year = finalDate[2];
      const week = finalDate[3];

      const dateString = `${date} ${month} ${year}`;

      document.getElementById('readable-date').innerText = dateString;
      document.getElementById('weekday').innerText = week;
    }

    async ivokeMeetings(currentDate) {
      try {
        const meetings = await fetchMeetings(currentDate);
        if (meetings.length === 0) {
          throw new Error('No meetings scheduled for the selected date');
        }
        const meetingsList = meetings.map((meeting) => new Meeting(meeting));

        this.showMeetings(meetingsList);
      } catch (error) {
        this.alert.showErrorMessage(error.message, 5);
      }
    }

    resetCalendar() {
      for (let meeting = 0, len = this.currentMeetings.length; meeting < len; meeting += 1) {
        const meetings = document.getElementById(this.currentMeetings[meeting]);
        meetings.parentNode.removeChild(meetings);
      }
      this.currentMeetings = [];
    }

    addListener() {
      document.getElementById('today').addEventListener('change', async () => {
        this.resetCalendar();

        const selectedDate = document.getElementById('today').value;

        this.setDate(selectedDate);

        this.ivokeMeetings(selectedDate);
      });
    }

    init() {
      this.alert.showInfoMessage('Loading Meetings ...', 1);
      const today = new Date().toISOString().split('T')[0];
      this.setDate(today);
      this.ivokeMeetings(today);
      this.addListener();
    }
}

const calendar = new Calendar();
calendar.init();
const calcHeight = Calendar.prototype.calculateEventHeight;
export default calcHeight;
