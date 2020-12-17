import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-rolezator-app.cloudfunctions.net/api",
});

// const api = axios.create({ baseURL: "http://localhost:3333" });

export default api;
