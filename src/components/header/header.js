import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../pages/admin-auth-slice/userAction';

export const Header = () => {
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    dispatch(userLogout());
  };
  return (
    <div>
      <Navbar collapseOnSelect bg="info" expand="md">
        <Container>
          <LinkContainer to="/dashboard">
            <Navbar.Brand href="#home"></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/admin-profile">
                <Nav.Link>
                  <i className="fa-solid fa-user-tie"></i>
                </Nav.Link>
              </LinkContainer>

              <Nav.Link onClick={handleOnLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
