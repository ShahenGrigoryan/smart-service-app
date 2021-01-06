import { baseUrl } from '../api-config';
import { get } from '../helpers';

export const getDesktopItems = (token, params) => Promise.all([get(token, `${baseUrl}/tasks`, params),
  get(token, `${baseUrl}/tickets`, params), get(token, `${baseUrl}/entity_tasks`, params)]);
