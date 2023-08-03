import { Fragment } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const CategoryForm = ({ handleChange, data }) => {
  return (
    <Fragment>
      <Form.Group className="mb-3">
        <Form.Label>Category image</Form.Label>
        <Form.Control
          name="image"
          onChange={handleChange}
          value={data.image}
          required
          type="text"
          placeholder="Category image"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please fill !
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category name</Form.Label>
        <Form.Control
          name="name"
          onChange={handleChange}
          value={data.name}
          required
          type="text"
          placeholder="Category name"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please fill !
        </Form.Control.Feedback>
      </Form.Group>
    </Fragment>
  );
};

CategoryForm.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
};

export default CategoryForm;
