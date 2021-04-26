import AppConfig from './config.js';
import { getToken } from '../services/auth.js';

function makeAjaxRequest({
  method, endpoint, body, authenticated,
}) {
  const headers = new Headers();

  const requestOptions = {
    method,
    headers,
    redirect: 'follow',
  };

  if (body) {
    headers.append('Content-Type', 'application/json');
    requestOptions.body = JSON.stringify(body);
  }

  if (authenticated) {
    headers.append('Authorization', getToken());
  }

  // sanity check: remove leading slash (if any)
  if (endpoint.substr(0, 1) === '/') {
    endpoint = endpoint.substr(1);
  }

  return fetch(`${AppConfig.API_BASE_URL}/${endpoint}`, requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch (err) {
          error = await response.text();
        }

        const customError = new Error('Something went wrong with the request');
        console.log(error);
        customError.errorResponse = error;

        throw customError;
      }
      let res;
      try {
        res = await response.json();
        return res;
      } catch (err) {
        return '';
      }
    });
}

export default makeAjaxRequest;
