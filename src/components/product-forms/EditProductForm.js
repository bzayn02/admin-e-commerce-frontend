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
import {
  fetchAProduct,
  updateProductAction,
} from '../../pages/product/ProductAction';
import { useParams } from 'react-router-dom';
import { resetSingleProductSuccess } from '../../pages/product/ProductSlice';
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
export const EditProductForm = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [updateProduct, setUpdateProduct] = useState(initialState);
  const [selectedCats, setSelectedCats] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);
  const [images, setImages] = useState([]);

  const { categories } = useSelector((state) => state.category);
  const { isPending, productResponse, selectedProduct } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!selectedProduct?._id || slug !== selectedProduct.slug) {
      dispatch(fetchAProduct(slug));
      dispatch(fetchCat());
    }
    setUpdateProduct(selectedProduct);
    setSelectedCats(selectedProduct.categories);
  }, [dispatch, slug, selectedProduct._id, selectedProduct]);

  const handleOnChange = (e) => {
    const { checked, name, value } = e.target;
    if (name === 'status') {
      setUpdateProduct({ ...updateProduct, status: checked });
      return;
    }
    if (name === 'category') {
      setUpdateProduct({
        ...updateProduct,
        category: [value],
      });
      return;
    }

    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    setImages(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // combine the form data and the images as multipart
    const formData = new FormData();

    const { createdAt, updatedAt, __v, categories, slug, ...rest } =
      updateProduct;

    for (const key in rest) {
      if (key === 'images') {
        continue;
      }
      if (key === 'saleStartDate' || key === 'saleEndDate') {
        const val = rest[key] ? rest[key] : '';
        formData.append(key, val);
        continue;
      }
      // console.log(key, rest[key]);
      formData.append(key, rest[key]);
    }

    // Keep the old images
    formData.append('existingImages', rest.images);

    // add new uploaded images
    images.length && [...images].map((img) => formData.append('images', img));

    // add categories
    formData.append('categories', selectedCats);

    // add images to be deleted
    formData.append('imgToDelete', imgToDelete);

    dispatch(updateProductAction(formData, slug));

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

  const handleOnImageDelete = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      const args = imgToDelete.filter((source) => source !== value);
      setImgToDelete(args);
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
            checked={updateProduct.status}
            id="custom-switch"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            name="title"
            value={updateProduct.title}
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
            value={updateProduct.price}
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
            value={updateProduct.quantity}
            type="number"
            placeholder="Quantity"
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <FormGroup>
          <FormLabel>Select Categories *</FormLabel>
          <ProductCategoryList
            selectedCats={selectedCats}
            handleOnCatSelect={handleOnCatSelect}
          />
        </FormGroup>

        <Form.Group className="mb-3">
          <Form.Label>Sale Price</Form.Label>
          <Form.Control
            name="salePrice"
            value={updateProduct.salePrice}
            onChange={handleOnChange}
            type="number"
            placeholder="Sale Price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sale Start Date</Form.Label>
          <Form.Control
            name="saleStartDate"
            value={
              updateProduct.saleStartDate
                ? updateProduct.saleStartDate?.substring(0, 10)
                : undefined
            }
            onChange={handleOnChange}
            type="date"
            placeholder="Sale Start Date"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sale End Date</Form.Label>
          <Form.Control
            name="saleEndDate"
            value={
              updateProduct.saleEndDate
                ? updateProduct.saleEndDate?.substring(0, 10)
                : undefined
            }
            type="date"
            placeholder="Sale End Date"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            name="brand"
            value={updateProduct.brand}
            placeholder="Brand"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={updateProduct.description}
            type="text"
            placeholder="Description"
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <FormGroup className="mb-3">
          <Form.Label>Select the images you want to delete.</Form.Label>
          <div className="d-flex flex-row">
            {updateProduct?.images &&
              updateProduct.images.map((imgLink, i) => (
                <div className="img-thumbnail m-2" key={i}>
                  <Form.Check
                    defaultValue={imgLink}
                    onChange={handleOnImageDelete}
                  />
                  <img
                    className=""
                    src={imgLink}
                    alt={updateProduct?.title}
                    width="150px"
                  />
                </div>
              ))}
          </div>
        </FormGroup>

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
          Update Product
        </Button>
      </Form>
    </div>
  );
};
