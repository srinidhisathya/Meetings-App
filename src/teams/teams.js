import Alert from '../js/utils/alert.js';
import TeamModel from '../js/models/Team.js';
import TeamsModule from '../js/services/teams.js';

import '../styles/scss/utils.scss';
import '../styles/scss/pages/teams.scss';
import '../styles/scss/app.scss';
import '../styles/scss/nav.scss';

class TeamPage {
    teamsModule = new TeamsModule();

    alert = new Alert();

    async postTeams() {
      // POST

      const addTeamForm = document.querySelector('.add-team-form');
      const teamMembers = addTeamForm['team-members'].value.replace(/ /g, '').split(',');
      const body = {
        name: addTeamForm['team-name'].value,
        shortName: addTeamForm['short-name'].value,
        description: addTeamForm['team-description'].value,
        members: teamMembers,
      };
      try {
        const teamDetails = new TeamModel(
          body.name, body.shortName, body.description, body.members,
        );
        teamDetails.isValid();
        await this.teamsModule.postTeam(body);
        this.alert.showSuccessMessage('New Team Added Successfully!', 5);
        this.init();
      } catch (error) {
        this.alert.showErrorMessage(error.message, 5);
      }
    }

    showTeamsData(teams, users) {
      const teamsEle = document.querySelector('.teams');
      teamsEle.innerHTML = '';
      let userEle = '';
      users.forEach((user) => {
        userEle += `<option value="${user.email}">${user.email}</option>`;
      });
      teams.forEach((team) => {
        const teamMembersArray = [];

        team.members.forEach((mem) => {
          teamMembersArray.push(mem.email);
        });
        const teamId = team._id;
        const html = `
                <div class="team-box" team-id="${teamId}">
                    <h2>${team.name}</h2>
                    <p>@${team.shortName}</p>
                    <p class="sub-para">${team.description}</p>
                    <button id="${teamId}" class="excuse-me" >Excuse yourself</button>
                    
                    <hr>
                    <p class="team-members"><strong>Members:</strong>${teamMembersArray.toString().replaceAll(',', ', ')}</p>
                    <form action="https://mymeetingsapp.herokuapp.com/api/teams/${teamId}?action=add_member&email=" method="PATCH" class="add-team-member-form">
                        <select type="text"  class="add-email" placeholder=" Select member" />
                            <option value="">Select member</option>
                            ${userEle}
                        </select>
                        <button class="add-team-member" id="${teamId}">Add</button>
                    </form>
                
                </div>  
                `;
        teamsEle.innerHTML += html;
      });
      // this.alert.showSuccessMessage("Teams Loaded Successfully!", 3);
      teamsEle.innerHTML += `
            <div class="team-box plus-box cursor">
                <p class="plus" unselectable="on">+</p>
                <form action="https://mymeetingsapp.herokuapp.com/api/teams" class="add-team-form" method="POST">
                    <div class="add-team hide">
                        <span class="caution-red">* Fields are required</span>
                        <label for="team-name">Team Name <span class="red"> *</span></label>
                        <br>
                        <input type="text" id="team-name" name="team-name" class="team-inputs"/>
                        <br>
                        <label for="short-name">Short Name <span class="red"> *</span></label>
                        <br>
                        <input type="text" id="short-name" name="short-name" class="team-inputs"/>
                        <br>
                        <label for="team-description">Team Description <span class="red"> *</span></label>
                        <br>
                        <input type="text" id="team-description" name="team-description" class="team-inputs"/>
                        
                        <div>
                            <label for="team-members">Members </label>
                            <input type="text" class="add-emails team-inputs" id="team-members" name="team-members" placeholder=" Select member" />
                            <!-- <button class="add-mem">Add Members</button> -->
                        </div>
                        <input type="submit" value="Add Team" class="submit-team cursor" />
                        <input type="button" value="Cancel" class="cancel cursor" />
                        
                    </div>
                </form>
            </div>
            `;
    }

    async excuseMe(btn) {
      const teamId = btn.id;
      try {
        await this.teamsModule.excuseYouself(teamId);
        btn.closest('.team-box').classList.add('hide');
        this.alert.showSuccessMessage('Left from the team successfully', 5);
      } catch (error) {
        this.alert.showErrorMessage(error.message, 5);
      }
    }

    async addUserToTeam(form) {
      const userEmail = form.querySelector('.add-email').value;
      const teamId = form.querySelector('.add-team-member').id;
      try {
        const teamMembers = form.closest('.team-box').querySelector('.team-members');
        if (teamMembers.innerText.includes(userEmail)) { throw new Error('User Already Exists'); }

        await this.teamsModule.addTeamMember(userEmail, teamId);
        teamMembers.innerHTML += `, ${userEmail}`;
        this.alert.showSuccessMessage('Member added sucessfully', 5);
      } catch (error) {
        this.alert.showErrorMessage(error.message, 5);
      }
    }

    async fetchAndShowTeams() {
      try {
        const teams = await this.teamsModule.getTeams();
        const users = await this.teamsModule.getAllUsers();

        this.showTeamsData(teams, users);
      } catch (error) {
        this.alert.showErrorMessage(error.message, 5);
      }
    }

    showAndHidePlusBox() {
      const backgroundColor = document.querySelector('.plus-box');
      const teamFormEle = document.querySelector('.add-team');
      const plusEle = document.querySelector('.plus');
      backgroundColor.classList.toggle('form-background-color');
      teamFormEle.classList.toggle('hide');
      plusEle.classList.toggle('hide');
    }

    addListeners() {
      document.querySelector('.plus').addEventListener('click', () => {
        this.showAndHidePlusBox();
      });
      document.querySelector('.cancel').addEventListener('click', (event) => {
        event.preventDefault();
        this.showAndHidePlusBox();
      });
      document.querySelector('.add-team-form').addEventListener('submit', (event) => {
        event.preventDefault();

        this.postTeams();
      });

      const excuseBtn = document.querySelectorAll('.excuse-me');
      excuseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.excuseMe(btn);
        });
      });

      const addTeamMemForm = document.querySelectorAll('.add-team-member-form');
      addTeamMemForm.forEach((form) => {
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          this.addUserToTeam(form);
        });
      });
    }

    async init() {
      this.alert.showInfoMessage('Teams are Loading...', 2);
      await this.fetchAndShowTeams();
      this.addListeners();
    }
}

const team = new TeamPage();
team.init();
