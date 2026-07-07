import axios from "axios";

const api = axios.create({
  baseURL: "https://web-production-efff7.up.railway.app/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session Expired or Token Invalid. Logging out...");
      
   
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

 
      window.location.replace("/"); 
      
      
      return new Promise(() => {}); 
    }
    return Promise.reject(error);
  }
);

export default api;