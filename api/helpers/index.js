import axios from 'axios';
import { getParamsText } from '../../utils';

export const getFormDataOptions = (url = '', data = {}) => {
  const formData = new FormData();
  const keys = Object.keys(data);
  const values = Object.values(data);
  formData.append('email', data.email);
  formData.append('password', data.password);
  keys.forEach((item, index) => {
    formData.append(item, values[index]);
  });
  return {
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  };
};

export const get = (token, url, params) => {
  const urlParams = getParamsText(params);
  console.log('url params', urlParams);
  console.log(`${url}${urlParams}`);
  return axios.get(`${url}${urlParams}`, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};

export const post = async ({
  token, url, data, headers,
}) => axios.post(url, data, {
  headers: headers ?? {
    Authorization: `Bearer: ${token}`,
    'Content-type': 'application/json',
  },
});

export const put = ({
  token, url, body, headers,
}) => axios.put(url, {
  body: JSON.stringify(body),
  headers: headers ?? {
    Authorization: `Bearer: ${token}`,
    'Content-type': 'application/json',
  },
});
