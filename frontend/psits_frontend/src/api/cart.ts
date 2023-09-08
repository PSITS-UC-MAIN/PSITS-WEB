import axios from "axios";

export async function getCartItems(data: any) {
  const response = await axios.get(`cart/${data}`);
  return response.data;
}

export async function addToCart({ userId, data }: { userId: number ,data: any }) {
  const response = await axios.post(`cart/${userId}`, data);
  return response.data;
}

export async function updateCartItem ({ userId, data }: { userId: number, data: any }) {
  const response = await axios.patch(`cart/${userId}`, data);
  return response.data;
}

export async function removeFromCart({ userId, merchId }: { userId: number, merchId: string }) {
  const response = await axios.delete(`cart/${userId}/${merchId}`);
  return response.data;
}
