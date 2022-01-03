import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { adminLogin, autoLogin } from '../admin-auth-slice/userAction';

const initialState = {
  email: 'a@gmail.com',
  password: '12345678',
};
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn, isPending, isAutoLoginPending, userLoginResp } =
    useSelector((state) => state.user);

  const [loginInfo, setLoginInfo] = useState(initialState);

  const from = location?.state?.from?.pathname || '/dashboard';
  useEffect(() => {
    !isLoggedIn && dispatch(autoLogin());

    isLoggedIn && history.replace(from);
  }, [isLoggedIn, history, dispatch, from]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(adminLogin(loginInfo));
  };
  // if (isAutoLoginPending) {
  //   return <Spinner variant="primary" animation="border" />;
  // }

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
      </Card>
    </div>
  );
};

export default Login;
