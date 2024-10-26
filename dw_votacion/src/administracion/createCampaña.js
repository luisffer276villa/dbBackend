import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../utils/navbar';
const CreateCampaign = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('activo'); // Estado por defecto: activo
    const navigate = useNavigate();
    const handleRegresar = () => {
        navigate('/administrador')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const campaignData = {
            titulo,
            descripcion,
            estado,
        };
        console.log(campaignData)
        try {
            // Petición al backend para crear la campaña
            await axios.post('http://localhost:3005/api/campanas', campaignData);
            alert('Campaña creada con éxito');
            navigate('/administrador'); // Redirige a la lista de campañas o alguna otra página
        } catch (error) {
            console.error('Error al crear camddddpaña:', error);
            alert('Hubo un error al crear la campaña');
        }
    };

    return (
        <>
            <CustomNavbar />
            <Container>
                <Button variant="secondary" type="submit" className="mt-4" onClick={handleRegresar}>
                    Regresar
                </Button>
                <Row className="w-100">
                    <Col xs={12} md={6} lg={4}>
                        <h2 className="mt-4">Crear Campaña</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formTitulo" >
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el título de la campaña"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDescripcion" >
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingrese la descripción de la campaña"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEstado" >
                                <Form.Label>Estado de la campaña</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    required
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                    <option value="finalizado">Finalizado</option>
                                </Form.Control>
                            </Form.Group>

                            <Button variant="secondary" type="submit" className="mt-3">
                                Crear Campaña
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateCampaign;
