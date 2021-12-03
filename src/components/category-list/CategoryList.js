import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCat, deleteCat } from '../../pages/category/CategoryAction';
import { catRespReset } from '../../pages/category/CategorySlice';

export const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, categoryResponse } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    !categories?.length && dispatch(fetchCat());

    return () => categoryResponse?.status && dispatch(catRespReset());
  }, [categories, dispatch]);
  // parent cat only\
  const parentCat = categories.filter((row) => !row.parentCat);
  // child cat only
  const childCat = categories.filter((row) => row.parentCat);

  return (
    <div>
      <ListGroup>
        {parentCat.length &&
          parentCat.map((row, i) => {
            return (
              <div key={row._id}>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-5 bg-info p-1">{row.name}</span>
                  <span className="ml-4">
                    <Button variant="primary">Edit</Button>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deleteCat(row._id))}
                    >
                      Delete
                    </Button>
                  </span>
                </ListGroup.Item>
                {childCat.map((item) =>
                  item.parentCat === row._id ? (
                    <ListGroup.Item
                      key={row._id}
                      className="d-flex justify-content-between"
                    >
                      <span>
                        {' ➥'}
                        {item.name}
                      </span>

                      <span className="ml-4">
                        <Button variant="primary">Edit</Button>
                        <Button
                          variant="danger"
                          onClick={() => dispatch(deleteCat(item._id))}
                        >
                          Delete
                        </Button>
                      </span>
                    </ListGroup.Item>
                  ) : null
                )}
              </div>
            );
          })}
      </ListGroup>
    </div>
  );
};
