import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Spinner, Table } from 'react-bootstrap';
import {
  fetchProducts,
  deleteProduct,
} from '../../pages/product/ProductAction';
import { Link } from 'react-router-dom';

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { productList, productResponse, isPending } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    !productList?.length && dispatch(fetchProducts());
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      _id && dispatch(deleteProduct(_id));
    }
  };
  return (
    <div>
      {isPending && <Spinner variant="info" animation="border"></Spinner>}
      {productResponse.message && (
        <Alert
          variant={productResponse.status === 'success' ? 'success' : 'danger'}
        >
          {productResponse.message}
        </Alert>
      )}
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>STATUS</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {!productList?.length ? (
            <tr>
              <td colSpan="7">No Product to show</td>
            </tr>
          ) : (
            productList.map((row, i) => (
              <tr key={row._id}>
                <td>{i + 1}</td>
                <td>
                  <img src={row?.images[0]} alt={row.title} width="100px" />
                </td>
                <td>
                  {row.status ? (
                    <span className="text-success">Online</span>
                  ) : (
                    <span className="text-danger">Offline</span>
                  )}
                </td>
                <td className="text-start">{row.title}</td>
                <td>${row.price}</td>
                <td>
                  <Link to={`/products/edit/${row.slug}`}>
                    <Button variant="info">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleOnDelete(row._id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};
