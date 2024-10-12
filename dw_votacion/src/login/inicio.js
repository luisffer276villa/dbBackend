import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomNavbar from '../utils/navbar';
import '../login/inicio.scss'; // Archivo SCSS para los estilos
const Inicio = () => {
  //definicion de rutas
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/votante');
  }

  return (
    <>
      {/* Importación del componente navbar */}
      <CustomNavbar />
      {/* Botones centrados */}
      <Container className="d-flex vh-100">
        <Row className="m-auto w-100 fondo">
          <Col xs={6} className="d-flex justify-content-center flex-column align-items-center">
            <span className='tittle_inicio'>"Votante"</span><br />
            <span className='txt'>Puedes votar por tu campaña ingresando aqui.</span><br />
            <Button variant="secondary" onClick={handleButtonClick}>Ingresar</Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-center flex-column align-items-center">
            <span className='tittle_inicio'>"Administrador"</span><br />
            <span className='txt'>Puedes crear gestionar campañas ingresando aqui.</span><br />
            <Button variant="secondary">Ingresar</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inicio;
