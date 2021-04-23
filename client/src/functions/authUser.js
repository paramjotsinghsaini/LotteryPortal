import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000/";

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}
export const credits = () => {
  return axios.get(API_URL + 'credits', { headers: authHeader()});
}
export const logout = (socket) => {
  localStorage.removeItem("user");
  localStorage.clear();
  console.log("logged out");
  socket.emit('logout', {message: 'User Logged Out'});
  socket.disconnect({message: "Disconnected"});
}
export const register = (name, username, password) => {
  return axios.post(API_URL + "auth/register", {
    username,
    name,
    password
  });
}
export const login = (username, password, remember) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        if(remember){
          localStorage.setItem("remember", remember);
        }
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}