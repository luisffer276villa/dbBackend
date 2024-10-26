// src/components/Navbar.js

import React from 'react';
import { Navbar, Button,Container } from 'react-bootstrap';
import '../utils/navbar.scss'
import { useNavigate } from 'react-router-dom';
const CustomNavbar = () => {
  const navigate = useNavigate();
  const handleInicio = () =>{
    navigate('/')
  }

  return (
    <Navbar className="navbar-color" variant="light">
      <Container>
        <Navbar.Brand className="mb-0 h1"></Navbar.Brand>
        <span className='txt_navbar'>L&L Votaciones</span>
        <Button variant="secondary" type="submit" onClick={handleInicio}>
          Inicio
        </Button>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
