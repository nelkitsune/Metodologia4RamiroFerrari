import React from 'react';

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
}

interface EstudianteCardProps {
    estudiante: Estudiante;
}

export const EstudianteCard = ({ estudiante }: EstudianteCardProps) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{estudiante.nombre}</h3>
            <p>Edad: {estudiante.edad} años</p>
        </div>
    );
};