import axios from "axios";

export const api = axios.create({
  baseURL: "https://ronon.herokuapp.com/api/",
});
