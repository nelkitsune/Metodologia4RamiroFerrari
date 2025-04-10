import { useLocation } from 'react-router-dom';
import { EstudianteCard } from '../ui/EstudianteCard';

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
}

function EstudiantesScreen() {
    const location = useLocation();
    const estudiantes: Estudiante[] = location.state?.estudiantes || [];

    return (
        <div>
            <h1>Página de Estudiantes</h1>
            {estudiantes.length > 0 ? (
                <div>
                    {estudiantes.map((estudiante) => (
                        <EstudianteCard key={estudiante.id} estudiante={estudiante} />
                    ))}
                </div>
            ) : (
                <p>No hay estudiantes inscritos.</p>
            )}
        </div>
    );
}

export default EstudiantesScreen;