import axios from 'axios';
import { baseUrl } from '../api-config';
import { get } from '../helpers';

export const getChecks = async (token, params) => {
  const filter = params ?? '?status[]=pending&status[]=processing';
  const checksUrl = `${baseUrl}/entity_tasks${filter}`;
  return get(token, checksUrl, params);
};

export const getCurrentCheck = async (token, id) => {
  const checkUrl = `${baseUrl}/entity_tasks/${id}`;
  return get(token, checkUrl);
};

export const createCheckComment = async (token, checkId, comment) => {
  const url = `${baseUrl}/entity_tasks/${checkId}/entity_task_comments`;
  return axios.post(url, {
    entity_task_comment: {
      comment,
    },
  }, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const getCheckComments = async (token, checkId) => {
  const commentsUrl = `${baseUrl}/checks/${checkId}/check_comments`;
  return get(token, commentsUrl);
};

export const updateCheckListItem = async ({
  token, checkTodoId, todoItemId, completed_at,
}) => {
  const url = `${baseUrl}/entity_task_todos/${checkTodoId}/entity_task_todo_items/${todoItemId}`;

  return axios.put(url, {
    completed_at: completed_at || null,
  }, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const updateCheck = async ({ token, id, body }) => {
  const url = `${baseUrl}/checks/${id}`;
  return axios.put(url, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const getCheckFiles = async (token, checkId) => {
  const filesUrl = `${baseUrl}/entity_tasks/${checkId}/entity_task_attachments`;
  return get(token, filesUrl);
};

export const addFile = ({ token, checkId, data }) => {
  const url = `${baseUrl}/entity_tasks/${checkId}/entity_task_attachments`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const removeFile = ({ token, checkId, fileId }) => {
  const url = `${baseUrl}/entity_tasks/${checkId}/entity_task_attachments/${fileId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};
export const changeCheckStatus = ({ token, checkId, status }) => {
  const url = `${baseUrl}/entity_tasks/${checkId}/status`;
  const data = JSON.stringify(status);

  const config = {
    method: 'put',
    url,
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(config);
};
