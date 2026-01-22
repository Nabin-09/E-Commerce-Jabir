
export const getImageUrl = (img) => {
  if (!img?.data?.length) return "/placeholder.png";

  const base = process.env.REACT_APP_API_URL.replace("/api", "");
  return base + img.data[0].attributes.url;
};