import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../utils/navbar'; // Asegúrate de ajustar la ruta si es necesario
import axios from 'axios'; // Para hacer las peticiones al backend

const CampaignList = () => {
  const [campaña, setCampaigns] = useState([]);
  const navigate = useNavigate();
  // Obtener campañas desde el backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/listCampanas'); // Asegúrate de ajustar esta ruta
        setCampaigns(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener las campañas:', error);
      }
    };

    fetchCampaigns();
  }, []);

  // Función para navegar a la vista de creación de campaña
  const handleCreateCampaign = () => {
    navigate('/crear'); // Ajusta esta ruta según sea necesario
  };
  const handleEditarCampana = (id) => {
    navigate(`/editar/${id}`); // Redirigir a la ruta de edición con el ID
  };
  return (
    <>
      <CustomNavbar /> {/* Navbar agregado */}
      <Container className="my-4">
        <Row className="justify-content-between align-items-center mb-4">
          <Col>
            <h2>Campañas Disponibles</h2>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" onClick={handleCreateCampaign}>
              Crear Campaña
            </Button>
          </Col>
        </Row>

        <Row>
          {campaña.length > 0 ? (
            
            campaña.map((campaign) => (
              <Col xs={12} md={6} lg={4} key={campaign.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{campaign.titulo}</Card.Title>
                    <Card.Text>{campaign.texto}</Card.Text>
                    <Card.Text><b>Estado:</b> {campaign.nestado}</Card.Text>
                    <Button variant="secondary" onClick={() => handleEditarCampana(campaign.id_campaña)}>Editar</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No hay campañas disponibles</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CampaignList;
