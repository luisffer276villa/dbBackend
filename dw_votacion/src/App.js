import './styles/App.scss';
import Inicio from '../src/login/inicio.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateUser from './login/createUser';
import Login from './login/login';
import CampaignList from './administracion/listCampaña';
import CampaignListV from './operatividad/listVotanteCampana.js';
import CreateCampaign from './administracion/createCampaña';
import EditCampaña from './administracion/editCampaña';
import DetalleCampana from './operatividad/votarCampana';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para la autenticación
  const [tipoUsuario, setTipoUsuario] = useState(null); // Estado para el tipo de usuario

  const handleLogin = (tipo) => {
    setIsAuthenticated(true);
    setTipoUsuario(tipo);
    localStorage.setItem('tipoUsuario', tipo); // Guarda el tipo de usuario en localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/crearUsuario" element={<CreateUser />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        {/* Rutas para Votante (tipo 1) */}
        <Route 
          path="/listaCampanasVotante" 
          element={isAuthenticated && tipoUsuario === 1 ? <CampaignListV /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/detalle/:id" 
          element={isAuthenticated && tipoUsuario === 1 ? <DetalleCampana /> : <Navigate to="/login" />} 
        />

        {/* Rutas para Administrador (tipo 2) */}
        <Route 
          path="/administrador" 
          element={isAuthenticated && tipoUsuario === 2 ? <CampaignList /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/crear" 
          element={isAuthenticated && tipoUsuario === 2 ? <CreateCampaign /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/editar/:id" 
          element={isAuthenticated && tipoUsuario === 2 ? <EditCampaña /> : <Navigate to="/login" />} 
        />

        {/* Redirige si no coincide con ninguna ruta */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
