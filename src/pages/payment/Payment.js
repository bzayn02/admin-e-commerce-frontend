import React from 'react';
import { Button } from 'react-bootstrap';
import { PaymentOptionsList } from '../../components/payment-list/PaymentOptionsList';
import { AdminLayout } from '../layout/AdminLayout';

const Payment = () => {
  return (
    <div>
      <AdminLayout>
        <h2>Payment Page</h2>
        <hr />

        <div className="text-end">
          <Button variant="info">Add New Payment Option</Button>
          <hr />

          <PaymentOptionsList />
        </div>
      </AdminLayout>
    </div>
  );
};

export default Payment;
