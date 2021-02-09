import { baseUrl } from '../api-config';
import { get } from '../helpers';

export const getDesktopItems = (token, params) => {
  const filter = params ?? '?status[]=pending&status[]=processing';
  return Promise.all([get(token, `${baseUrl}/tasks${filter}`),
    get(token, `${baseUrl}/tickets${filter}`), get(token, `${baseUrl}/entity_tasks${filter}`)]);
};
