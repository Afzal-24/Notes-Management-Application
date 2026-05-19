import React from "react";
import { X } from "lucide-react";
import { ACCENT } from "../pages/App";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">Delete Note</h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition bg-white hover:bg-[#ede9fe]"
          >
            <X size={18} style={{ color: ACCENT }} />
          </button>
        </div>

        <div className="px-6 py-2">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this note?
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-[#fafafa]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
