import React from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { BreadcrumbComp } from '../../components/breadcrumb/BreadcrumbComp';
import { CategoryForm } from '../../components/category-form/CategoryForm';
import { CategoryList } from '../../components/category-list/CategoryList';

const Category = () => {
  return (
    <div>
      <AdminLayout>
        <BreadcrumbComp page="Category"></BreadcrumbComp>
        <hr />
        <div className="content">
          <div className="category-form m-3">
            <span className="fs-3">Add new category</span>
            <CategoryForm />
          </div>
          <hr />
          <div className="cat-list m-3">
            <span className="fs-3">Category List</span>
            <CategoryList />
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};
export default Category;
