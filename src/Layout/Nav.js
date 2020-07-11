import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => {
  return (
    <nav className="nav">
      <ul className="left hide-on-med-and-down">
        <li>
          <Link to="/" className="nav-link py-0">
            Home
          </Link>
        </li>

        {props.isAuthenticated ? (
          <li>
            <Link to="/cart" className="nav-link py-0">
              Cart
            </Link>
          </li>
        ) : (
          <></>
        )}

        {props.isAuthenticated ? (
          <li>
            <Link to="/payment" className="nav-link py-0">
              Payment
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  addedItems: state.cart.addedItems,
  total: state.cart.total,
});

export default connect(mapStateToProps)(Nav);
