import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    common: {
      Accept: "application/json",
    },
  },
  withCredentials: true,
});

export default axiosClient;
