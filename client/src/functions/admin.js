import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000/admin/";

export const deleteUser = (userId) => {
  return axios.get(API_URL + 'delete/user', {  
            params: { userId: userId },
            headers: authHeader()
          });
}
export const deleteLottery = (eventId) => {
  return axios.get(API_URL + 'delete/lottery', {  
            params: { eventId: eventId },
            headers: authHeader()
          });
}
export const getUserUsingId = (userId) => {
  return axios.get(API_URL + 'user', { params: {userId:userId}, headers: authHeader()});
}
export const saveUser = (id ,fullname, username, password) => {
  return axios.post(API_URL + "user/submit", {
    id,
    username,
    fullname,
    password
  }, { headers: authHeader() });
}
export const getLotteryUsingId = (eventId) => {
  return axios.get(API_URL + 'lottery', { params: {eventId:eventId}, headers: authHeader()});
}
export const saveLottery = (id, name, entryFee, maxParticipants) => {
  return axios.post(API_URL + "lottery/submit", {
    id,
    name,
    entryFee,
    maxParticipants
  }, { headers: authHeader() });
}
export const updateUserCredits = (id, amount) => {
  return axios.post(API_URL + "credit/update", {
    userId: id,
    amount: amount
  }, { headers: authHeader() });
}