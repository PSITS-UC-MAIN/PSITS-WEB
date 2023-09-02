import axios from "axios";

export async function getMerchandise(data: any) {
  const response = await axios.get(`merch/`, data);
  return response.data;
}

export async function createMerchandiseItem(data: any) {
  const response = await axios.post(`merch/`, data);
  return response.data;
}
export async function updateMerchandiseItem( item: { merchandiseItemId: string, data: any } ) {
  const response = await axios.patch(`merch/${item.merchandiseItemId}`, item.data);
  return response.data;
}

export async function deleteMerchandiseItem(merchandiseItemId: string) {
  const response = await axios.delete(`merch/${merchandiseItemId}`);
  return response.data;
}
