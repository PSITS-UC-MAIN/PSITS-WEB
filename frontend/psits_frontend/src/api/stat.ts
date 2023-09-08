import axios from "axios";

export async function getAllStats() {
  const response = await axios.get(`stat`);
  return response.data;
}
