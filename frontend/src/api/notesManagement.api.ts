import axiosSetup from "../utils/axiosSetup";

export const getNoteStatusesApi = async () => {
  const response = await axiosSetup.get("/notes/get-note-statuses");
  return response.data;
};

export const addNoteApi = async (data: {
  title: string;
  description: string;
  status: string;
}) => {
  const response = await axiosSetup.post("/notes/add-note", data);

  return response.data;
};
