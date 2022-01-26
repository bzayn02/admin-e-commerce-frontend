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
  saleStartDate: '',
  saleEndDate: '',
  brand: '',
  quantity: 0,
  description: '',
  category: [],
};
export const AddNewProductForm = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState([]);

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

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    setImages(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(images);

    // combine the form data and the images as multipart
    const formData = new FormData();

    for (const key in product) {
      // console.log(key, product[key]);
      formData.append(key, product[key]);
    }

    images.length && [...images].map((img) => formData.append('images', img));

    dispatch(addProductAction(formData));
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

        {/* image uploader */}

        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            onChange={handleOnImageSelect}
            multiple
            accept="image/*"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};
