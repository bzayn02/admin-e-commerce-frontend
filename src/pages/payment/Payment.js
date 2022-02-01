import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AddPaymentOptions } from '../../components/new-payment-option/AddPaymentOptions';
import { PaymentOptionsList } from '../../components/payment-list/PaymentOptionsList';

import { resetResponseMessage } from './paymentSlice';
import { AdminLayout } from '../layout/AdminLayout';

const Payment = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetResponseMessage());
    };
  }, [dispatch]);
  const onHide = () => {
    setShow(false);
    dispatch(resetResponseMessage());
  };

  return (
    <div>
      <AdminLayout>
        <h2>Payment Page</h2>
        <hr />

        <div className="text-end">
          <Button variant="info" onClick={() => setShow(true)}>
            Add New Payment Option
          </Button>
          {show && <AddPaymentOptions show={show} onHide={onHide} />}

          <hr />

          <PaymentOptionsList />
        </div>
      </AdminLayout>
    </div>
  );
};

export default Payment;
