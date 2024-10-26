import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el id de la URL
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import CustomNavbar from '../utils/navbar';
import { useNavigate } from 'react-router-dom';

const EditCampaña = () => {
    // Estado para candidatos
    const [candidatos, setCandidatos] = useState([]);
    const [selectedCandidato, setSelectedCandidato] = useState('');
    const [candidatosSeleccionados, setCandidatosSeleccionados] = useState([]); // Para almacenar los seleccionados

    // Estado para los estados
    const [estados, setEstados] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');

    const { id } = useParams(); // Obtener el ID de la campaña de la URL
    const navigate = useNavigate();

    // Estado para la campaña
    const [campaña, setCampaña] = useState({
        titulo: '',
        descripcion: '',
        estado: '',
    });

    // Volver a la página anterior
    const handleRegresar = () => {
        navigate('/administrador');
    };

    // Obtener los datos de la campaña, candidatos y estados
    useEffect(() => {
        const fetchCampaña = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/campana/${id}`);
                setCampaña(response.data); // Llenar el formulario con los datos de la campaña
            } catch (error) {
                console.error('Error al obtener la campaña:', error);
                alert('Error al cargar la campaña');
            }
        };

        const fetchCandidatos = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/candidatos`);
                setCandidatos(response.data); // Guarda los candidatos en el estado
            } catch (error) {
                console.error('Error al obtener candidatos:', error);
            }
        };

        const fetchEstados = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/estados`);
                setEstados(response.data); // Guarda los estados en el estado
            } catch (error) {
                console.error('Error al obtener los estados:', error);
            }
        };

        fetchCampaña();
        fetchCandidatos();
        fetchEstados();
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaña((prevCampaña) => ({
            ...prevCampaña,
            [name]: value,
        }));
    };

    const handleCandidatoChange = (e) => {
        const idCandidatoSeleccionado = e.target.value;
        if (idCandidatoSeleccionado !== '') {
            const candidato = candidatos.find(c => c.id_candidato === parseInt(idCandidatoSeleccionado));
            // Agregar el candidato a la tabla si no está ya en la lista
            if (!candidatosSeleccionados.some(c => c.id_candidato === candidato.id_candidato)) {
                setCandidatosSeleccionados([...candidatosSeleccionados, candidato]);
            }
        }
    };

    const handleEstadoChange = (e) => {
        setSelectedEstado(e.target.value); // Actualiza el estado con el estado seleccionado 
    };

    // Manejar el envío del formulario de actualización de campaña
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3005/api/campana/${id}`, campaña); // Hacer el update de la campaña
            alert('Campaña actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar la campaña:', error);
            alert('Error al actualizar la campaña');
        }
    };

    // Manejar la asignación de candidatos a la campaña
    const handleAsignarCandidato = async (e) => {
        e.preventDefault();
        try {
            // Hacer un update para cada candidato seleccionado
            for (let candidato of candidatosSeleccionados) {
                await axios.put(`http://localhost:3005/api/campana/${id}/candidato/${candidato.id_candidato}`);
            }
            alert('Candidatos asignados correctamente a la campaña');
        } catch (error) {
            console.error('Error al asignar candidatos:', error);
            alert('Error al asignar candidatos');
        }
    };

    return (
        <>
            <CustomNavbar /> {/* Navbar */} 
            <Container>
                <Button variant="secondary" className="mt-4" onClick={handleRegresar}>
                    Regresar
                </Button>
                <Row className="w-100">
                    <h2 className="mt-4">Editar Campaña</h2>
                    <Col xs={12} md={6} lg={4} className="margin-card">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="titulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titulo"
                                    value={campaña.titulo}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="descripcion"
                                    value={campaña.descripcion}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEstado">
                                <Form.Label>Seleccionar Estado</Form.Label>
                                <Form.Select value={selectedEstado} onChange={handleEstadoChange}>
                                    <option value="">Seleccione un estado</option>
                                    {estados.map((estado) => (
                                        <option key={estado.id_estado} value={estado.id_estado}>
                                            {estado.descripcion} {/* Ajusta según la propiedad que desees mostrar */}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="secondary" type="submit" className="mt-3">
                                Actualizar Campaña
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={6} lg={4} className="margin-card">
                        <Form onSubmit={handleAsignarCandidato}>
                            <Form.Group controlId="formCandidato">
                                <Form.Label>Seleccionar Candidato</Form.Label>
                                <Form.Select onChange={handleCandidatoChange}>
                                    <option value="">Seleccione un candidato</option>
                                    {candidatos.map((candidato) => (
                                        <option key={candidato.id_candidato} value={candidato.id_candidato}>
                                            {candidato.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {/* Mostrar los candidatos seleccionados en una tabla */}
                            <Table striped bordered hover className="mt-3">
                                <thead>
                                    <tr>
                                        <th>ID Candidato</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidatosSeleccionados.map((candidato, index) => (
                                        <tr key={index}>
                                            <td>{candidato.id_candidato}</td>
                                            <td>{candidato.nombre}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button variant="secondary" type="submit" className="mt-3">
                                Asignar Candidato
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditCampaña;
