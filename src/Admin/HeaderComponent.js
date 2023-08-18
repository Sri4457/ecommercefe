import React, { Component } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default class HeaderComponent extends Component {
  render() {
    return (
      <Navbar expand="lg" className="bg-primary fw-bold">
      <Container>
        <Navbar.Brand href="/admin">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin">Home</Nav.Link>
            <NavDropdown title="User Operations" id="basic-nav-dropdown">
            <NavDropdown.Item href="/user/add">Add user</NavDropdown.Item>
              <NavDropdown.Item href="/admin/users/viewall">View All Users</NavDropdown.Item>
              <NavDropdown.Item href="/admin/user/viewnewusers">View Blocked/New Users</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Product Operations" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin/product/add">Add Product</NavDropdown.Item>
              <NavDropdown.Item href="/admin/product/viewall">View All Products</NavDropdown.Item>
              <NavDropdown.Item href="/admin/product/deletebyqty">Delet Products By Qty</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/admin/countordersby">Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
}
