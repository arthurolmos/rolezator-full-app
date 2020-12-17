import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-rolezator-app.cloudfunctions.net/api",
});

export default api;
