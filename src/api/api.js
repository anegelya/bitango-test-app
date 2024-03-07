import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
});

// NOTE: Axios interceptors can be placed here

export default api;
