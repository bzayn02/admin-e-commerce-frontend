import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { requestPassResetOTP } from '../../pages/admin-auth-slice/userAction';
import { switchLoginResetPassForm } from '../../pages/admin-auth-slice/userSlice';

const PasswordResetForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isPending, resetPasswordResponse } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState('');

  useEffect(() => {}, []);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return alert('Email required');
    }

    dispatch(requestPassResetOTP(email));
  };

  return (
    <Card className="p-3 reg-form">
      <h2>Reset Password</h2>
      {isPending && <Spinner variant="primary" animation="border" />}
      {resetPasswordResponse.message && (
        <Alert
          variant={
            resetPasswordResponse.status === 'success' ? 'success' : 'danger'
          }
        >
          {resetPasswordResponse.message}
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
            value={email}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="secret"
            required
            onChange={handleOnChange}
            value={loginInfo.password}
          />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Request OTP
        </Button>
      </Form>
      <div className="ml-auto mt-3 text-end">
        <a href="/">Login?</a>
      </div>
    </Card>
  );
};

export default PasswordResetForm;
