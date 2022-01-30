import React from 'react';

import { EditProductForm } from '../../components/product-forms/EditProductForm';
import { AdminLayout } from '../layout/AdminLayout';

const EditProduct = () => {
  return (
    <AdminLayout>
      <div>
        <h2>Edit Product</h2>
        <hr />
        <EditProductForm />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
