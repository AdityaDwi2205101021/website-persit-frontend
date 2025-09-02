import axios from "axios";

const apiPublic = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default apiPublic;
