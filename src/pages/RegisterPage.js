import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Register from '../components/auth/Register';

const RegisterPage = () => (
  <Container>
    <Row>
      <Col md={12} className="d-flex justify-content-center align-item-center mt-5">
        <Register />
      </Col>
    </Row>

  </Container>
);

export default RegisterPage;
