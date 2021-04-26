class TeamModel {
  constructor(teamName, teamShortName, teamDescription, teamMembers) {
    this.teamName = teamName;
    this.teamShortName = teamShortName;
    this.teamDescription = teamDescription;
    this.teamMembers = teamMembers;

    Object.assign(this, teamName, teamShortName, teamDescription, teamMembers);
  }

  throwErrorIfExists(errors) {
    if (errors.length) {
      throw new Error(errors.join(', '));
    }
  }

  validateTeamName(teamName) {
    const errors = [];
    if (teamName === '') {
      errors.push('Name is empty or has only spaces');
    }

    this.throwErrorIfExists(errors);
  }

  validateShortName(shortName) {
    const errors = [];

    if (shortName === '') {
      errors.push('Short Name is empty or has only spaces');
    }

    this.throwErrorIfExists(errors);
  }

  validateDescription(description) {
    const errors = [];

    if (description === '') {
      errors.push('Description is empty or has only spaces');
    }
    this.throwErrorIfExists(errors);
  }

  validateTeamMembers(teamMembers) {
    const errors = [];

    if (teamMembers === '') {
      errors.push('TeamMembers is empty or has only spaces');
    }

    this.throwErrorIfExists(errors);
  }

  isValid() {
    try {
      this.validateTeamName(this.teamName);
      this.validateShortName(this.teamShortName);
      this.validateDescription(this.teamDescription);
      this.validateTeamMembers(this.teamMembers);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  setName(teamName) {
    this.teamName = teamName;
    this.validateTeamName(teamName);
  }

  setShortName(shortName) {
    this.shortName = shortName;
    this.validateShortName(shortName);
  }

  setDescription(description) {
    this.description = description;
    this.validateDescription(description);
  }

  setTeamMembers(teamMembers) {
    this.teamMembers = teamMembers;
    this.validateTeamMembers(teamMembers);
  }
}

export default TeamModel;
