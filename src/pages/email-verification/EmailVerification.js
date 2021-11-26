import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Spinner } from 'react-bootstrap';
import { userEmailVerification } from '../register/userAction';

export const EmailVerification = () => {
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search);
  const pin = params.get('pin');
  const email = params.get('email');
  const { isPending, userRegisterResponse } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    //send pin and email to api server
    dispatch(userEmailVerification({ pin, email }));
  }, [dispatch, email, pin]);

  return (
    <div className="m-auto py-5" style={{ width: '500px' }}>
      {isPending && <Spinner variant="primary" animation="border" />}
      {userRegisterResponse?.message && (
        <Alert
          variant={
            userRegisterResponse?.status === 'success' ? 'success' : 'danger'
          }
        >
          {userRegisterResponse?.message}
        </Alert>
      )}
      {userRegisterResponse?.message && <a href="/">Login Now</a>}
    </div>
  );
};
