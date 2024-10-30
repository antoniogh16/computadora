import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Marcas from './Views/Marcas/Index'; // Página de marcas
import CreateMarcas from './Views/Marcas/Create'; // Crear marcas
import EditMarcas from './Views/Marcas/Edit'; // Editar marcas
import Equipos from './Views/Equipos/Index'; // Página de equipos
import Login from './Views/Login';
import Register from './Views/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Marcas />} /> {/* Página de marcas */}
          <Route path="/create-marca" element={<CreateMarcas />} /> {/* Crear marcas */}
          <Route path="/edit-marca/:id" element={<EditMarcas />} /> {/* Editar marcas */}
          <Route path="/equipos" element={<Equipos />} /> {/* Página de equipos */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
