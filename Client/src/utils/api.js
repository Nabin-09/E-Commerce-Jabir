import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1337",
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
