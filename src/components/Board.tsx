import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useBoardStore } from "../store/store";
import { Column } from "./Column";
import { useState } from "react";
import type { Task } from "../types";
import { TaskCard } from "./TaskCard";

interface ActiveTaskState {
  task: Task;
  columnId: string;
}

export const Board = () => {
  const tasks = useBoardStore((state) => state.tasks);
  const columns = useBoardStore((state) => state.columns);
  const columnOrder = useBoardStore((state) => state.columnOrder);

  const [activeTask, setActiveTask] = useState<ActiveTaskState | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const reorderTasksInColumn = useBoardStore(
    (state) => state.reorderTasksInColumn
  );
  const moveTaskToColumn = useBoardStore((state) => state.moveTaskToColumn);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks[active.id];

    const columnId = active.data.current?.columnId as string;
    if (task && columnId) {
      setActiveTask({ task, columnId });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const originalColumnId = active.data.current?.columnId as string;

    const isOverATask = over.data.current?.columnId;

    const destinationColumnId = isOverATask
      ? (over.data.current?.columnId as string)
      : (over.id as string);

    if (!originalColumnId || !destinationColumnId) return;

    if (originalColumnId === destinationColumnId) {
      if (isOverATask) {
        reorderTasksInColumn(originalColumnId, activeId, overId);
      }
      return;
    }

    moveTaskToColumn(activeId, originalColumnId, destinationColumnId, overId);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div
        className="
          w-full 
          flex 
          gap-6 
          p-6 
          overflow-x-auto 
          rounded-xl 
          border 
          border-zinc-700
          min-h-[600px]
          items-start
        "
      >
        {columnOrder.map((columnId) => {
          const column = columns[columnId];

          if (!column) return null;

          const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);
          return <Column key={columnId} column={column} tasks={columnTasks} />;
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="shadow-2xl rounded-xl rotate-3">
            <TaskCard task={activeTask.task} columnId={activeTask.columnId} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
