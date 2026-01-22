// utils/getImageUrl.js
export const getImageUrl = (url) => {
  if (!url) return "/placeholder.png";
  return `${process.env.REACT_APP_API_URL}${url}`;
};
