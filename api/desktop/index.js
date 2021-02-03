import { baseUrl } from '../api-config';
import { get } from '../helpers';

export const getDesktopItems = (token, params) => Promise.all([get(token, `${baseUrl}/tasks?status[]=pending&status[]=processing`, params),
  get(token, `${baseUrl}/tickets?status[]=pending&status[]=processing`, params), get(token, `${baseUrl}/entity_tasks?status[]=pending&status[]=processing`, params)]);
