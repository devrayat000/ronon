import axios from "axios";

const api = axios.create({
  baseURL: "https://rononbd.up.railway.app/api/",
  withCredentials: true,
});

export { api };
