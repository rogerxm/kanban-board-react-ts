import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "../types";
import { CSS } from "@dnd-kit/utilities";

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
      "
    >
      <p className="text-base font-medium text-zinc-100">{task.content}</p>

      <p className="text-sm text-zinc-400 mt-1">No comments</p>
    </div>
  );
};
