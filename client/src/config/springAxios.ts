import axios from "axios";

export const springAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// Make every springAxios request with jwt if it is present
springAxios.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt") || sessionStorage.getItem("jwt");

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
