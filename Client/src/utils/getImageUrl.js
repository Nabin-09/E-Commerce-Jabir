export const getImageUrl = (imgArr) => {
  if (!Array.isArray(imgArr) || imgArr.length === 0) {
    return "/placeholder.png";
  }

  const url = imgArr[0]?.url;

  if (!url) return "/placeholder.png";

  // Cloudinary or absolute
  if (url.startsWith("http")) return url;

  // Local Strapi upload
  return `${process.env.REACT_APP_API_URL}${url}`;
};
