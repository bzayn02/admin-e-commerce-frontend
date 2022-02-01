import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ModalBox } from '../modal-box/ModalBox';
import {
  addNewPaymentOption,
  getPaymentOptions,
} from '../../pages/payment/paymentAction';

const initialPaymentOption = {
  status: false,
  name: '',
  info: '',
};

export const AddPaymentOptions = ({ show, onHide }) => {
  const dispatch = useDispatch();

  const { isPending, paymentResponse } = useSelector((state) => state.payment);

  const [paymentOption, setPaymentOption] = useState(initialPaymentOption);

  const handleOnChange = (e) => {
    const { checked, name, value } = e.target;
    console.log(checked, name, value);

    if (name === 'status') {
      return setPaymentOption({
        ...paymentOption,
        status: checked,
      });
    }
    setPaymentOption({
      ...paymentOption,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPaymentOption(paymentOption));
    dispatch(getPaymentOptions());
    console.log('submit data to api', paymentOption);
  };

  //title, children, show, onHide
  return (
    <div>
      <ModalBox show={show} onHide={onHide} title="Add new payment option">
        <div>
          {isPending && <Spinner variant="primary" animation="border" />}
          {paymentResponse?.message && (
            <Alert
              variant={
                paymentResponse?.status === 'success' ? 'success' : 'danger'
              }
            >
              {paymentResponse?.message}
            </Alert>
          )}
          <Form onSubmit={handleOnSubmit}>
            <Row>
              <Col sm="1" className="d-flex align-items-center">
                <Form.Check
                  name="status"
                  type="switch"
                  onChange={handleOnChange}
                  defaultValue={paymentOption.status}
                />
              </Col>
              <Col sm="3">
                <Form.Control
                  name="name"
                  value={paymentOption.name}
                  onChange={handleOnChange}
                  placeholder="Payment option name"
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  name="info"
                  value={paymentOption.info}
                  onChange={handleOnChange}
                  placeholder="Description"
                  required
                />
              </Col>
            </Row>
            <div className="d-grid gap-2 m-3">
              <Button type="submit" variant="primary" size="lg">
                Add{' '}
              </Button>
            </div>
          </Form>
        </div>
      </ModalBox>
    </div>
  );
};
