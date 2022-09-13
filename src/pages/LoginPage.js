import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Login from '../components/auth/Login';

const LoginPage = () => (
  <Container>
    <Row>
      <Col
        md={12}
        className="d-flex justify-content-center align-item-center mt-5"
      >
        <Login />
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
