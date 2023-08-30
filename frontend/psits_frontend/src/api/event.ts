import axios from "axios";

export async function getAllEvents(data: any) {
  const response = await axios.get(`event/`, data);
  return response.data;
}

export async function createEvent(data: any) {
  const response = await axios.post(`event/`, data);
  return response.data;
}
export async function updateEvent(eventId: string, data: any) {
  const response = await axios.patch(`event/${eventId}`, data);
  return response.data;
}

export async function deleteEvent(eventId: string) {
  const response = await axios.delete(`event/${eventId}`);
  return response.data;
}
