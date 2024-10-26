import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomNavbar from '../utils/navbar';
import { createUser } from '../server/services/userServices.js'; // Importamos el servicio

const CreateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tipoUsuario = queryParams.get('tipo'); // Obtener el tipo de usuario desde los parámetros de consulta

  const [numeroColegiado, setNumeroColegiado] = useState('');
  const [dpi, setDpi] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleButtonClick = () => {
    navigate('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      numeroColegiado: parseInt(numeroColegiado, 10),
      dpi,
      nombre,
      correo,
      clave,
      fechaNacimiento,
      tipoUsuario // Utilizar el tipo que viene de la URL
    };

    try {
      await createUser(userData);  // Llama al servicio para registrar al usuario
      alert('Usuario registrado con éxito');
      navigate('/login'); // Redirigir a la página de login después de registrar
    } catch (error) {
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className="d-flex vh-100 justify-content-center align-items-center margin-top-user">
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="m-auto">
            <h2 className="text-center">Crear una cuenta nueva</h2><br />
            <div className="d-flex justify-content-center align-items-center">
              <span className="text-center me-2"><b>¿Ya estás registrado?</b></span>
              <Button className="button-margin" variant="secondary" onClick={handleButtonClick}>Iniciar Sesión</Button>
            </div><br />
            <Form onSubmit={handleSubmit}>
              <Row className="m-auto w-100">
                <Col xs={6} className="d-flex justify-content-center flex-column align-items-center">
                  <Form.Group controlId="formNumeroColegiado" className="mb-4">
                    <Form.Label>Número de colegiado</Form.Label>
                    <Form.Control type="number" placeholder="Ingrese su número de colegiado" value={numeroColegiado}
                      onChange={(e) => setNumeroColegiado(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formDPI" className="mb-4">
                    <Form.Label>DPI</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su DPI" value={dpi} onChange={(e) => setDpi(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formNombre" className="mb-4">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={6} className="d-flex justify-content-center flex-column align-items-center">
                  <Form.Group controlId="formCorreo" className="mb-4">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                  </Form.Group>

                  <Form.Group controlId="formClave" className="mb-4">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su clave" value={clave} onChange={(e) => setClave(e.target.value)}/>
                  </Form.Group>

                  <Form.Group controlId="formFechaNacimiento" className="mb-4">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100">
                Registrar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
