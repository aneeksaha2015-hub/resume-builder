import axios from 'axios';

console.log("BASE URL IS:", import.meta.env.VITE_BASE_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // e.g., https://resume-builder.onrender.com/api
  // withCredentials: true, // only if you use cookies
});

export default api;
