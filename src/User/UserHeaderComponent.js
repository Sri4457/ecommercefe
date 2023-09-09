import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function UserHeaderComponent() {
    const username= useParams().username;

  return (
    <Navbar expand="lg" className="bg-primary fw-bold">
      <Container>
        <Navbar.Brand href={`/user/${username}`}>Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/user/updateprofile/${username}`}>Update Profile</Nav.Link>
            <Nav.Link href={`/user/viewproducts/${username}`}>View Products</Nav.Link>
            <Nav.Link href={`/user/viewcart/${username}`}>View Cart</Nav.Link>
            <Nav.Link href={`/user/vieworders/${username}`}>View Orders</Nav.Link>
            <Nav.Link href='/'>LogOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
