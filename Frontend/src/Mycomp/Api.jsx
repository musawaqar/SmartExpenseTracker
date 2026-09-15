import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your backend URL and prefix
});

export default API;