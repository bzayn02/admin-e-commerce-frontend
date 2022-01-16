import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { fetchProducts } from '../../pages/product/ProductAction';

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    !productList?.length && dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>#</th>
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
              <td colSpan="6">No Product to show</td>
            </tr>
          ) : (
            productList.map((row, i) => (
              <tr key={row._id}>
                <td>{i + 1}</td>
                <td>ACTIVE</td>
                <td className="text-start">{row.title}</td>
                <td>${row.price}</td>
                <td>
                  <Button variant="info">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                </td>
                <td>
                  <Button variant="danger">
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
