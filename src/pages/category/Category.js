import React from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { BreadcrumbComp } from '../../components/breadcrumb/BreadcrumbComp';
import { CategoryForm } from '../../components/category-form/CategoryForm';

const Category = () => {
  return (
    <div>
      <AdminLayout>
        <BreadcrumbComp page="Category"></BreadcrumbComp>

        <div className="content">
          <div className="category-form">
            <CategoryForm />
          </div>
          <div className="cat-list"></div>
        </div>
      </AdminLayout>
    </div>
  );
};
export default Category;
