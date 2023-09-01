import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
export async function registerUser(data) {
    const response = await axios.post(`auth/register`, data);
    return response.data;
}
export async function loginUser(data) {
    const response = await axios.post(`auth/login`, data, { withCredentials: true });
    return response.data;
}
export async function logoutUser() {
    const response = await axios.get(`auth/logout`, { withCredentials: true });
    return response.data;
}
