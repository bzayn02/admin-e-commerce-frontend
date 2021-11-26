import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const login = () => {
  return (
    <div className="register-page mb-5">
      <Card className="p-3 reg-form">
        <h2>Admin Login</h2>
        <hr />
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="youremail@email.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="secret"
              required
            />
          </Form.Group>
          <Button variant="primary">Login</Button>
        </Form>

        <a href="/registration">Register now</a>
      </Card>
    </div>
  );
};

export default login;
