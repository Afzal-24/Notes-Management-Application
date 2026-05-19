import React, { useState } from "react";
import { NoteStatusEnum, type INote } from "../models/notesManagement.model";
import { useSortable } from "@dnd-kit/sortable";
import { Edit, EllipsisVertical, GripVertical, Trash2 } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import EditNoteModal from "./EditNoteModal";
import { useDispatch, useSelector } from "react-redux";
import type { RootDispatch, RootState } from "../store";
import { deleteNote } from "../store/slices/notesManagement.slice";
import DeleteModal from "./DeleteModal";

interface NotesKanbanCardProps {
  note: INote;
}

const NotesKanbanCard: React.FC<NotesKanbanCardProps> = ({ note }) => {
  const dispatch = useDispatch<RootDispatch>();

  const { deleteNoteLoading } = useSelector(
    (state: RootState) => state.noteManagement.loadingStates,
  );

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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

  const handleDelete = async () => {
    try {
      await dispatch(deleteNote(note._id)).unwrap();

      setOpenDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="w-full min-w-0 group bg-white rounded-2xl text-left p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-grab active:cursor-grabbing"
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

          <div className="flex items-start gap-1 relative">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="p-1 rounded-lg hover:bg-gray-100 transition"
            >
              <EllipsisVertical size={16} className="text-gray-500" />
            </button>

            <GripVertical
              size={18}
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-400 shrink-0 mt-1 "
            />

            {openMenu && (
              <div className="absolute right-0 top-8 w-36 bg-white border border-gray-100 shadow-xl rounded-2xl p-1 z-50">
                <button
                  onClick={() => {
                    setOpenMenu(false);
                    setOpenEditModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1 rounded-xl text-xs text-gray-700 hover:bg-gray-50 transition"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenMenu(false);
                    setOpenDeleteModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-700 hover:bg-gray-50 transition"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
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
      <EditNoteModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        note={note}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteNoteLoading}
      />
    </>
  );
};

export default NotesKanbanCard;
