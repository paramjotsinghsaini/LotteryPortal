import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export const getHomeContent = () => {
    return axios.get(API_URL + 'events/all');
}