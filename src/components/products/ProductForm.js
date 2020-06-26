/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import ProductList from "./ProductList";

const ProductForm = ({
  product,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Edit " : "Add "}Product</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={product.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="category"
        label="Category"
        value={product.category}
        onChange={onChange}
        error={errors.category}
      />
      <TextInput
        name="description"
        label="Description"
        value={product.description}
        onChange={onChange}
        error={errors.description}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving" : "Save"}
      </button>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  saving: PropTypes.bool,
};

export default ProductForm;
