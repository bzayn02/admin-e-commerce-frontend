import React from 'react';
import { Card } from 'react-bootstrap';
import './CustomCard.style.css';

export const CustomCard = ({ children, icon }) => {
  return (
    <Card className="custom-card text-center mt-4">
      <div className="card-top ">
        {' '}
        <i className={icon}></i>
      </div>
      <hr />

      <div className="card-data">{children}</div>
    </Card>
  );
};
