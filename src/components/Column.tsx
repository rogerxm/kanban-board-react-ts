import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Column as ColumnType, Task } from "../types";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

// Esta función asigna un color de Tailwind basado en el título
const getIndicatorColor = (title: string) => {
  const normalizedTitle = title.toLowerCase();

  if (
    normalizedTitle.includes("hacer") ||
    normalizedTitle.includes("backlog")
  ) {
    return "bg-red-500";
  }
  if (normalizedTitle.includes("progreso")) {
    return "bg-yellow-500";
  }
  if (normalizedTitle.includes("hecho") || normalizedTitle.includes("done")) {
    return "bg-green-500";
  }

  return "bg-zinc-500";
};

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  const indicatorColor = getIndicatorColor(column.title);

  return (
    <div
      ref={setNodeRef}
      className="
        w-90
        mx-auto
        shrink-0
        flex flex-col
        rounded-xl
        bg-zinc-800
        max-h-[calc(100vh-12rem)]
      "
    >
      <div
        className="
          p-5 pb-4 
          shrink-0 
          flex items-center justify-between // <-- Alinea título e indicador
        "
      >
        <h3 className="text-xl font-semibold">{column.title}</h3>
        <span className={`w-3 h-3 rounded-full ${indicatorColor}`}></span>
      </div>

      <SortableContext
        items={column.taskIds}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="
            flex flex-col
            gap-3
            p-5 pt-2
            overflow-y-auto
            min-h-[100px]
          "
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} columnId={column.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
