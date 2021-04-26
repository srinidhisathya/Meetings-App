import makeAjaxRequest from '../utils/makeAjaxRequest.js';

async function fetchMeetings(eventDate) {
  return makeAjaxRequest(
    {
      method: 'GET',
      endpoint: `/calendar?date=${eventDate}`,
      authenticated: true,
    },
  );
}

export default fetchMeetings;
