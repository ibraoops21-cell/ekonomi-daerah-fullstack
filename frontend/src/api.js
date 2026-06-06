import axios from "axios";

const api = axios.create({
  baseURL: "https://net-ton-local-recommendations.trycloudflare.com/api",
});

export default api;