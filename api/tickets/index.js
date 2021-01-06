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
