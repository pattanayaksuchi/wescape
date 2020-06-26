/* eslint-disable no-debugger */
import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProductList from "./ProductList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

class ProductPage extends React.Component {
  state = {
    redirectToAddProductPage: false,
  };
  componentDidMount() {
    const { products, actions } = this.props;
    if (products.length === 0) {
      actions.loadProducts().catch((error) => {
        alert("Loading Products Failed " + error);
      });
    }
  }
  render() {
    return (
      <>
        {this.state.redirectToAddProductPage && <Redirect to="/product" />}
        <h2>Products</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddProductPage: true })}
            >
              Add Product
            </button>
            <ProductList products={this.props.products} />
          </>
        )}
      </>
    );
  }
}

ProductPage.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    products: state.products,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
