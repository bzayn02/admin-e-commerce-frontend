import React from 'react';
import { Table } from 'react-bootstrap';

export const CustomTable = ({ data = [] }) => {
  const header = data.length ? Object.keys(data[0]) : [];
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {header?.map((title, i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.length ? (
            data.map((row, j) => (
              <tr key={j}>
                <td>{j + 1}</td>
                {header?.map((prop, i) => (
                  <td key={row._id}>{row[prop]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header?.length}>No data to show</td>{' '}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
