import { create } from "zustand";
import { ITarea } from "../types/ITareas";

interface ITareaStore {
    tareas: ITarea[];
    tareaActiva: ITarea | null;
    setTareaActiva: (tareaActiva: ITarea | null) => void;
    setArrayTareas: (arrayDeTareas: ITarea[]) => void;
    agregarNuevaTarea: (nuevaTarea: ITarea[]) => void;
    editarUnaTarea: (tareaEditada: ITarea) => void;
    eliminarUnaTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
    tareas: [],
    tareaActiva: null,
    setTareaActiva: (tareaActivaIn: ITarea | null) => set(() => ({ tareaActiva: tareaActivaIn })),
    setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),
    agregarNuevaTarea: (nuevaTarea) => set((state) => ({ tareas: [...state.tareas, ...nuevaTarea] })),
    editarUnaTarea: (tareaEditada) => set((state) => {
        const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea);
        return { tareas: arregloTareas };
    }),
    eliminarUnaTarea: (idTarea) => set((state) => {
        const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea);
        return { tareas: arregloTareas };
    })
}));