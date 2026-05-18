import React from "react";
import { NoteStatusEnum, type INote } from "../models/notesManagement.model";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

interface NotesKanbanCardProps {
  note: INote;
}

const NotesKanbanCard: React.FC<NotesKanbanCardProps> = ({ note }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: note._id!,
    data: { note, status: note.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const getProgress = () => {
    switch (note.status) {
      case NoteStatusEnum.TODO:
        return 20;

      case NoteStatusEnum.IN_PROGRESS:
        return 70;

      case NoteStatusEnum.DONE:
        return 100;

      default:
        return 0;
    }
  };

  const getProgressColor = () => {
    switch (note.status) {
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

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="w-full min-w-0 group bg-white rounded-xl text-left p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4
              title={note.title}
              className="text-sm font-semibold text-gray-800 cursor-pointer line-clamp-2"
            >
              {note.title}
            </h4>

            <p
              title={note.description}
              className="text-xs text-gray-500 mt-1 line-clamp-2"
            >
              {note.description}
            </p>
          </div>

          <GripVertical
            size={18}
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 shrink-0"
          />
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">Progress</span>

            <span className="text-xs font-semibold text-gray-600">
              {getProgress()}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{
                width: `${getProgress()}%`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesKanbanCard;
