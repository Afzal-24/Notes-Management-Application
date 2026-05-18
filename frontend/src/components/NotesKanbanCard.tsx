import React from "react";
import type { INote } from "../models/notesManagement.model";

interface NotesKanbanCardProps {
  note: INote;
}

const NotesKanbanCard: React.FC<NotesKanbanCardProps> = ({ note }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
            {note.title}
          </h4>
        </div>

        {note.description && (
          <p className="text-xs text-gray-600 line-clamp-3">
            {note.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotesKanbanCard;
