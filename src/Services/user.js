import axios from "axios"

let apiUrl = "https://localhost:8080"

export const signIn = async (user) => {
    const res = await axios.get(`${apiUrl}/signin`, user);
    return res;
}

export const signUp = async (user) => {
    const res = await axios.post(`${apiUrl}/signup`, user);
    return res;
}
export const getAllVideos = async () => {
    const res = await axios.get(`${apiUrl}/getAllVideos`);
    return res;
}

export const postPicture = async (url, checkPicture) => {
    const res = await axios.post(`${apiUrl}/postPicture/${url}/${checkPicture}`);
    return res;
}

export const addToHistory = async (videoId, userId, date) => {
    const res = await axios.post(`${apiUrl}/addToHistory/${videoId}/${userId}/${date}`);
    return res;
}

export const getHistoryUser = async (userId) => {
    const res = await axios.get(`${apiUrl}/getHistoryUser/${userId}`);
    return res;
}
