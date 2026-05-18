import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootDispatch, RootState } from "../store";
import {
  addNote,
  getNoteStatuses,
} from "../store/slices/notesManagement.slice";
import { NoteStatusEnum } from "../models/notesManagement.model";
import { ACCENT } from "../App";
import { toast } from "sonner";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
  status: NoteStatusEnum;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  open,
  onClose,
  status,
}) => {
  const dispatch = useDispatch<RootDispatch>();

  const { addNoteLoading } = useSelector(
    (state: RootState) => state.noteManagement.loadingStates,
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleCreate = async () => {
    if (!title || !description) {
      toast.error("Title and description are required");

      return;
    }
    try {
      await dispatch(
        addNote({
          title,
          description,
          status,
        }),
      ).unwrap();

      dispatch(getNoteStatuses());

      setTitle("");
      setDescription("");

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex justify-between px-6 py-5 border-b">
          <div className="text-left">
            <h2 className="text-lg font-bold text-gray-800">Create New Note</h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new task to this column
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition bg-white hover:bg-[#ede9fe]"
          >
            <X size={18} style={{ color: ACCENT }} />
          </button>
        </div>

        <div className="p-6 space-y-5 text-left">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 text-gray-800 rounded-2xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[#4f46e5] focus:ring-4 focus:ring-[#ede9fe]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Description
            </label>

            <textarea
              placeholder="Write note description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full rounded-2xl text-gray-800 border border-gray-200 p-4 text-sm outline-none resize-none transition focus:border-[#4f46e5] focus:ring-4 focus:ring-[#ede9fe]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-[#fafafa]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm font-medium border border-[#ede9fe] text-[#4f46e5] bg-white transition hover:bg-[#ede9fe]"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={addNoteLoading}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition disabled:opacity-50 bg-[#4f46e5] hover:opacity-90"
          >
            {addNoteLoading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
