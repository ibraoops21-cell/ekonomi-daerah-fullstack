import axios from "axios";

const api = axios.create({
  baseURL: "https://ekonomi-daerah-fullstack-sandy.vercel.app/api",
});

export default api;
