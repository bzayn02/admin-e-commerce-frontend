import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { fetchCat } from '../../pages/category/CategoryAction';
import { addProductAction } from '../../pages/product/ProductAction';

const initialState = {
  status: '',
  title: '',
  price: 0,
  salePrice: 0,
  saleStartDate: null,
  saleEndDate: null,
  brand: '',
  quantity: 0,
  description: '',
  category: [],
};
export const AddNewProductForm = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const { categories } = useSelector((state) => state.category);
  const { isPending, productResponse } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);
  const handleOnChange = (e) => {
    const { checked, name, value } = e.target;
    if (name === 'status') {
      setProduct({ ...product, status: checked });
      return;
    }
    if (name === 'category') {
      setProduct({ ...product, category: [...product.category, value] });
      return;
    }

    setProduct({ ...product, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductAction(product));
  };

  return (
    <div>
      {isPending && <Spinner variant="primary" animation="border" />}
      {productResponse?.message && (
        <Alert
          variant={productResponse?.status === 'success' ? 'success' : 'danger'}
        >
          {productResponse?.message}
        </Alert>
      )}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="status"
            id="custom-switch"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            name="title"
            placeholder="Product Name"
            onChange={handleOnChange}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price *</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity *</Form.Label>
          <Form.Control
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category *</Form.Label>
          {/* <Form.Select
            aria-label="Default select example"
            name="category"
            onChange={handleOnChange}
            multiple
          >
            <option value="">Select Category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select> */}
          <Form.Select
            name="category"
            onChange={handleOnChange}
            aria-label="Default select example"
            multiple
          >
            <option value="">Select category</option>
            {categories?.length &&
              categories.map((row) => (
                <option key={row._id} value={row._id}>
                  {row.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sale Price</Form.Label>
          <Form.Control
            name="salePrice"
            onChange={handleOnChange}
            type="number"
            placeholder="Sale Price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sale Start Date</Form.Label>
          <Form.Control
            name="saleStartDate"
            onChange={handleOnChange}
            type="date"
            placeholder="Sale Start Date"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sale End Date</Form.Label>
          <Form.Control
            name="saleEndDate"
            type="date"
            placeholder="Sale End Date"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            name="brand"
            placeholder="Brand"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            type="text"
            placeholder="Description"
            onChange={handleOnChange}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};
