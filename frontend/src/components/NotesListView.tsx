import React from "react";
import { Circle, Clock3, CheckCircle2, Loader2 } from "lucide-react";
import {
  NoteStatusEnum,
  type INote,
  type INoteStatus,
} from "../models/notesManagement.model";

interface NotesListViewProps {
  noteStatuses: INoteStatus[];
}

const NotesListView: React.FC<NotesListViewProps> = ({ noteStatuses }) => {
  const getStatusConfig = (status: NoteStatusEnum) => {
    switch (status) {
      case NoteStatusEnum.TODO:
        return {
          label: "To Do",
          color: "bg-blue-500",
          light: "bg-blue-50 text-blue-700 border-blue-100",
          icon: <Loader2 size={14} className="animate-spin" />,
        };

      case NoteStatusEnum.IN_PROGRESS:
        return {
          label: "In Progress",
          color: "bg-orange-400",
          light: "bg-orange-50 text-orange-700 border-orange-100",
          icon: <Clock3 size={14} />,
        };

      case NoteStatusEnum.DONE:
        return {
          label: "Completed",
          color: "bg-green-500",
          light: "bg-green-50 text-green-700 border-green-100",
          icon: <CheckCircle2 size={14} />,
        };

      default:
        return {
          label: "Unknown",
          color: "bg-gray-400",
          light: "bg-gray-50 text-gray-700 border-gray-100",
          icon: <Circle size={14} />,
        };
    }
  };

  const allNotes: INote[] = noteStatuses.flatMap((s) => s.notes);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-x-auto">
      <div className="min-w-175 grid grid-cols-12 gap-2 md:gap-4 px-3 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-gray-50 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <div className="col-span-3 text-left">Title</div>
        <div className="col-span-6">Description</div>
        <div className="col-span-3">Status</div>
      </div>

      <div className="divide-y divide-gray-100">
        {allNotes.length > 0 ? (
          allNotes.map((note) => {
            const status = getStatusConfig(note.status);

            return (
              <div
                key={note._id}
                className="min-w-175 grid grid-cols-12 gap-2 md:gap-4 px-3 md:px-6 py-3 md:py-5 hover:bg-gray-50 transition-all duration-200 items-center"
              >
                <div className="col-span-3 min-w-0">
                  <h3
                    title={note.title}
                    className="text-xs text-left font-semibold text-gray-800 truncate"
                  >
                    {note.title}
                  </h3>
                </div>

                <div className="col-span-6 min-w-0">
                  <p
                    title={note.description}
                    className="text-xs text-gray-500 line-clamp-2 wrap-break-word"
                  >
                    {note.description}
                  </p>
                </div>

                <div className="col-span-3">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${status.light}`}
                  >
                    {status.icon}
                    {status.label}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center text-sm text-gray-400">
            No notes found
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesListView;
