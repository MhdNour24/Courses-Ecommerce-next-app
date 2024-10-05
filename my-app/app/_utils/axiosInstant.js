import axios from "axios";

const apiKey=process.env.NEXT_PUBLIC_API_KEY
const apiUrl="http://localhost:1337/api"

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
      "content-type": "application/json",
    },
  });
  
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = apiKey; 
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;