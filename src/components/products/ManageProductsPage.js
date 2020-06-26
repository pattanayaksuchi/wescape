/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProducts, saveProducts } from "../../redux/actions/productActions";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { newProduct } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageProductsPage({
  products,
  loadProducts,
  saveProducts,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (products.length === 0) {
      loadProducts().catch((error) => {
        alert("Loading Products Failed " + error);
      });
    } else {
      setProduct({ ...props.product });
    }
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name, category, description } = product;
    const errors = {};
    if (!name) errors.name = "Name is required.";
    if (!category) errors.category = "Category is required.";
    if (!description) errors.description = "Description is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveProducts(product)
      .then(() => {
        toast.success("Product Saved.");
        history.push("/products");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return products.length === 0 ? (
    <Spinner />
  ) : (
    <ProductForm
      product={product}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageProductsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
  loadProducts: PropTypes.func.isRequired,
  saveProducts: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getProductBySlug(products, slug) {
  return products.find((product) => product.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  let product =
    slug && state.products.length > 0
      ? getProductBySlug(state.products, slug)
      : newProduct;
  return {
    product,
    products: state.products,
  };
}

const mapDispatchToProps = {
  loadProducts,
  saveProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductsPage);
