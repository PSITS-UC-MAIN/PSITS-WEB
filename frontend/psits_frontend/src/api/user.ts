import axios from "axios";

export async function getCurrentUser() {
  const response = await axios.get(`user/current-user`);
  return response.data.user;
}

export async function getAllUser() {
  const response = await axios.get(`user`);
  return response.data.users;
}

export async function getUserbyId(userId: string) {
  const response = await axios.get(`user/${userId}`);
  return response.data;
}

export async function updateUserbyId(userId: string, data: any) {
  const response = await axios.post(`user/${userId}`, data);
  return response.data;
}

export async function deleteUserbyId(userId: string) {
  const response = await axios.get(`user/${userId}`);
  return response.data;
}
