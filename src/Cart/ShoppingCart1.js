import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addQuantity,
  removeQuantity,
  removeItem,
} from "../actions/cartActions";

class ShoppingCart1 extends Component {
  handleAddClick = (id) => {
    this.props.addQuantity(id);
  };

  handleSubtractClick = (id) => {
    this.props.removeQuantity(id);
  };

  handleRemoveClick = (id) => {
    this.props.removeItem(id);
  };

  handlePayClick() {
    if (this.props.match.path) {
      this.props.history.push("/payment");
    } else {
      this.props.proceedToCheckout();
    }
  }
  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <>
            <li className="collection-item avatar" key={item._id}>
              <div className="item-desc">
                <span className="title">{item.name}</span>
                <p>{item.description}</p>
                <p>
                  <b>Price: INR {item.price}</b>
                </p>
                <p>
                  <b>Quantity: {item.quantity}</b>
                </p>
                <div className="add-remove">
                  <Link to="/mycart">
                    <i
                      className="material-icons"
                      onClick={() => this.handleAddClick(item._id)}
                    >
                      arrow_drop_up
                    </i>
                  </Link>
                  <Link to="/mycart">
                    <i
                      className="material-icons"
                      onClick={() => this.handleSubtractClick(item._id)}
                    >
                      arrow_drop_down
                    </i>
                  </Link>
                </div>
                <button
                  className="waves-effect waves-light btn pink remove"
                  onClick={() => this.handleRemoveClick(item._id)}
                >
                  Remove
                </button>
              </div>
              <div className="container right-align">
                <div className="card-action">
                  Net Price<b> INR {item.price * item.quantity}</b>
                </div>
              </div>
            </li>
          </>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <>
        <div className="container">
          <h4>New Cart</h4>
          <h5>You have ordered: </h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <div className=" right-align">
          Grand Total = <b>INR {this.props.total}</b>
          <div className="right-align">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.props.history.push("/payment")}
            >
              <i className="material-icons left">attach_money</i>Buy
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.addedItems,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps, {
  addQuantity,
  removeQuantity,
  removeItem,
})(ShoppingCart1);
