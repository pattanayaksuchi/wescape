import React, { Component } from "react";
import { Route } from "react-router-dom";
import Nav from "./Nav";
import Public from "./Public";
import Private from "./Private";
import PaymentPage from "./Payment/PaymentPage";
import OutputView from "./Payment/OutputView";
import OutputView1 from "./Payment/OutputView1";
import LogInPage from "./Auth/LogInPage";
import { Auth0Provider } from "@auth0/auth0-react";
import LogOutPage from "./Auth/LogOutPage";
import Profile from "./Profile";
import Cart from "./Cart/Cart";
import { Provider } from "react-redux";
import { appStore } from "./common/appStore";

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <Auth0Provider
          domain="wescape-checkout-page-dev.us.auth0.com"
          clientId="Yrih1XYrUbjMCKt3ZywtIlOnYazumLY0"
          redirectUri="http://localhost:3000/"
          audience="https://wescape-checkout-page-dev.us.auth0.com/api/v2/"
          scope="read:current_user update:current_user_metadata"
        >
          <Nav />
          <div className="body">
            <Route path="/profile" component={Profile} />
            <Route path="/public" component={Public} />
            <Route path="/private" render={Private} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/output" component={OutputView} />
            <Route path="/output1" component={OutputView1} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={LogInPage} />
            <Route path="/logout" component={LogOutPage} />
          </div>
          <div id="ifrm1"></div>
        </Auth0Provider>
      </Provider>
    );
  }
}

export default App;
