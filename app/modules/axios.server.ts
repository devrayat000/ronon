import axios from "axios";

export const api = axios.create({
  baseURL: "https://rononbd.up.railway.app/api/",
});
