import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Layout/Nav";
import RegisterPage from "./Auth/RegisterPage";
import LogInPage from "./Auth/LogInPage";
import { Provider } from "react-redux";
import { appStore } from "./common/appStore";
import Home from "./Layout/Home";
import Dashboard from "./Dashboard/Dashboard";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import Cart from "./Cart/Cart";
import PaymentPage from "./Payment/PaymentPage";
import OutputView from "./Payment/OutputView";
import ShoppingCart from "./Cart/ShoppingCart";
import Cart1 from "./Cart/Cart1";
import ShoppingCart1 from "./Cart/ShoppingCart1";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  appStore.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    appStore.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <Router>
          <div className="App">
            <Nav />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/register" component={RegisterPage}></Route>
            <Route exact path="/login" component={LogInPage}></Route>
            <Route exact path="/mycart" component={ShoppingCart}></Route>
            <Route exact path="/cart1" component={Cart1}></Route>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/cart" component={Cart1} />
              <PrivateRoute exact path="/payment" component={PaymentPage} />
              <PrivateRoute exact path="/output" component={OutputView} />
            </Switch>
          </div>
          <div id="ifrm1"></div>
        </Router>
      </Provider>
    );
  }
}

export default App;
