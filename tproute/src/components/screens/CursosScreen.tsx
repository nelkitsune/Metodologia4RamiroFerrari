import { CursoCard } from "../ui/CursoCard";
import { getData } from '../../../http/api';
import axios from 'axios';
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

function CursosScreen() {
    const [error, setError] = useState<string | null>(null);
    const [cursos1, setCursos1] = useState<any>(null);
    const [cursos2, setCursos2] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await getData<any>('/cursos/1');
                const data2 = await getData<any>('/cursos/2');
                console.log(data1);
                console.log(data2);
                setCursos1(data1);
                setCursos2(data2);
            } catch (err) {
                setError('Error fetching data');
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Página de Cursos</h1>
            {cursos1 && <CursoCard curso={cursos1} />}
            {cursos2 && <CursoCard curso={cursos2} />}
        </div>
    );
}

export default CursosScreen;