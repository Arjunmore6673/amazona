import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';

const SignInScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/';
  const [state, setState] = useState({ email: '', password: '' });

  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    if (Object.keys(ctxState.user).length > 0) navigate(redirect);
  }, [redirect, ctxState.user, navigate]);

  const { email, password } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      navigate(redirect || '');
    } catch (error) {
      console.log(error, 'error');
      alert(error.message);
    }
  };

  const onChangeInput = (type, value) => {
    setState({
      ...state,
      [type]: value,
    });
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => onChangeInput('email', e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => onChangeInput('password', e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInScreen;
