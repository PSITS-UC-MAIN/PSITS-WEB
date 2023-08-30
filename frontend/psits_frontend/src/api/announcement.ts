import axios from "axios";

export async function getAllAnnouncement(data: any) {
  const response = await axios.get(`announcement/`, data);
  return response.data;
}

export async function createAnnouncement(data: any) {
  const response = await axios.post(`announcement/`, data);
  return response.data;
}
export async function updateAnnouncement(announcementId: string, data: any) {
  const response = await axios.patch(`announcement/${announcementId}`, data);
  return response.data;
}

export async function deleteAnnouncement(announcementId: string) {
  const response = await axios.delete(`announcement/${announcementId}`);
  return response.data;
}
