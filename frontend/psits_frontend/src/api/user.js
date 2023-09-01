import axios from "axios";
export async function getCurrentUser() {
    const response = await axios.get(`user/current-user`, { withCredentials: true });
    return response.data.user;
}
