import { create } from "zustand";

import { type BoardState } from "../types";
import { initialBoardData } from "../initialData";
import { arrayMoveImmutable as arrayMove } from "array-move";
import { persist } from "zustand/middleware";

export interface Store extends BoardState {
  reorderTasksInColumn: (
    columnId: string,
    activeId: string,
    overId: string
  ) => void;

  moveTaskToColumn: (
    activeId: string,
    originalColumnId: string,
    newColumnId: string,
    overId: string
  ) => void;

  addTask: (columnId: string, content: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  editTask: (taskId: string, newContent: string) => void;
}

export const useBoardStore = create(
  persist<Store>(
    (set) => ({
      ...initialBoardData,

      reorderTasksInColumn: (columnId, activeId, overId) => {
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          // Encuentra los índices de las tareas que se están moviendo
          const oldIndex = column.taskIds.indexOf(activeId);
          const newIndex = column.taskIds.indexOf(overId);

          // Si no se encuentran, no se hace nada
          if (oldIndex === -1 || newIndex === -1) return state;

          // Crea un nuevo array reordenado usando 'array-move'
          const newTaskIds = arrayMove(column.taskIds, oldIndex, newIndex);

          return {
            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: newTaskIds,
              },
            },
          };
        });
      },

      moveTaskToColumn: (activeId, originalColumnId, newColumnId, overId) => {
        set((state) => {
          const originalColumn = state.columns[originalColumnId];
          const newColumn = state.columns[newColumnId];

          if (!originalColumn || !newColumn) return state;

          const newOriginalTaskIds = originalColumn.taskIds.filter(
            (id) => id !== activeId
          );

          const newNewTaskIds = [...newColumn.taskIds];

          let overIndex = newNewTaskIds.indexOf(overId);
          if (overIndex === -1) {
            overIndex = newNewTaskIds.length;
          }

          newNewTaskIds.splice(overIndex, 0, activeId);

          return {
            columns: {
              ...state.columns,
              [originalColumnId]: {
                ...originalColumn,
                taskIds: newOriginalTaskIds,
              },
              [newColumnId]: {
                ...newColumn,
                taskIds: newNewTaskIds,
              },
            },
          };
        });
      },
      addTask: (columnId, content) => {
        const newTaskId = `task-${Date.now()}`;

        const newTask = {
          id: newTaskId,
          content,
        };

        set((state) => {
          const newTaks = {
            ...state.tasks,
            [newTaskId]: newTask,
          };

          const column = state.columns[columnId];
          const newTaskIds = [...column.taskIds, newTaskId];

          return {
            tasks: newTaks,
            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: newTaskIds,
              },
            },
          };
        });
      },
      deleteTask(columnId, taskId) {
        set((state) => {
          const column = state.columns[columnId];
          const newTaskIds = column.taskIds.filter((id) => id !== taskId);

          const newTasks = { ...state.tasks };
          delete newTasks[taskId];

          return {
            tasks: newTasks,
            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: newTaskIds,
              },
            },
          };
        });
      },
      editTask(taskId, newContent) {
        set((state) => {
          return {
            tasks: {
              ...state.tasks,
              [taskId]: {
                id: taskId,
                content: newContent,
              },
            },
          };
        });
      },
    }),
    {
      name: "kanban-storage",
    }
  )
);
