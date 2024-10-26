import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../utils/navbar';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [numeroColegiado, setNumeroColegiado] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [dpi, setDpi] = useState('');
  const [clave, setClave] = useState('');

  // Función para redirigir a la página de crear cuenta
  const handleButtonClick = () => {
    navigate('/crearUsuario');
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      numeroColegiado: parseInt(numeroColegiado, 10),
      dpi,
      clave,
      fechaNacimiento,
    };

    try {
      const response = await axios.post('http://localhost:3005/auth/login', userData);
      console.log(response.data);

      // Guardar el token JWT y el ID tipo en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tipoUsuario', response.data.id_tipo_usuario); // Guardar el tipo
      console.log("tipo Usuario " + response.data.id_tipo_usuario + " y su token " + response.data.token);
      handleLogin(response.data.id_tipo_usuario); // Pasa el tipo al manejar el inicio de sesión

      // Redirigir a la página adecuada según el tipo de usuario
      if (response.data.id_tipo_usuario === 1) {
        navigate('/listaCampanasVotante'); // Redirige al votante
      } else if (response.data.id_tipo_usuario === 2) {
        navigate('/administrador'); // Redirige al administrador
      }
    } catch (error) {
      alert('Error en el inicio de sesión');
      console.error('Error al intentar iniciar sesión:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="m-auto">
            <h2 className="text-center">Iniciar Sesión</h2><br />
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-center me-2"><b>¿No tienes cuenta?</b></span>
              <Button className="button-margin" variant="secondary" onClick={handleButtonClick}>Crear Cuenta</Button>
            </div><br />
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNumeroColegiado">
                <Form.Label>Número de colegiado</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Ingrese su número de colegiado" 
                  value={numeroColegiado}
                  onChange={(e) => setNumeroColegiado(e.target.value)} 
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDPI">
                <Form.Label>DPI</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ingrese su DPI" 
                  value={dpi} 
                  onChange={(e) => setDpi(e.target.value)} 
                  required
                />
              </Form.Group>
              <Form.Group controlId="formFechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control 
                  type="date" 
                  value={fechaNacimiento} 
                  onChange={(e) => setFechaNacimiento(e.target.value)} 
                  required
                />
              </Form.Group>
              <Form.Group controlId="formClave">
                <Form.Label>Clave</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Ingrese su clave" 
                  value={clave} 
                  onChange={(e) => setClave(e.target.value)} 
                  required
                />
              </Form.Group><br />
              <Button variant="primary" type="submit" className="w-100">
                Ingresar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
