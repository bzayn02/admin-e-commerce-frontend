import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalBox } from '../modal-box/ModalBox';
import {
  onCategorySelect,
  catRespReset,
} from '../../pages/category/CategorySlice';
import { Alert, Col, Form, Row, Button, Spinner } from 'react-bootstrap';
import { updateCat } from '../../pages/category/CategoryAction';

const initialState = {
  name: '',
  parentCat: '',
};

export const EditCatForm = () => {
  const dispatch = useDispatch();
  const [cat, setCat] = useState(initialState);
  const { show, selectedCategory, isLoading, categoryResponse, categories } =
    useSelector((state) => state.category);

  useEffect(() => {
    setCat({
      name: selectedCategory?.name,
      parentCat: null,
      _id: selectedCategory._id,
    });
  }, [selectedCategory?.name]);

  const onHide = () => {
    dispatch(onCategorySelect());
    dispatch(catRespReset());
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCat({
      ...cat,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!cat.name) {
      return alert('Please enter the category name');
    }
    console.log(cat);
    dispatch(updateCat(cat));
  };

  const parentCat = categories.filter((row) => !row.parentCat);

  return (
    <div>
      <ModalBox show={show} onHide={onHide} title="Edit Category">
        <div>
          {isLoading && <Spinner variant="primary" animation="border" />}
          {categoryResponse?.message && (
            <Alert
              variant={
                categoryResponse?.status === 'success' ? 'success' : 'danger'
              }
            >
              {categoryResponse?.message}
            </Alert>
          )}
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col>
                <Form.Control
                  name="name"
                  value={cat.name}
                  onChange={handleOnChange}
                  placeholder="Category name"
                />
              </Col>
              <Col>
                <Form.Select
                  name="parentCat"
                  onChange={handleOnChange}
                  aria-label="Default select example"
                >
                  <option value="">Select parent category</option>
                  {parentCat?.length &&
                    parentCat.map((row) => (
                      <option key={row._id} value={row._id}>
                        {row.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              <Col>
                <Button type="submit">Update</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </ModalBox>
    </div>
  );
};
