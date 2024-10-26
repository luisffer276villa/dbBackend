import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el id de la URL
import axios from 'axios';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'; // Importa el gráfico de barras de Chart.js
import CustomNavbar from '../utils/navbar';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CampañaDetalle = () => {
    const { id } = useParams(); // Obtener el ID de la campaña desde la URL
    const [campaña, setCampaña] = useState(null); // Estado para la campaña
    const [candidatos, setCandidatos] = useState([]); // Estado para los candidatos
    const [votos, setVotos] = useState([]); // Estado para los votos por candidato
    const [hasVoted, setHasVoted] = useState(false); // Estado para verificar si el usuario ha votado

    // Obtener detalles de la campaña, candidatos y votos al cargar el componente
    useEffect(() => {
        const fetchCampaña = async () => {
            try {
                // Llamada para obtener los detalles de la campaña
                const campañaResponse = await axios.get(`http://localhost:3005/api/campanas/${id}`);
                setCampaña(campañaResponse.data);

                // Llamada para obtener los candidatos asociados a la campaña
                const candidatosResponse = await axios.get(`http://localhost:3005/api/campanas/${id}/votantes`);
                setCandidatos(candidatosResponse.data);

                // Llamada para obtener los votos de los candidatos
                const votosResponse = await axios.get(`http://localhost:3005/api/campanas/${id}/votos`);
                setVotos(votosResponse.data); // Suponiendo que devuelve el id_candidato y la cantidad de votos
            } catch (error) {
                console.error('Error al obtener los detalles:', error);
                alert('Error al cargar los detalles de la campaña');
            }
        };

        fetchCampaña();
    }, [id]);

    // Función para manejar el voto
    const handleCandidatoAction = async (candidatoId) => {
        try {
            const response = await axios.post('http://localhost:3005/api/votar', {
                id_campaña: id, // El id de la campaña actual (viene de useParams)
                id_candidato: candidatoId // El id del candidato que se está votando
            });

            alert('Voto registrado con éxito');
            console.log('Respuesta del servidor:', response.data);

            // Actualiza los votos obteniendo de nuevo los datos del servidor
            const updatedVotosResponse = await axios.get(`http://localhost:3005/api/campanas/${id}/votos`);
            setVotos(updatedVotosResponse.data);

            // Deshabilitar los botones al haber votado
            setHasVoted(true);

        } catch (error) {
            console.error('Error al votar:', error);
            alert('Hubo un error al registrar el voto');
        }
    };

    const data = {
        labels: votos.map(voto => voto.nombre), // Nombres de los candidatos
        datasets: [
            {
                label: 'Votos',
                data: votos.map(voto => voto.votos), // Número de votos por candidato
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Votos por Candidato',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Asegura que el conteo sea de 1 en 1
            },
          },
        },
      };

    return (
        <>
            <CustomNavbar /> {/* Navbar */}
            <Container>
            <Button variant="secondary" className="mt-4" onClick={() => window.history.back()}>
                    Regresar
                </Button>
                <Row className="my-4">

                    <Col xs={12} md={6}>
                        <h2>Detalles de la Campaña</h2>
                        {campaña ? (
                            <div>
                                <p><strong>Título:</strong> {campaña.titulo}</p>
                                <p><strong>Descripción:</strong> {campaña.descripcion}</p>
                            </div>
                        ) : (
                            <p>Cargando detalles de la campaña...</p>
                        )}
                        <h2>Candidatos</h2>
                        {candidatos.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidatos.map((candidato, index) => (
                                        <tr key={index}>
                                            <td>{candidato.nombre}</td>
                                            <td>{candidato.correo_electronico}</td>
                                            <td>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleCandidatoAction(candidato.numero_colegiado)}
                                                    disabled={hasVoted} // Deshabilita el botón si ya se ha votado
                                                >
                                                    Votar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No hay candidatos disponibles para esta campaña.</p>
                        )}
                    </Col>

                    {/* Aquí es donde agregamos la gráfica */}
                    <Col xs={12} md={6}>
                        <h3>Estadísticas de Votos</h3>
                        <Bar data={data} options={options} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CampañaDetalle;
