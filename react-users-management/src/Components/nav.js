import {Navbar, Container, Nav, } from 'react-bootstrap';

function MyNav() {
  return (
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#">Users Management App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="/users">Users</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default MyNav;
