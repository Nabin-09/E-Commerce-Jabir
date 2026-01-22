export const getImageUrl = (imgArr) => {
  if (!imgArr || imgArr.length === 0) return "/placeholder.png";

  const url = imgArr[0]?.url;

  // If Cloudinary (absolute URL), return as-is
  if (url?.startsWith("http")) return url;

  // Else local upload
  return `${process.env.REACT_APP_API_URL}${url}`;
};
