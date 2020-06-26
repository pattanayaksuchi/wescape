import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import PaymentPage from "./payments/PaymentPage";
import ProductPage from "./products/ProductPage";
import ManageProductsPage from "./products/ManageProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/products" component={ProductPage}></Route>
        <Route path="/product/:slug" component={ManageProductsPage}></Route>
        <Route exact path="/product/" component={ManageProductsPage}></Route>
        <Route path="/payment" component={PaymentPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
