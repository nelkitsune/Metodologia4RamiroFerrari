import { ITarea } from "../../../types/ITareas"
import React, { FC } from 'react'
import styles from "./CardList.module.css"
import { useTareas } from "../../../hooks/useTareas"

type ICardList = {
    tarea: ITarea
    handleOpenModalEdit: (tarea: ITarea) => void

}

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
    const { eliminarTarea } = useTareas()
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
    }
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Titulo: {tarea.titulo}</h3>
                <p className={styles.cardDescription}>Descripcion: {tarea.descripcion}</p>
                <p><b>Fecha limite: {tarea.fechaLimite}</b></p>
            </div>
            <div className={styles.cardFooter}>
                <button className={styles.cardButton} onClick={editarTarea}>Editar</button>
                <button className={styles.cardButton} onClick={eliminarTareaById}>Eliminar</button>
            </div>
        </div>
    )
}