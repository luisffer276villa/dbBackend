// src/components/Navbar.js

import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../utils/navbar.scss'

const CustomNavbar = () => {
  return (
    <Navbar className="navbar-color" variant="light">
      <Container>
        <Navbar.Brand className="mb-0 h1"></Navbar.Brand>
        <span className='txt_navbar'>L&L Votaciones</span>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
