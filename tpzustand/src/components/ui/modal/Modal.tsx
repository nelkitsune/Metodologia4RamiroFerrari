import React, { FC, use, useEffect } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import { ITarea } from '../../../types/ITareas'
import { useTareas } from '../../../hooks/useTareas'

type IModla = {
    handleCloseModalEdit: VoidFunction
}

const intialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
};

export const Modal: FC<IModla> = ({ handleCloseModalEdit }) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva)
    const [formValues, setFormValues] = React.useState<ITarea>(intialState);
    const { crearTarea, putTarea } = useTareas()
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva);
    }, [tareaActiva]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tareaActiva) {
            putTarea(formValues);
        } else {
            crearTarea({ ...formValues, id: new Date().toDateString() });
        }
        setTareaActiva(null);
        handleCloseModalEdit();
    }
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3>
                        {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
                    </h3>
                </div>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            required
                            autoComplete='off'
                            name='titulo'
                            placeholder="Titulo"
                            value={formValues.titulo}
                            onChange={handleChange}
                        />
                        <textarea
                            name="descripcion"
                            required
                            placeholder="Descripción"
                            value={formValues.descripcion}
                            onChange={handleChange}
                        ></textarea>
                        <input
                            type="date"
                            required
                            autoComplete='off'
                            name='fechaLimite'
                            value={formValues.fechaLimite}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="button" className={styles.cancelButton} onClick={handleCloseModalEdit}>Cancelar</button>
                        <button type="submit">
                            {tareaActiva ? "Editar Tarea" : "Crear Tarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}