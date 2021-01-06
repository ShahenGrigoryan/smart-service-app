import axios from 'axios';
import { baseUrl } from '../api-config';
import { get } from '../helpers';

export const getChecks = async (token, params) => {
  const checksUrl = `${baseUrl}/entity_tasks`;
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
