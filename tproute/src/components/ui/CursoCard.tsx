import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


interface Curso {
    id: number;
    nombre: string;
    estudiantes: [];
}
interface CursoCardProps {
    curso: Curso;
}


export const CursoCard = ({ curso }: CursoCardProps) => {
    const navigate = useNavigate();
    const handleInscribirse = () => {
        navigate('/estudiantes', { state: { estudiantes: curso.estudiantes } });
    };
    return (
        <div>
            <h2>{curso.nombre}</h2>
            <button onClick={handleInscribirse}>Inscribirse</button>
        </div>
    );
};
