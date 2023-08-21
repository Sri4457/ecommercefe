import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function UserHeaderComponent() {
    const id= parseInt(useParams().id);

  return (
    <Navbar expand="lg" className="bg-primary fw-bold">
      <Container>
        <Navbar.Brand href={`/user/${id}`}>Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/user/updateprofile/${id}`}>Update Profile</Nav.Link>
            <Nav.Link href={`/user/viewproducts/${id}`}>View Products</Nav.Link>
            <Nav.Link href={`/user/viewcart/${id}`}>View Cart</Nav.Link>
            <Nav.Link href='/'>LogOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
