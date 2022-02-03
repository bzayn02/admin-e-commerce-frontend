import React from 'react';
import { Link } from 'react-router-dom';
import './side-bar-menu.style.css';

export const SideBarMenu = () => {
  return (
    <div className="side-bar-menu">
      <div>
        <Link to="/dashboard" className="logo">
          <i className="fa-solid fa-user-tie text-center"></i>
        </Link>
      </div>
      <div className="menu-list">
        <ul>
          <li>
            <Link className="menu-item" to="/dashboard">
              <i className="fa-solid fa-gauge"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/categories">
              <i className="fas fa-sitemap"></i> Categories
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/products">
              <i className="fa-solid fa-gift"></i> Products
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/orders">
              <i className="fa-solid fa-box-open"></i> Orders
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/customers">
              <i className="fa-solid fa-users"></i> Customers
            </Link>
          </li>
          <li>
            <Link className="menu-item" to="/payments">
              <i className="fa-solid fa-credit-card"></i> Payment
            </Link>
          </li>
          <hr />
          <li>
            <Link className="menu-item" to="/admin-users">
              Admin Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
