import React from 'react';
import { CustomTable } from '../../components/custom-table/CustomTable';
import { AdminLayout } from '../layout/AdminLayout';

const orders = [
  {
    _id: 'asddfafafafa',
    fname: 'Bijay',
    lname: 'Nagarkoti',
    quantity: 23,
    amount: 500,
    paymentStatus: 'paid',
  },
  {
    _id: 'asddfafafafa',
    fname: 'Joy',
    lname: 'KC',
    quantity: 3,
    amount: 5000,
    paymentStatus: 'pending',
  },
  {
    _id: 'adfadafddf',
    fname: 'Joyaaa',
    lname: 'Khatri',
    quantity: 3,
    amount: 5000,
    paymentStatus: 'pending',
  },
];

const data = orders.map((row) => {
  const { _id, fname, amount, paymentStatus } = row;
  return { _id, fname, amount, paymentStatus };
});
const Order = () => {
  return (
    <div>
      <AdminLayout>
        <h2>Order Page</h2>

        <hr />
        <CustomTable data={data} />
      </AdminLayout>
    </div>
  );
};

export default Order;
