import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, addToCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

const Cart = (props) => {
  const [product, setProduct] = useState(props.carts > 0);
  useEffect(() => props.getProducts(), [product]);
  function handleClick(id) {
    props.addToCart(id);
  }

  function proceedToCheckout() {
    props.history.push("/payment");
  }
  return (
    <div>
      {props.carts.addedItems.length ? (
        <ShoppingCart proceedToCheckout={proceedToCheckout} />
      ) : (
        <></>
      )}
      <div className="container">
        <div className="py-5 text-center">
          <h1>Shopping Cart</h1>
        </div>
        {props.carts.products.map((product) => (
          <div className="row" key={product.id}>
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{product.name}</span>
                  <p>{product.description}</p>
                </div>
                <div className="card-action">
                  <span
                    to="/"
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    onClick={() => handleClick(product._id)}
                  >
                    <i className="material-icons">add</i>
                  </span>
                  <b>Price: INR {product.price}</b>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToPros = (state) => ({
  carts: state.cart,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (id) => {
//       dispatch(addToCart(id));
//     },
//   };
// };
export default connect(mapStateToPros, { getProducts, addToCart })(Cart);
