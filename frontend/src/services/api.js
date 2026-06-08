import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-zy6c.onrender.com",
});

export default API;