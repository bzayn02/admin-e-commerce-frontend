import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import {
  updateProfileUser,
  updatePasswordUser,
} from '../../pages/admin-auth-slice/userAction';

const initialProfileState = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  gender: '',
};

// Update user profile
export const AdminProfileForm = () => {
  const dispatch = useDispatch();

  const [adminProfile, setAdminProfile] = useState(initialProfileState);
  const { userInfo, isPending, userUpdateResp } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    setAdminProfile(userInfo);
  }, [userInfo]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, phone, address } = adminProfile;

    if (
      userInfo.email !== email ||
      userInfo.phone !== phone ||
      userInfo.address !== address
    ) {
      if (window.confirm('Are you sure you want to update the info?')) {
        const update = { email, phone, address };
        dispatch(updateProfileUser(update));
      }
      return;
    }
    alert('No form data has been changed.');
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setAdminProfile({
      ...adminProfile,
      [name]: value,
    });
  };
  return (
    <div className="admin-profile-page">
      <h2 className="text-center">Update Profile</h2>
      <hr />
      {isPending && <Spinner variant="primary" animation="border" />}
      {userUpdateResp?.message && (
        <Alert
          variant={userUpdateResp?.status === 'success' ? 'success' : 'danger'}
        >
          {userUpdateResp?.message}
        </Alert>
      )}

      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            name="fname"
            value={adminProfile.fname}
            placeholder="Sam"
            required
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            name="lname"
            value={adminProfile.lname}
            placeholder="Smith"
            required
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Email *
            {adminProfile.isEmailConfirmed ? (
              <i
                title="Verified Email"
                className="fas fa-check-circle text-success"
              ></i>
            ) : (
              <i
                title="Email is not verified."
                className="fas fa-times-circle text-danger"
              ></i>
            )}
          </Form.Label>
          <Form.Control
            name="email"
            value={adminProfile.email}
            onChange={handleOnChange}
            type="email"
            placeholder="youremail@email.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DOB</Form.Label>
          <Form.Control
            name="dob"
            value={adminProfile?.dob?.substring(0, 10)}
            // onChange={handleOnChange}
            type="date"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            value={adminProfile.phone}
            onChange={handleOnChange}
            placeholder="041xxxxxxx"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={adminProfile.address}
            onChange={handleOnChange}
            placeholder="123 St. George Street, NSW, 1234"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <InputGroup>
            <InputGroup.Radio
              name="gender"
              checked={adminProfile.gender === 'Male'}
              onChange={handleOnChange}
              aria-label="Male"
              defaultValue="male"
              disabled
            />
            Male
            <InputGroup.Radio
              name="gender"
              checked={adminProfile.gender === 'Female'}
              onChange={handleOnChange}
              aria-label="Female"
              defaultValue="female"
              className="ml-3"
              disabled
            />
            Female
          </InputGroup>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" size="lg">
            Update Profile
          </Button>
        </div>
      </Form>
    </div>
  );
};

const initialPassword = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
};

const passErrorInitial = {
  isMatched: false,
  isLengthy: false,
  hasLowerCase: false,
  hasUpperCase: false,
  hasNumber: false,
  hasSpecialChar: false,
};

// Update user password
export const AdminPasswordResetForm = () => {
  const dispatch = useDispatch();

  const [updatePass, setUpdatePass] = useState(initialPassword);
  const [passError, setPassError] = useState(passErrorInitial);
  const { isPending, passwordUpdateResp } = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { currentPassword, password } = updatePass;
    dispatch(updatePasswordUser({ currentPassword, password }));
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

  console.log(passError);

  return (
    <div>
      {isPending && <Spinner variant="primary" animation="border" />}
      {passwordUpdateResp?.message && (
        <Alert
          variant={
            passwordUpdateResp?.status === 'success' ? 'success' : 'danger'
          }
        >
          {passwordUpdateResp?.message}
        </Alert>
      )}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Current Password *</Form.Label>
          <Form.Control
            name="currentPassword"
            onChange={handleOnChange}
            type="password"
            minLength="8"
            placeholder="Enter your current password."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            name="password"
            onChange={handleOnChange}
            type="password"
            minLength="8"
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
            placeholder="Confirm your new password."
            onChange={handleOnChange}
          />
          {/* {passwordError && <Alert variant="danger">{passwordError}</Alert>} */}
        </Form.Group>

        <ListGroup>
          <ListGroup.Item variant={passError.isMatched ? 'success' : 'danger'}>
            Password matches
          </ListGroup.Item>
          <ListGroup.Item variant={passError.isLengthy ? 'success' : 'danger'}>
            Must be at least 8 characters
          </ListGroup.Item>
          <ListGroup.Item variant={passError.hasNumber ? 'success' : 'danger'}>
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
            Must include at least one of the following characters i.e. ! @ # $ %
            ^ * ( & / ) _ +{' '}
          </ListGroup.Item>
        </ListGroup>
        <div className="d-grid gap-2">
          <Button
            variant="warning"
            type="submit"
            size="lg"
            disabled={Object.values(passError).includes(false)}
          >
            Update Password
          </Button>
        </div>
      </Form>
    </div>
  );
};
