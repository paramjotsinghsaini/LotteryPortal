import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:5000/';

export const getDashboardContent = () => {
    return axios.get(API_URL + 'dashboard', { headers: authHeader() });
}
export const getLotteryDetail = (eve) => {
    return axios.get(API_URL + 'event/lottery', {  params: { event_id: eve }, headers: authHeader() });
}