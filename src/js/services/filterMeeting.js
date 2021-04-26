import makeAjaxRequest from '../utils/makeAjaxRequest.js';

async function getUsers() {
  const users = await makeAjaxRequest({
    method: 'GET',
    endpoint: 'users',
    authenticated: true,
  });

  return users;
}
async function searchMeet(date, search) {
  const meetings = await makeAjaxRequest({
    method: 'GET',
    endpoint: `/meetings?period=${date}&search=${search}`,
    authenticated: true,
  });

  return meetings;
}

async function addMember(meetingId, userId) {
  const addMemberAjax = await makeAjaxRequest({
    method: 'PATCH',
    endpoint: `/meetings/${meetingId}?action=add_attendee&userId=${userId}`,
    authenticated: true,
  });
  return addMemberAjax;
}

async function excuseYourself(meetingId) {
  const excuseMemberAjax = await makeAjaxRequest({
    method: 'PATCH',
    endpoint: `/meetings/${meetingId}?action=remove_attendee`,
    authenticated: true,
  });
  return excuseMemberAjax;
}

export {
  excuseYourself,
  addMember,
  searchMeet,
  getUsers,
};
