import axios from 'axios';
import { baseUrl } from '../api-config';
import { get } from '../helpers';

function getFormDataOptions(url = '', data = {}) {
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
}

export const login = (loginInfo) => {
  const loginUrl = `${baseUrl}/users/auth_user`;
  return axios(getFormDataOptions(loginUrl, loginInfo));
};

export const getUser = async (token, userId) => {
  const userUrl = `${baseUrl}/users/${userId}`;
  return get(token, userUrl);
};

export const getPayrolls = async ({
  token, userId, startDate, endDate,
}) => {
  const userUrl = `${baseUrl}/users/${userId}/payrolls?startDate=${startDate}&endDate=${endDate}`;
  return get(token, userUrl);
};

export const logout = async (token) => {
  const url = `${baseUrl}/users/logout`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};
