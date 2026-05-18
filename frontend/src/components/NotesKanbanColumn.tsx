import React from "react";
import {
  NoteStatusEnum,
  type INote,
  type INoteStatus,
} from "../models/notesManagement.model";
import NotesKanbanCard from "./NotesKanbanCard";

interface NotesKanbanColumnProps {
  status: INoteStatus;
  notes: INote[];
}

const NotesKanbanColumn: React.FC<NotesKanbanColumnProps> = ({
  status,
  notes,
}) => {
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
    <div
      className="min-w-[320px] bg-[#F8FAFC] border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col"
      style={{ height: "70vh" }}
    >
      <div className="flex items-center gap-2 mb-3 pb-2">
        <h3 className="text-sm font-semibold text-gray-900 truncate flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${getRegistrationStatusDotColor(
              status.status,
            )}`}
          />
          <span className="font-bold">{getStatusLabel(status.status)}</span>
        </h3>

        <span className="text-sm font-medium text-gray-400">
          ({notes?.length || 0})
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {notes && notes.length > 0 ? (
          notes.map((note) => <NotesKanbanCard key={note._id} note={note} />)
        ) : (
          <div className="flex text-xs text-gray-400 mt-4 h-[55vh] text-center justify-center items-end">
            No notes in this column
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesKanbanColumn;
