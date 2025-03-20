import React from 'react'
import { tareaStore } from '../store/tareaStore'
import { useShallow } from 'zustand/shallow'
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from '../http/tareas'
import { ITarea } from '../types/ITareas'

export const useTareas = () => {
    const { tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea } = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea,
    })))

    const getTareas = async () => {
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    }

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea([nuevaTarea]);
        try {
            await postNuevaTarea(nuevaTarea);
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!);
            console.error('Error en crearTarea:', error);
        }
    }

    const putTarea = async (nuevaTarea: ITarea) => {
        const estadoPevio = tareas.find((el) => el.id === nuevaTarea.id);
        editarUnaTarea(nuevaTarea);
        try {
            await editarTarea(nuevaTarea);
        } catch (error) {
            if (estadoPevio) editarUnaTarea(estadoPevio);
            console.error('Error en putTarea:', error);
        }
    }

    const eliminarTarea = async (idTarea: string) => {
        const estadoPevio = tareas.find((el) => el.id === idTarea);
        eliminarUnaTarea(idTarea); // Actualiza el estado localmente
        try {
            await eliminarTareaPorID(idTarea);
        } catch (error) {
            if (estadoPevio) agregarNuevaTarea([estadoPevio]);
            console.error('Error en eliminarTarea:', error);
        }
    }

    return {
        getTareas,
        crearTarea,
        putTarea,
        eliminarTarea,
        tareas
    }
}
