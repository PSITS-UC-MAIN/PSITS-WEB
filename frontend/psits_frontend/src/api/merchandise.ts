import axios from "axios";

export async function getMerchandise(data: any) {
  const response = await axios.get(`merch/`, data);
  return response.data;
}

export async function createMerchandiseItem(data: any) {
  const response = await axios.post(`merch/`, data);
  return response.data;
}
export async function updateMerchandiseItem(merchandiseItemId: string, data: any) {
  const response = await axios.patch(`merch/${merchandiseItemId}`, data);
  return response.data;
}

export async function deleteAnnouncement(merchandiseItemId: string) {
  const response = await axios.delete(`merch/${merchandiseItemId}`);
  return response.data;
}
