import { STRAPI_BASE_URL } from "./constants";

export const getImageUrl = (item) => {
  return item?.attributes?.img?.data?.[0]?.attributes?.url
    ? `${STRAPI_BASE_URL}${item.attributes.img.data[0].attributes.url}`
    : "/placeholder.png";
};
