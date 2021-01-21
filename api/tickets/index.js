import axios from 'axios';
import { baseUrl } from '../api-config';
import { get, post, put } from '../helpers';

export const getTickets = async (token, params) => {
  const ticketsUrl = `${baseUrl}/tickets`;
  return get(token, ticketsUrl, params);
};

export const getCurrentTicket = async (token, id, params) => {
  const ticketUrl = `${baseUrl}/tickets/${id}`;
  return get(token, ticketUrl, params);
};

export const createTicketComment = async (token, ticketId, comment) => {
  const url = `${baseUrl}/tickets/${ticketId}/ticket_comments`;
  const data = {
    ticket_comment: {
      comment,
    },
  };
  return post({ token, url, data });
};

export const updateTicket = async ({ token, id, body }) => {
  const url = `${baseUrl}/tickets/${id}`;
  return put({ token, body, url });
};

export const getTicketFiles = async (token, ticketId) => {
  const filesUrl = `${baseUrl}/tickets/${ticketId}/ticket_attachments`;
  return get(token, filesUrl);
};

export const addFile = ({ token, ticketId, data }) => {
  const url = `${baseUrl}/tickets/${ticketId}/ticket_attachments`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const removeFile = ({ token, ticketId, fileId }) => {
  const url = `${baseUrl}/tickets/${ticketId}/ticket_attachments/${fileId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });
};

export const getStatuses = ({ token, ticketId }) => {
  const url = `https://apitest.mysmartservice.com/api/v1/tickets/${ticketId}/statuses`;
  return get(token, url);
};

export const changeStatus = ({ token, ticketId, status }) => {
  const url = `https://apitest.mysmartservice.com/api/v1/tickets/${ticketId}/status`;
  return axios.put(url, JSON.stringify(status), { headers: { Authorization: `Bearer: ${token}` } });
};
