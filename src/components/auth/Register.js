import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr('');
    setError('');
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPassErr('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    if (email.trim() === '') {
      setEmailErr('Please enter your email address');
      error = true;
    }
    if (password.trim() === '') {
      setPassErr('Please enter your password');
      error = true;
    }
    if (password.trim().length < 6) {
      setPassErr('Password must be up to six character length');
      error = true;
    }
    if (!error) {
      try {
        await signup(auth, email, password);
        navigate('/');
      } catch (error) {
        setError('Sorry Something went wrong try again');
      }
    }
  };
  return (
    <Card style={{ width: '30rem' }}>
      <h2 className="text-center font-weight-bold mt-4">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-4"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleChangeEmail}
              />
              <span className="text-danger">{emailErr}</span>
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                value={password}
                onChange={handleChangePassword}
                placeholder="Password"
              />
              <span className="text-danger">{passErr}</span>
            </FloatingLabel>
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mt-4 p-2 mt-5 mb-3"
            variant="dark"
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="w-100 text-center ">
        <p className="mt-2">
          Already registered?
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </Card.Footer>
    </Card>
  );
};
export default Register;
