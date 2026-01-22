import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchDataFromApi = async (endpoint) => {
  try {
    const { data } = await api.get(`/api${endpoint}`);
    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

export default api;
