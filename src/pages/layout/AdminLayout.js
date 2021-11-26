import React from 'react';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

export const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />

      <children />

      <Footer />
    </div>
  );
};
