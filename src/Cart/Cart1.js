import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, addToCart } from "../actions/cartActions";
import ShoppingCart from "./ShoppingCart";

class Cart1 extends Component {
  componentWillMount() {
    this.props.getProducts();
  }
  handleClick(id) {
    this.props.addToCart(id);
  }
  render() {
    let itemList = this.props.items.map((item) => {
      return (
        <div className="col s4">
          <div className="card" key={item._id}>
            <div className="card-image">
              <img
                class="responsive-img"
                src={`../images/${item.img}.jpg`}
                alt={item.name}
              />
              <span
                to="/"
                className="btn-floating halfway-fab waves-effect waves-light red"
                onClick={() => this.handleClick(item._id)}
              >
                <i className="material-icons">add</i>
              </span>
            </div>

            <div className="card-content">
              <span className="card-title">{item.name}</span>

              <p>{item.description}</p>
              <p>
                <b>Price: {item.price}$</b>
              </p>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="col s8">
              <h3 className="center">Our items</h3>
              <div className="row">{itemList}</div>
            </div>
            {this.props.addedItems.length > 0 ? (
              <div className="col s4">
                <h3 className="center">
                  My Cart
                  <span className="new badge" data-badge-caption="items">
                    {this.props.addedItems.length || 0}
                  </span>
                </h3>
                <ShoppingCart buy={() => this.props.history.push("/payment")} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.products,
    addedItems: state.cart.addedItems,
  };
};

export default connect(mapStateToProps, { getProducts, addToCart })(Cart1);
