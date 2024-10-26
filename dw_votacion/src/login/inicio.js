import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomNavbar from '../utils/navbar';
import '../login/inicio.scss'; // Archivo SCSS para los estilos

const Inicio = () => {
  // Definición de rutas
  const navigate = useNavigate();

  const handleVotanteClick = () => {
    navigate('/crearUsuario?tipo=1'); // Redirige a crear usuario con tipo 1 (Votante)
  };

  const handleAdminClick = () => {
    navigate('/crearUsuario?tipo=2'); // Redirige a crear usuario con tipo 2 (Administrador)
  };

  return (
    <>
      {/* Importación del componente navbar */}
      <CustomNavbar />
      {/* Botones centrados */}
      <Container className="d-flex vh-100">
        <Row className="m-auto w-100 fondo">
          <Col xs={6} className="d-flex justify-content-center flex-column align-items-center">
            <span className='tittle_inicio'>"Votante"</span><br />
            <span className='txt'>Puedes votar por tu campaña ingresando aquí.</span><br />
            <Button variant="secondary" onClick={handleVotanteClick}>Ingresar</Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-center flex-column align-items-center">
            <span className='tittle_inicio'>"Administrador"</span><br />
            <span className='txt'>Puedes crear y gestionar campañas ingresando aquí.</span><br />
            <Button variant="secondary" onClick={handleAdminClick}>Ingresar</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inicio;
