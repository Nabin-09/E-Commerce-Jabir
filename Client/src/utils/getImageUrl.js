export const getImageUrl = (img) => {
    if (!img?.data?.length) return "/placeholder.png";

    const baseURL = process.env.REACT_APP_API_URL.replace("/api", "");
    return baseURL + img.data[0].attributes.url;
};
