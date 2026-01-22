import { STRAPI_BASE_URL } from "./constants";

export const fetchDataFromApi = async (endpoint) => {
  try {
    const res = await fetch(`${STRAPI_BASE_URL}/api${endpoint}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err.message);
    throw err;
  }
};
