import React, { useState, useEffect } from 'react';
import { Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileUser } from '../../pages/admin-auth-slice/userAction';

const initialProfileState = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  gender: '',
};

export const AdminProfileForm = () => {
  const dispatch = useDispatch();

  const [adminProfile, setAdminProfile] = useState(initialProfileState);
  const { userInfo, isPending } = useSelector((state) => state.user);

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
        console.log('To do call api to update the store. ');
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
      {/* {userRegisterResponse?.message && (
          <Alert
            variant={
              userRegisterResponse?.status === 'success' ? 'success' : 'danger'
            }
          >
            {userRegisterResponse?.message}
          </Alert> */}
      {/* )} */}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            name="fname"
            value={adminProfile.fname}
            // onChange={handleOnChange}
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
            // onChange={handleOnChange}
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
export const AdminPasswordResetForm = () => {
  const dispatch = useDispatch();
  const { userInfo, isPending } = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
  };
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            name="password"
            onChange={handleOnChange}
            type="password"
            placeholder="secret"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            type="password"
            required
            name="confirmPassword"
            onChange={handleOnChange}
          />
          {/* {passwordError && <Alert variant="danger">{passwordError}</Alert>} */}
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="warning" type="submit" size="lg">
            Update Password
          </Button>
        </div>
      </Form>
    </div>
  );
};
