import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api", // replace with your backend server URL
    withCredentials : true, 
})