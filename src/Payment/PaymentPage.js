import React, { Component } from "react";
import { Redirect } from "react-router";
import PaymentForm from "./PaymentForm";
import CollectDeviceData from "./CollectDeviceData";
import ShippingForm from "./ShippingForm";
import Button from "../common/Button";
import createPaymentObject from "./CreatePaymentObject";
import createUUID from "./createUUID";
import OutputController from "./OutputController";
const OrgID = "45ssiuz3";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Suchi",
      lastName: "Pattanayak",
      email: "pattanayaksuchi@gmail.com",
      address1: "D101, The Five Summits Address",
      address2: "Road No 10, EPIP Zone",
      country: "India",
      administrativeArea: "KA",
      postalCode: "560066",
      number: "4111111111111111",
      expirationMonth: "01",
      expirationYear: "2023",
      securityCode: "123",
      saving: false,
      message: "",
      sameShipping: true,
      shipfirstName: "Suchi",
      shiplastName: "Pattanayak",
      shipemail: "pattanayaksuchi@gmail.com",
      shipaddress1: "D101, The Five Summits Address",
      shipaddress2: "Road No 10, EPIP Zone",
      shipcountry: "IN",
      shipstate: "KA",
      shipzipCode: "560066",
      service: "auth",
      totalAmount: "30",
      currency: "GBP",
      phoneNumber: "9438251959",
      locality: "Bangalore",
      resp: "",
      servData: "",
      servError: "",
      shipLocality: "Bangalore",
      shipPhoneNumber: "9438251959",
      fingerprintSessionId: createUUID(),
      authenticated: "false",
      ipAddress: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitToCardinal = this.submitToCardinal.bind(this);
  }

  componentDidMount() {
    if (document.getElementById("stepup"))
      document
        .getElementById("stepup")
        .parentNode.removeChild(document.getElementById("stepup"));

    const tmxHeadScript = document.createElement("script");
    tmxHeadScript.type = "text/javascript";
    tmxHeadScript.src = `https://h.online-metrix.net/fp/tags.js?org_id=${OrgID}&session_id=wescaper${this.state.fingerprintSessionId}`;
    document.head.appendChild(tmxHeadScript);
    fetch(
      "https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91"
    )
      .then((response) => response.json())
      .then((data) => this.setState({ ipAddress: data.IPv4 }));
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.jwt !== prevState.jwt) {
      document.getElementById("collectionForm").submit();
    }
  }

  sendData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit(event) {
    let obj = createPaymentObject(this.state);
    if (obj.route === "/auth") {
      this.setState({ saving: true });
      this.sendData("/deviceData", this.state).then((data) => {
        this.setState({ saving: false, message: data.message, jwt: data.jwt });
      });

      this.sendData(obj.route, obj.paymentObject).then((data) => {
        console.log("Data sent to server and Cardinal");

        this.setState({
          message: data.message,
          jwt: data.jwt,
          saving: false,
          resp: JSON.parse(data.response),
          servError: JSON.parse(data.error),
          servData: JSON.parse(data.data),
        });
      });
    }
    if (obj.route === "/score") {
      this.sendData(obj.route, obj.paymentObject).then((data) => {
        console.log("Data sent to server.");

        this.setState({
          message: data.message,
          saving: false,
          resp: JSON.parse(data.response),
          servError: JSON.parse(data.error),
          servData: JSON.parse(data.data),
        });
      });
      console.log("State after DM transaction is ", this.state);
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  submitToCardinal() {
    document.getElementById("collectionForm").submit();
  }

  checkBillingandShipping = (event) => {
    this.setState({ sameShipping: this.state.sameShipping ? false : true });
  };
  render() {
    return (
      <div>
        <h2>Fill in your Payment Details</h2>
        {this.state.jwt ? <CollectDeviceData jwt={this.state.jwt} /> : ""}
        <PaymentForm
          formData={this.state}
          onFill={this.handleChange}
          onCheck={this.checkBillingandShipping}
        />
        <ShippingForm formData={this.state} onFill={this.handleChange} />
        <Button isSaving={this.state.saving} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default PaymentPage;
