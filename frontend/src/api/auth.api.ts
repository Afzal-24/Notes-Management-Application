import axiosSetup from "../utils/axiosSetup";

export const loginApi = async (data: { email: string; password: string }) => {
  const response = await axiosSetup.post("/auth/login", data);
  return response.data;
};
