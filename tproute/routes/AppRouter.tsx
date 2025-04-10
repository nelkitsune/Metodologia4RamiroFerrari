import { Routes, Route } from "react-router-dom";
import CursosScreen from "../src/components/screens/CursosScreen";
import EstudiantesScreen from "../src/components/screens/EstudiantesScreen";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<CursosScreen />} />
            <Route path="/estudiantes" element={<EstudiantesScreen />} />
        </Routes>
    );
}

export default AppRouter;