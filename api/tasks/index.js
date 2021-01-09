import axios from 'axios';
import { baseUrl } from '../api-config';
import { get, getFormDataOptions } from '../helpers';

export const login = (loginInfo) => {
  const loginUrl = `${baseUrl}/users/auth_user`;
  return axios(getFormDataOptions(loginUrl, loginInfo));
};

export const getUser = async (token, userId) => {
  const userUrl = `${baseUrl}/users/${userId}`;
  return get(token, userUrl);
};

export const getTasks = async (token, params) => {
  const tasksUrl = `${baseUrl}/tasks`;
  return get(token, tasksUrl, params);
};

export const getCurrentTask = async (token, id) => {
  const taskUrl = `${baseUrl}/tasks/${id}`;
  return get(token, taskUrl);
};

export const createTaskComment = async (token, taskId, comment) => {
  const url = `${baseUrl}/tasks/${taskId}/task_comments`;
  return axios.post(url, {
    task_comment: {
      comment,
    },
  }, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const getTaskComments = async (token, taskId) => {
  const commentsUrl = `${baseUrl}/tasks/${taskId}/task_comments`;
  return get(token, commentsUrl);
};

export const updateCheckListItem = async ({
  token, taskTodoId, todoItemId, completed_at,
}) => {
  const url = `${baseUrl}/task_todos/${taskTodoId}/task_todo_items/${todoItemId}`;
  return axios.put(url, {
    completed_at: completed_at || null,
  }, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const updateTask = async ({ token, id, body }) => {
  const url = `${baseUrl}/tasks/${id}`;
  return axios.put(url, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const getTaskFiles = async (token, taskId) => {
  const filesUrl = `${baseUrl}/tasks/${taskId}/task_attachments`;
  return get(token, filesUrl);
};

export const addFile = ({ token, taskId, data }) => {
  const url = `${baseUrl}/tasks/${taskId}/task_attachments`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const removeFile = ({ token, taskId, fileId }) => {
  const url = `${baseUrl}/tasks/${taskId}/task_attachments/${fileId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};
