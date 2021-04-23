import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:5000/';

export const buyTicket = async (event_id) => {
  return await axios.get(API_URL + 'ticket/buy', { params: { event_id: event_id }, headers: authHeader()});
}
export const checkPurchased = async (event_id) => {
  return await axios.get(API_URL + "ticket/check", { params: { event_id: event_id }, headers: authHeader()});
}