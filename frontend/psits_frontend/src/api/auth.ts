import axios from "axios";

export async function registerUser(data: any) {
  const response = await axios.post(`auth/register`, data);
  return response.data;
}

export async function loginUser(data: any) {
  const response = await axios.post(`auth/login`, data, { withCredentials: true });
  return response.data;
}
export async function logoutUser() {
  const response = await axios.get(`auth/logout`, { withCredentials: true });
  return response.data;
}
