import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootDispatch, RootState } from "../store";
import {
  getNoteStatuses,
  reorderNotesInColumn,
  updateNoteStatus,
  updateNoteStatusLocally,
} from "../store/slices/notesManagement.slice";
import NotesKanbanColumn from "./NotesKanbanColumn";
import Loading from "./Loading";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import type { INote } from "../models/notesManagement.model";
import { toast } from "sonner";
import NotesKanbanCard from "./NotesKanbanCard";

const NotesKanbanBoard: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { noteStatuses, loading } = useSelector(
    (state: RootState) => state.noteManagement,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<INote | null>(null);

  useEffect(() => {
    dispatch(getNoteStatuses());
  }, [dispatch]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveNote(event.active.data.current?.note);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverColumnId(event.over?.data.current?.columnId || null);
  };

  const onNoteDragEnd = async ({
    noteId,
    sourceStatus,
    destinationStatus,
    currentIndex,
    destinationIndex,
  }: {
    noteId: string;
    sourceStatus: string;
    destinationStatus: string;
    currentIndex: number;
    destinationIndex: number;
  }) => {
    try {
      await dispatch(
        updateNoteStatus({
          noteId,
          currentStatus: sourceStatus,
          destinationStatus,
          currentIndex,
          destinationIndex,
        }),
      ).unwrap();

      if (sourceStatus !== destinationStatus) {
        toast.success(
          `Note moved from "${sourceStatus}" to "${destinationStatus}"`,
        );
      }
    } catch (err) {
      toast.error("Error updating note status");
      throw err;
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverColumnId(null);
    setActiveNote(null);

    if (!over || !active?.data?.current || !over?.data?.current) return;

    const noteId = active.id as string;
    const sourceStatus = active.data.current.status;
    const destStatus = over.data.current.status;

    if (!sourceStatus || !destStatus) return;

    const sourceStatusObj = noteStatuses.find((s) => s.status === sourceStatus);
    const destStatusObj = noteStatuses.find((s) => s.status === destStatus);

    if (!sourceStatusObj || !destStatusObj) return;

    const currentIndex = sourceStatusObj.notes.findIndex(
      (n: any) => n._id === noteId,
    );

    if (currentIndex === -1) return;

    const overNoteId = over.id as string;
    let destinationIndex = -1;

    if (overNoteId !== destStatus) {
      destinationIndex = destStatusObj.notes.findIndex(
        (n: any) => n._id === overNoteId,
      );
    }

    if (sourceStatus === destStatus) {
      // Reorder within same column
      if (currentIndex !== destinationIndex && destinationIndex >= 0) {
        dispatch(
          reorderNotesInColumn({
            status: sourceStatus,
            dragIndex: currentIndex,
            hoverIndex: destinationIndex,
          }),
        );
        await onNoteDragEnd({
          noteId,
          sourceStatus,
          destinationStatus: destStatus,
          currentIndex,
          destinationIndex,
        });
      }
    } else {
      // Move to different column
      dispatch(
        updateNoteStatusLocally({
          noteId,
          newStatus: destStatus,
          sourceStatus,
          destinationIndex:
            destinationIndex >= 0 ? destinationIndex : undefined,
        }),
      );
      await onNoteDragEnd({
        noteId,
        sourceStatus,
        destinationStatus: destStatus,
        currentIndex,
        destinationIndex: destinationIndex >= 0 ? destinationIndex : 0,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay>
        {activeNote ? (
          <div className="pointer-events-none opacity-80 ">
            <NotesKanbanCard note={activeNote} />
          </div>
        ) : null}
      </DragOverlay>

      <div className="p-4">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {noteStatuses && noteStatuses.length > 0 ? (
            noteStatuses.map((status) => (
              <NotesKanbanColumn
                key={status._id}
                status={status}
                notes={status.notes || []}
                overColumnId={overColumnId}
              />
            ))
          ) : (
            <div className="text-sm text-gray-500">No status columns found</div>
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default NotesKanbanBoard;
