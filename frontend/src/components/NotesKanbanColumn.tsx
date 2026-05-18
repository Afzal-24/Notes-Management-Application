import React, { useState } from "react";
import {
  NoteStatusEnum,
  type INote,
  type INoteStatus,
} from "../models/notesManagement.model";
import NotesKanbanCard from "./NotesKanbanCard";
import { Plus } from "lucide-react";
import AddNoteModal from "./AddNoteModal";

interface NotesKanbanColumnProps {
  status: INoteStatus;
  notes: INote[];
}

const NotesKanbanColumn: React.FC<NotesKanbanColumnProps> = ({
  status,
  notes,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const getRegistrationStatusDotColor = (status?: NoteStatusEnum): string => {
    switch (status) {
      case NoteStatusEnum.TODO:
        return "bg-blue-500";
      case NoteStatusEnum.IN_PROGRESS:
        return "bg-orange-400";
      case NoteStatusEnum.DONE:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusLabel = (status?: NoteStatusEnum): string => {
    switch (status) {
      case NoteStatusEnum.TODO:
        return "To Do";
      case NoteStatusEnum.IN_PROGRESS:
        return "In Progress";
      case NoteStatusEnum.DONE:
        return "Completed";
      default:
        return "Unnamed";
    }
  };

  return (
    <div className="w-87.5 min-w-87.5 max-w-87.5 bg-[#F8FAFC] border border-gray-100 rounded-xl shadow-sm px-2 py-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 pb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 truncate flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${getRegistrationStatusDotColor(
                status.status,
              )}`}
            />
            <span className="font-bold">{getStatusLabel(status.status)}</span>
            <span className="text-sm font-medium text-gray-400">
              ({notes?.length || 0})
            </span>
          </h3>
        </div>
        <div>
          <button
            className="text-gray-500 hover:text-gray-600 transition border rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
            title="Add Note"
            onClick={() => setOpenModal(true)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {notes && notes.length > 0 ? (
          notes.map((note) => <NotesKanbanCard key={note._id} note={note} />)
        ) : (
          <div className="flex text-xs text-gray-400 mt-4 text-center justify-center items-end">
            No notes in this column
          </div>
        )}
      </div>
      <AddNoteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        status={status.status}
      />
    </div>
  );
};

export default NotesKanbanColumn;
