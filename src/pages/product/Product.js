import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductTable } from '../../components/product-table/ProductTable';
import { AdminLayout } from '../layout/AdminLayout';

const Product = () => {
  return (
    <div>
      <AdminLayout>
        <h2>Product Page</h2>
        <div className="top-btn text-end">
          <Link to="/products/new">
            <Button variant="primary">
              <i className="fa-light fa-plus"></i> Add new product
            </Button>
          </Link>
        </div>
        <hr />

        <div className="product-list">
          <ProductTable />
        </div>
      </AdminLayout>
    </div>
  );
};

export default Product;
