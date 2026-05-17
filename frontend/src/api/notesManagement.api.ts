import axiosSetup from "../utils/axiosSetup";

export const getNoteStatusesApi = async () => {
  const response = await axiosSetup.get("/notes/get-note-statuses");
  return response.data;
};
