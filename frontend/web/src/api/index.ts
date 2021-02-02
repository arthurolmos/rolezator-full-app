import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-rolezator-app.cloudfunctions.net/api",
});

// api.interceptors.request.use((req) => {
//   // if (req.method === "post" || req.method === "POST") {
//   console.log("REQ", req);
//   // }

//   return req;
// });

export default api;
