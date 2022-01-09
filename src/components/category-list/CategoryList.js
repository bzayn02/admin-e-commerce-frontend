import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCat, deleteCat } from '../../pages/category/CategoryAction';
import { onCategorySelect } from '../../pages/category/CategorySlice';
import { EditCatForm } from '../category-form/EditCatForm';

export const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCat());
  }, [dispatch]);

  const handleOnEdit = (cat) => {
    dispatch(onCategorySelect(cat));
  };

  // parent cat only\
  const parentCat = categories.filter((row) => !row.parentCat);
  // child cat only
  const childCat = categories.filter((row) => row.parentCat);

  const handleOnDelete = (_id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    const hasChildCategory = childCat.filter((item) => item.parentCat === _id);
    if (hasChildCategory.length) {
      return alert(
        'This parent category has child category, please re-allocate child category to another parent category before deleting this category. '
      );
    }
    dispatch(deleteCat(_id));
  };

  return (
    <div>
      <EditCatForm />
      <ListGroup>
        {parentCat.length &&
          parentCat.map((row, i) => {
            return (
              <div key={row._id}>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-5 bg-info p-1">{row.name}</span>
                  <span className="ml-4">
                    <Button onClick={() => handleOnEdit(row)} variant="primary">
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(row._id)}
                    >
                      Delete
                    </Button>
                  </span>
                </ListGroup.Item>
                {childCat.map((item) =>
                  item.parentCat === row._id ? (
                    <ListGroup.Item
                      key={item._id}
                      className="d-flex justify-content-between"
                    >
                      <span>
                        {' ➥'}
                        {item.name}
                      </span>

                      <span className="ml-4">
                        <Button
                          onClick={() => handleOnEdit(item)}
                          variant="primary"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleOnDelete(item._id)}
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
