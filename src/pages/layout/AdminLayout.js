import React from 'react';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { SideBarMenu } from '../../components/side-bar-menu/SideBarMenu';
import './admin-Layout.css';
export const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="left">
        <SideBarMenu />
      </div>
      <div className="right">
        <Header />
        <div className="main">{children}</div>
        <Footer />
      </div>
    </div>
  );
};
