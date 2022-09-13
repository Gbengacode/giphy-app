import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const { login } = useAuth();
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
    if (!error) {
      // const formData = { email, password };

      try {
        await login(auth, email, password);
        navigate('/');
      } catch {
        setError('Fail to login in');
      }
    }
  };
  return (
    <Card style={{ width: '30rem' }}>
      <h2 className="text-center font-weight-bold mt-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-4"
            >
              <Form.Control type="email" placeholder="name@example.com" value={email} onChange={handleChangeEmail} />
              <span className="text-danger">{emailErr}</span>
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" value={password} onChange={handleChangePassword} placeholder="Password" />
              <span className="text-danger">{passErr}</span>
            </FloatingLabel>

          </Form.Group>
          <Button type="submit" className="w-100 mt-4 mt-5 mb-3 p-2 btn-dark" variant="dark" onClick={handleSubmit}>Login</Button>

        </Form>
      </Card.Body>
      <Card.Footer className="w-100 text-center ">
        <p className="mt-2">Not registered?  <Link to="/register">Register</Link></p>
      </Card.Footer>
    </Card>
  );
};
export default Login;
