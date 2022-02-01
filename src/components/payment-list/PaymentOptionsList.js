import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentOptions } from '../../pages/payment/paymentAction';

export const PaymentOptionsList = () => {
  const dispatch = useDispatch();

  const { isPending, paymentResponse, paymentOptions } = useSelector(
    (state) => state.payment
  );

  useEffect(() => {
    dispatch(getPaymentOptions());
  }, [dispatch]);
  return (
    <div>
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
                  {row.status ? (
                    <span className="text-success">Active</span>
                  ) : (
                    <span className="text-danger">Inactive</span>
                  )}
                </td>
                <td>{row.name}</td>
                <td>{row.info}</td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
