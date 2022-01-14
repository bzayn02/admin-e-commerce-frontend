import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Alert, Button, Card, Form, ListGroup, Spinner } from 'react-bootstrap';
import { resetPasswordAction } from '../../pages/admin-auth-slice/userAction';

const initialPassword = {
  otp: '',
  password: '1aA!1111',
  confirmPassword: '1aA!1111',
};

const passErrorInitial = {
  isMatched: false,
  isLengthy: false,
  hasLowerCase: false,
  hasUpperCase: false,
  hasNumber: false,
  hasSpecialChar: false,
};

export const ForgotPasswordResetForm = () => {
  const dispatch = useDispatch();

  const [updatePass, setUpdatePass] = useState(initialPassword);
  const [passError, setPassError] = useState(passErrorInitial);
  const { isPending, resetPasswordResponse, passwordResettingEmail } =
    useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { otp, password } = updatePass;

    const passObj = {
      otp,
      email: passwordResettingEmail,
      password,
    };
    dispatch(resetPasswordAction(passObj));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    let isMatched = false;
    if (name === 'password') {
      setPassError({
        ...passError,
        isMatched: updatePass.confirmPassword === value,
      });
    }
    if (name === 'confirmPassword') {
      isMatched = updatePass.password === value;
      const isLengthy = value.length >= 8;
      const hasLowerCase = /[a-z]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!, @, #, $, %,^, *, (, &, /, ), _, +]/.test(
        value
      );

      setPassError({
        ...passError,
        isMatched,
        isLengthy,
        hasNumber,
        hasLowerCase,
        hasUpperCase,
        hasSpecialChar,
      });
    }

    setUpdatePass({
      ...updatePass,
      [name]: value,
    });
  };

  return (
    <Card className="p-2 m-5">
      <h3 className="p-3 text-center">Reset Password</h3>
      <hr />
      <div>
        {isPending && <Spinner variant="primary" animation="border" />}
        {resetPasswordResponse?.message && (
          <Alert
            variant={
              resetPasswordResponse?.status === 'success' ? 'success' : 'danger'
            }
          >
            {resetPasswordResponse?.message}
          </Alert>
        )}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>OTP *</Form.Label>
            <Form.Control
              name="otp"
              onChange={handleOnChange}
              minLength="6"
              value={updatePass.otp}
              placeholder="Enter the OTP."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password *</Form.Label>
            <Form.Control
              name="password"
              onChange={handleOnChange}
              type="password"
              minLength="8"
              value={updatePass.password}
              maxLength="25"
              placeholder="Enter the new password."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type="password"
              required
              name="confirmPassword"
              minLength="8"
              maxLength="25"
              value={updatePass.confirmPassword}
              placeholder="Confirm your new password."
              onChange={handleOnChange}
            />
            {/* {passwordError && <Alert variant="danger">{passwordError}</Alert>} */}
          </Form.Group>

          <ListGroup>
            <ListGroup.Item
              variant={passError.isMatched ? 'success' : 'danger'}
            >
              Password matches
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.isLengthy ? 'success' : 'danger'}
            >
              Must be at least 8 characters
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasNumber ? 'success' : 'danger'}
            >
              Must include number
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasUpperCase ? 'success' : 'danger'}
            >
              Must include upper case
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasLowerCase ? 'success' : 'danger'}
            >
              Must include lower case
            </ListGroup.Item>
            <ListGroup.Item
              variant={passError.hasSpecialChar ? 'success' : 'danger'}
            >
              Must include at least one of the following characters i.e. ! @ # $
              % ^ * ( & / ) _ +{' '}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-grid gap-2">
            <Button
              variant="warning"
              type="submit"
              size="lg"
              disabled={Object.values(passError).includes(false)}
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
      <div className="ml-auto mt-3 text-end">
        <a href="/">Login?</a>
      </div>
    </Card>
  );
};
