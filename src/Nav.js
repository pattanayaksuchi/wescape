import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Nav(props) {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Link to="/public">Public</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        {/* <li>
          <Link to="/private">Private</Link>
        </li> */}

        <li>
          <Link to="/payment">Payment</Link>
        </li>

        {isAuthenticated ? (
          <li>
            <Link to="/logout">Log Out</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default withRouter(Nav);
