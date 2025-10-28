import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStore } from "../store/store";
import type React from "react";

interface TaskProps {
  task: Task;
  columnId: string;
}

export const TaskCard = ({ task, columnId }: TaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      columnId,
    },
  });

  const deleteTask = useBoardStore((state) => state.deleteTask);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    deleteTask(columnId, task.id);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="
        p-4
        bg-zinc-900
        rounded-lg 
        shadow-sm  
        cursor-grab 
        transition-shadow
        duration-150        
        hover:shadow-md  
        focus:outline-none
        focus:ring-2      
        focus:ring-blue-500 
        relative
      "
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 w-6 h-6 text-zinc-500 hover:text-white hover:bg-red-500 rounded-full flex items-center justify-center"
      >
        &times;
      </button>
      <p className="text-base font-medium text-zinc-100">{task.content}</p>
    </div>
  );
};
