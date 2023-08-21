import React from 'react'
import { Navbar, Container } from 'react-bootstrap';

export default function WelcomeHeader() {
  return (
    
    <Navbar expand="lg" className="bg-primary fw-bold">
      <Container>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
