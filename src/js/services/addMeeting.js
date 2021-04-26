import makeAjaxRequest from '../utils/makeAjaxRequest.js';

function addMeet(meetingObj) {
  const body = {
    name: meetingObj.meetName,
    description: meetingObj.meetDesc,
    date: meetingObj.meetDate,
    startTime: meetingObj.startTime,
    endTime: meetingObj.endTime,
    attendees: meetingObj.attendesDetails,
  };
  /* REMOVE THEN AND ADD TRY CATCH */
  makeAjaxRequest({
    method: 'POST',
    endpoint: 'meetings',
    body,
    authenticated: true,
  })
    .then((response) => response)
    .catch((error) => error);
}

export default addMeet;
