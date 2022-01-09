import React, { useEffect } from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../admin-auth-slice/userAction';
import {
  AdminProfileForm,
  AdminPasswordResetForm,
} from '../../components/admin-profile/AdminProfileForm';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo._id) {
      dispatch(fetchUser());
    }
  }, [dispatch, userInfo._id]);
  return (
    <div>
      <AdminLayout>
        <h2>Welcome {userInfo.fname}!</h2>
        <hr />

        <AdminProfileForm />
        <hr />
        <h3 className="text-center mt-5">Update Password</h3>
        <AdminPasswordResetForm />
      </AdminLayout>
    </div>
  );
};

export default AdminProfile;
