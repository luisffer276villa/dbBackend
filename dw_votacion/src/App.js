import './styles/App.scss';
import Inicio from '../src/login/inicio.js'; // Importa tu nuevo componente
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './login/createUser';
import Login from './login/login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/votante" element={<CreateUser />} /> {/* Cambia esta ruta si es necesario */}
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
