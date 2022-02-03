import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/custom-table/CustomTable';
import { AdminLayout } from '../layout/AdminLayout';

const AdminLists = () => {
  return (
    <AdminLayout>
      <h2>Admin Users</h2>
      <div className="button-section text-end">
        <Link to="/registration">
          <Button className="text-end" variant="info">
            Add new admin
          </Button>
        </Link>
      </div>

      <hr />

      <CustomTable />
    </AdminLayout>
  );
};

export default AdminLists;
