import React, { Fragment, useEffect } from 'react'
import styles from "./ListTareas.module.css"
import { tareaStore } from '../../../store/tareaStore'
import { getAllTareas } from '../../../http/tareas'
import { CardList } from '../CardList/CardList'
import { Modal } from '../modal/Modal'
import { ITarea } from '../../../types/ITareas'
import { useTareas } from '../../../hooks/useTareas'

export const ListTareas = () => {


    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    const { getTareas, tareas } = useTareas();
    useEffect(() => {
        getTareas()
    }, [])


    const [openModalTarea, setOpenModalTarea] = React.useState(false);
    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true);
    }
    const handleCloseModalEdit = () => {
        setOpenModalTarea(false);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Lista de tareas</h2>
                    <button className={styles.button} onClick={() => {
                        setOpenModalTarea(true)
                    }}>
                        Agregar tareas
                    </button>
                </div>
                <ul className={styles.taskList}>
                    {
                        tareas.length > 0 ? (
                            tareas.map((el) => (<CardList key={el.id}
                                handleOpenModalEdit={handleOpenModalEdit} tarea={el} />))
                        ) : (
                            <div className={styles.noTasks}>
                                <h3>No hay tareas</h3>
                            </div>
                        )
                    }
                </ul>
            </div>
            {openModalTarea && <Modal handleCloseModalEdit={handleCloseModalEdit} />}

        </>

    )
}