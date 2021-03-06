import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormLabel,
  Spinner,
} from 'react-bootstrap';
import { fetchCat } from '../../pages/category/CategoryAction';
import { addProductAction } from '../../pages/product/ProductAction';
import { ProductCategoryList } from '../product-category-list/ProductCategoryList';

const initialState = {
  status: false,
  title: '',
  price: 0,
  salePrice: 0,
  saleStartDate: '',
  saleEndDate: '',
  brand: '',
  quantity: 0,
  description: '',
};
export const AddNewProductForm = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [selectedCats, setSelectedCats] = useState([]);

  const [images, setImages] = useState([]);

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

    // combine the form data and the images as multipart
    const formData = new FormData();

    for (const key in product) {
      // console.log(key, product[key]);
      formData.append(key, product[key]);
    }

    // add category list as well

    formData.append('categories', selectedCats);

    images.length && [...images].map((img) => formData.append('images', img));

    dispatch(addProductAction(formData));

    window.scrollTo(0, 0);
  };

  const handleOnCatSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      // add on the list in state
      setSelectedCats([...selectedCats, value]);
    } else {
      // remove from the state
      const args = selectedCats.filter((catId) => catId !== value);
      setSelectedCats(args);
    }
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

        <FormGroup>
          <FormLabel>Select Categories *</FormLabel>
          <ProductCategoryList handleOnCatSelect={handleOnCatSelect} />
        </FormGroup>

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
