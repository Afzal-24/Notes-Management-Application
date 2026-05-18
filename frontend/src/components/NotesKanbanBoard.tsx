import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootDispatch, RootState } from "../store";
import { getNoteStatuses } from "../store/slices/notesManagement.slice";
import NotesKanbanColumn from "./NotesKanbanColumn";
import Loading from "./Loading";

const NotesKanbanBoard: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { noteStatuses, loading } = useSelector(
    (state: RootState) => state.noteManagement,
  );

  useEffect(() => {
    dispatch(getNoteStatuses());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {noteStatuses && noteStatuses.length > 0 ? (
          noteStatuses.map((status) => (
            <NotesKanbanColumn
              key={status._id}
              status={status}
              notes={status.notes || []}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">No status columns found</div>
        )}
      </div>
    </div>
  );
};

export default NotesKanbanBoard;
