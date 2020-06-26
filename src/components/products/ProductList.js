import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Description</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => {
        return (
          <tr key={product.id}>
            <td>
              <a className="btn btn-light" href={"/products/" + product.slug}>
                Open the Product Page
              </a>
            </td>
            <td>
              <Link to={"/product/" + product.slug}>{product.name}</Link>
            </td>
            <td>{product.description}</td>
            <td>{product.category}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
