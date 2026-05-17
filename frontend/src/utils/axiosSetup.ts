import axios from "axios";
import getUrl from "./getApiUrl";
import { toast } from "sonner";
import { clearToken, getToken } from "./auth";

const api = axios.create({
  baseURL: `${getUrl()}/v1`,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.showMessage) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 400:
          toast.error(response.data.message || "Bad Request");
          break;

        case 401:
          toast.error(
            response.data.message || "Unauthorized: Please login again",
          );

          clearToken();

          window.location.href = "/login";
          break;

        case 403:
          toast.error(response.data.message || "Forbidden");
          break;

        case 404:
          toast.error(response.data.message || "Resource not found");
          break;

        case 500:
          toast.error(response.data.message || "Internal server error");
          break;

        default:
          toast.error(response.data.message || "Something went wrong");
      }
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
