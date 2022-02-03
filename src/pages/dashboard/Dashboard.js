import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CustomCard } from '../../components/custom-card/CustomCard';
import { AdminLayout } from '../layout/AdminLayout';
import { fetchProducts } from '../product/ProductAction';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    !productList.length && dispatch(fetchProducts());
  }, [dispatch, productList]);

  const inActiveProducts = productList.filter((row) => !row.status);
  return (
    <div>
      <AdminLayout>
        <h2>Dashboard Page</h2>
        <div className="dashboard-page d-flex justify-content-between flex-wrap m-4">
          <CustomCard icon="fas fa-box-open">
            {' '}
            Total Products = {productList?.length}{' '}
            <i className="fas fa-arrow-up text-success"></i>
          </CustomCard>
          <CustomCard icon="fas fa-box-open">
            {' '}
            Inactive Products = {inActiveProducts.length}
            <i className="fas fa-arrow-down text-danger"></i>
          </CustomCard>
          <CustomCard> </CustomCard>
          <CustomCard> </CustomCard>
          <CustomCard> </CustomCard>
          <CustomCard> </CustomCard>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Dashboard;
