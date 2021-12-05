import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { adminLogin } from '../admin-auth-slice/userAction';

const initialState = {
  email: 'a@gmail.com',
  password: '12345678',
};
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, isPending, userLoginResp } = useSelector(
    (state) => state.user
  );

  const [loginInfo, setLoginInfo] = useState(initialState);

  useEffect(() => {
    isLoggedIn && history.push('/dashboard');
  }, [isLoggedIn, history]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email && !password) {
      return alert('Please provide the login details to login.');
    }

    dispatch(adminLogin(loginInfo));
  };

  return (
    <div className="register-page mb-5">
      <Card className="p-3 reg-form">
        <h2>Admin Login</h2>
        {isPending && <Spinner variant="primary" animation="border" />}
        {userLoginResp.message && (
          <Alert
            variant={userLoginResp.status === 'success' ? 'success' : 'danger'}
          >
            {userLoginResp.message}
          </Alert>
        )}
        <hr />
        <Form className="mt-3" onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="youremail@email.com"
              required
              onChange={handleOnChange}
              value={loginInfo.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="secret"
              required
              onChange={handleOnChange}
              value={loginInfo.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <a href="/registration">Register now</a>
      </Card>
    </div>
  );
};

export default Login;
