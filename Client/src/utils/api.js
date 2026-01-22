import axios from "axios";
import { STRAPI_BASE_URL } from "./constants";

export const fetchDataFromApi = async (endpoint) => {
    const res = await fetch(`${STRAPI_BASE_URL}/api${endpoint}`);
    return res.json();
};

const api = axios.create({
    baseURL: `${STRAPI_BASE_URL}/api`,
});

export default api;
