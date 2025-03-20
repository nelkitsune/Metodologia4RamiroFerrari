import axios from 'axios';
import { ITarea } from '../types/ITareas';
const API_URL = 'http://localhost:3000/tareas';


export const getAllTareas = async () => {
    try {
        const response = await axios.get<ITarea[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error en getAllTareas:', error);
        return [];
    }
};
export const postNuevaTarea = async (nuevaTarea: ITarea) => {
    try {
        const response = await axios.post<ITarea[]>(API_URL, {
            ...nuevaTarea,
        });
        return response.data;
    } catch (error) {
        console.error('Error en getAllTareas:', error);
        return [];
    }
};

export const editarTarea = async (tareaActualizada: ITarea) => {
    try {
        const response = await axios.put<ITarea>(`${API_URL}/${tareaActualizada.id!}`, {
            ...tareaActualizada,
        });
        return response.data;
    } catch (error) {
        console.error('Error en getAllTareas:', error);
        return [];
    }
};
export const eliminarTareaPorID = async (IdTarea: string) => {
    try {
        const response = await axios.delete<ITarea>(`${API_URL}/${IdTarea!}`);
        return response.data;
    } catch (error) {
        console.error('Error en getAllTareas:', error);
        return [];
    }
};
