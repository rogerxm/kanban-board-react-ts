import type { BoardState } from "./types";

export const initialBoardData: BoardState = {
  // 1. Todas las tareas, indexadas por su ID
  tasks: {
    "task-1": { id: "task-1", content: "Configurar el proyecto con Vite + TS" },
    "task-2": { id: "task-2", content: "Crear componentes UI estáticos" },
    "task-3": { id: "task-3", content: "Definir interfaces de TypeScript" },
    "task-4": { id: "task-4", content: "Implementar el store de Zustand" },
    "task-5": { id: "task-5", content: "Instalar y configurar dnd-kit" },
    "task-6": { id: "task-6", content: "Conectar lógica onDragEnd al store" },
    "task-7": { id: "task-7", content: "Añadir persistencia con localStorage" },
    "task-8": { id: "task-8", content: "Estilizar el componente TaskCard" },
  },

  // 2. Las columnas, también indexadas por ID
  columns: {
    "col-1": {
      id: "col-1",
      title: "Backlog (Por Hacer)",
      // El orden de las tareas dentro de esta columna
      taskIds: ["task-1", "task-2", "task-3", "task-7"],
    },
    "col-2": {
      id: "col-2",
      title: "En Progreso",
      taskIds: ["task-4", "task-5", "task-8"],
    },
    "col-3": {
      id: "col-3",
      title: "Hecho",
      taskIds: ["task-6"],
    },
  },

  // 3. Un array que define el orden de las columnas
  columnOrder: ["col-1", "col-2", "col-3"],
};
