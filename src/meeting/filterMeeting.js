/* eslint-disable no-shadow */
import {
  addMember, excuseYourself, searchMeet, getUsers,
} from '../js/services/filterMeeting.js';
import dateFormatConvert from '../js/utils/date.js';
import User from '../js/models/User.js';
import Meeting from '../js/models/Meeting.js';
import Alert from '../js/utils/alert.js';

import '../styles/scss/utils.scss';
import '../styles/scss/app.scss';
import '../styles/scss/nav.scss';

class SearchForMeeting {
    alert = new Alert();

     searchMeetingForm = document.querySelector('form');

     searchResults = document.querySelector('.search-results');

     searchHeading = document.querySelector('#search-heading');

     addListeners() {
       async function onBtnAddMemberClick() {
         const teamEl = this.closest('.section-border');
         const teamId = teamEl.getAttribute('data-team-id');
         const selectedMember = teamEl.querySelector('select').value;

         try {
           const mail = await addMember(teamId, selectedMember);
           const mailOfAttendees = mail.attendees;
           teamEl.querySelector('.attendees-list').innerHTML += `,${mailOfAttendees[mailOfAttendees.length - 1].email}`;
         } catch (error) {
           alert(`Call to add member api failed because${error.message}`);
         }
       }

       document.querySelectorAll('.add-btn').forEach((button) => {
         button.addEventListener('click', onBtnAddMemberClick);
       });

       function onClickExcuse() {
         const teamEl = this.closest('.section-border');
         const teamId = teamEl.getAttribute('data-team-id');

         try {
           excuseYourself(teamId);
         } catch (error) {
           alert('call to excuse yourself failed because', error.message);
         }
         teamEl.remove();
       }

       document.querySelectorAll('.excuse-btn').forEach((button) => {
         button.addEventListener('click', onClickExcuse);
       });
     }

     showFilterHeading() {
       this.searchHeading.style.display = 'block';
     }

    filteredMeetings = [];

    async searchMeeting() {
      this.alert.showInfoMessage('Loading Meetings ...', 1);
      const date = this.searchMeetingForm.date.value;
      const search = this.searchMeetingForm.search.value;

      let teamUsers = '';
      try {
        const usersRaw = await getUsers();
        const users = usersRaw.map((user) => new User(user));
        users.forEach((member) => {
          teamUsers += `<option value="${member._id}">${member.email.name}</option>`;
        });
      } catch (error) {
        alert(`call to get users api is failed becuase${error.message}`);
      }
      let meetingsRaw;
      let meetingsModels;
      try {
        meetingsRaw = await searchMeet(date, search);
        meetingsModels = meetingsRaw.map((meetingsModel) => new Meeting(meetingsModel));
        console.log(meetingsModels);
      } catch (error) {
        alert(`call to search meet failed because${error.message}`);
      }
      let i = 0;

      meetingsModels.forEach((result) => {
        result = meetingsModels[i++];

        this.filteredMeetings.push(result.name._id);

        const name = `${result.name.name}`;
        if (result.name.startTime.hours < 10) {
          result.name.startTime.hours = `0${result.name.startTime.hours}`;
        }
        if (result.name.startTime.minutes < 10) {
          result.name.startTime.minutes = `0${result.name.startTime.minutes}`;
        }
        if (result.name.endTime.hours < 10) {
          result.name.endTime.hours = `0${result.name.endTime.hours}`;
        }
        if (result.name.endTime.minutes < 10) {
          result.name.endTime.minutes = `0${result.name.endTime.minutes}`;
        }
        console.log(result.name.endTime.minutes + result.name.endTime.minutes.length);
        const startTime = `${result.name.startTime.hours}:${result.name.startTime.minutes}`;
        const endTime = `${result.name.endTime.hours}:${result.name.endTime.minutes}`;
        const dateString = (new Date(result.name.date)).toDateString();

        let attendeesList = '';

        result.name.attendees.forEach((member) => {
          attendeesList += `<li class="display-inline">${member.email}</li>`;
        });
        const formatedDate = dateFormatConvert(dateString);
        const date = formatedDate.split(' ');

        const datee = `${date[0]} ${date[1]} ${date[2]}`;

        this.searchResults.innerHTML += `
        
        <div class="section-border line-break-5" data-team-id="${result._id}" id="${result._id}">
            
            <section class="stl-section">
                <div class="stl-border" >
                    <span class="medium-heading">${datee}</span><strong>${startTime} <span class="sr-only">to</span>- ${endTime}</strong>
                    <span class="title-msg">${name}</span>
                    <button class="btn excuse-btn line-break-10">Excuse yourself</button>
                </div>
            </section>
            
            <section class="section-attend">
                <span class="medium-heading attendees">Attendees:</span>
                <ul class="attendees-list display-inline">${attendeesList}</ul>
                
                <div class="list-flex-row align-items-center">
                    <label for="member-project" class="sr-only">Select Member</label>
                    <select name="member-project" id="member-project" class="select-member" >
                    ${teamUsers}
                    </select>
                    <button class="btn add-btn"> Add</button>
                </div>
            </section>

            </div> 
        `;
        this.addListeners();
      });
    }

    resetMeetings() {
      for (let i = 0; i < this.filteredMeetings.length; ++i) {
        const meeting = document.getElementById(this.filteredMeetings[i]);
        console.log(meeting);
        this.searchResults.removeChild(meeting);
      }
      this.filteredMeetings = [];
    }

    filterMeeting() {
      this.searchMeetingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        this.showFilterHeading();
        await this.resetMeetings();
        this.searchMeeting();
      });
    }
}

const obj = new SearchForMeeting();
obj.filterMeeting();
