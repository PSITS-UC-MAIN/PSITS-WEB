import axios from "axios";

export async function getAllOrders(search: string, page: number) {
  const response = await axios.get(`order?page=${page}&search=${search}`);
  return response.data;
}

export async function getOrderById(orderId: string) {
  const response = await axios.get(`order/single/${orderId}`);
  return response.data.order
}

export async function getCurrentUserOrders(userId: string) {
  const response = await axios.get(`order/${userId}`);
  return response.data;
}

export async function createOrder({ userId, data }: { userId: string; data: any }) {
  const response = await axios.post(`order/${userId}`, data);
  return response.data;
}

export async function updateOrder({ userId, data }: { userId: string; data: any }) {
  const response = await axios.patch(`order/${userId}`, data);
  return response.data;
}
