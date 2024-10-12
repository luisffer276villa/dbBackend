import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../utils/navbar';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [numeroColegiado, setNumeroColegiado] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [dpi, setDpi] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      numeroColegiado: parseInt(numeroColegiado, 10),
      dpi,
      clave,
      fechaNacimiento
    };
    
    console.log('Datos enviados:', userData);  // Para verificar lo que envías
  
    try {
      const response = await axios.post('http://localhost:3005/auth/login', userData);
      console.log('Respuesta del servidor:', response.data);  // Verifica la respuesta del servidor
  
      // Guardar el token JWT en localStorage
      localStorage.setItem('token', response.data.token);
  
      // Redirigir al usuario a una página protegida
      alert('Login exitoso');
      navigate('/proteccion');  // O la ruta que tengas para las páginas protegidas
    } catch (error) {
      alert('Error en el inicio de sesión');
      console.error('Error al intentar iniciar sesión:', error.response ? error.response.data : error.message);  // Más detalle del error
    }
  };
  

  return (
    <>
      <CustomNavbar />
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="m-auto">
            <h2 className="text-center">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNumeroColegiado">
                <Form.Label>Número de colegiado</Form.Label>
                <Form.Control type="number" placeholder="Ingrese su número de colegiado" value={numeroColegiado}
                      onChange={(e) => setNumeroColegiado(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formDPI">
                <Form.Label>DPI</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su DPI" value={dpi} onChange={(e) => setDpi(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formFechaNacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formClave">
                <Form.Label>Clave</Form.Label>
                <Form.Control type="password" placeholder="Ingrese su clave" value={clave} onChange={(e) => setClave(e.target.value)} />
              </Form.Group>
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
