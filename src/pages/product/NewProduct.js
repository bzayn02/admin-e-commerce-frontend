import React from 'react';
import { useParams } from 'react-router-dom';
import { AddNewProductForm } from '../../components/product-forms/AddNewProductForm';
import { AdminLayout } from '../layout/AdminLayout';

const NewProduct = () => {
  return (
    <AdminLayout>
      <div>
        <h2>Add New Product</h2>
        <hr />
        <AddNewProductForm />
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
