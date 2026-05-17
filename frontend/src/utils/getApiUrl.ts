const isLocal = import.meta.env.VITE_IS_LOCAL === "true";

const getUrl = () => {
  return isLocal
    ? import.meta.env.VITE_URL_LOCAL
    : import.meta.env.VITE_URL_PROD;
};

export default getUrl;
