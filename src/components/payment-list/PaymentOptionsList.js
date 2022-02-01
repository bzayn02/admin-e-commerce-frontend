import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletePaymentOptionsAction,
  getPaymentOptions,
  updatePaymentOptionAction,
} from '../../pages/payment/paymentAction';

export const PaymentOptionsList = () => {
  const dispatch = useDispatch();

  const { isPending, paymentResponse, paymentOptions } = useSelector(
    (state) => state.payment
  );

  const handleOnDelete = (_id) => {
    if (!_id) {
      return alert('ID missing!');
    }
    dispatch(deletePaymentOptionsAction(_id));
  };

  useEffect(() => {
    dispatch(getPaymentOptions());
  }, [dispatch]);

  const handleOnChange = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    if (window.confirm('Are you sure you want to change the status?')) {
      dispatch(updatePaymentOptionAction({ status: checked, _id: value }));
    }
  };
  return (
    <div className="text-center">
      {isPending && <Spinner variant="primary" animation="border" />}
      {paymentResponse?.message && (
        <Alert
          variant={paymentResponse?.status === 'success' ? 'success' : 'danger'}
        >
          {paymentResponse?.message}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentOptions?.length &&
            paymentOptions.map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <Form.Check
                    name="status"
                    checked={row.status}
                    type="switch"
                    onChange={handleOnChange}
                    defaultValue={row._id}
                  />
                </td>
                <td>{row.name}</td>
                <td>{row.info}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleOnDelete(row?._id);
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
