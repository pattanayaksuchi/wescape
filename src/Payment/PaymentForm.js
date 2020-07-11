import React, { Component } from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import OutputController from "./OutputController";

class PaymentForm extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout Form</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            {this.props.formData.resp ? (
              <OutputController
                response={this.props.formData.resp}
                error={this.props.formData.servError}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing Address</h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <TextInput
                    name="firstName"
                    label="First Name"
                    value={this.props.formData.firstName}
                    placeholder="Suchi"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <TextInput
                    name="lastName"
                    label="Last Name"
                    value={this.props.formData.lastName}
                    placeholder="Pattanayak"
                    onChange={this.props.onFill}
                  />
                </div>
              </div>
              <div className="mb-3">
                <TextInput
                  name="email"
                  label="Email Address"
                  value={this.props.formData.email}
                  placeholder="pattanayaksuchi@gmail.com"
                  onChange={this.props.onFill}
                />
              </div>
              <div className="mb-3">
                <TextInput
                  name="address1"
                  label="Address 1"
                  value={this.props.formData.address1}
                  placeholder="D101, The Five Summits Address"
                  onChange={this.props.onFill}
                />
              </div>
              <div className="mb-3">
                <TextInput
                  name="address2"
                  label="Address 2"
                  value={this.props.formData.address2}
                  placeholder="Road No 10, EPIP Zone"
                  onChange={this.props.onFill}
                />
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <TextInput
                    name="country"
                    label="Country"
                    value={this.props.formData.country}
                    placeholder="India"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <TextInput
                    name="administrativeArea"
                    label="State"
                    value={this.props.formData.administrativeArea}
                    placeholder="Karnataka"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <TextInput
                    name="postalCode"
                    label="Postal Code"
                    value={this.props.formData.postalCode}
                    placeholder="560066"
                    onChange={this.props.onFill}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <TextInput
                    name="phoneNumber"
                    label="Phone Number"
                    value={this.props.formData.phoneNumber}
                    placeholder="9438251959"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <SelectInput
                    name="service"
                    label="ICS Service"
                    value={this.props.formData.service}
                    onChange={this.props.onFill}
                    defaultOption="Select Service"
                    options={[
                      { value: "auth", text: "Authorization" },
                      { value: "enroll", text: "Payer Auth" },
                      { value: "score", text: "Decision Manager" },
                    ]}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <TextInput
                    name="totalAmount"
                    label="Amount"
                    value={"INR " + this.props.formData.totalAmount}
                    placeholder="30"
                    // onChange={this.props.onFill}
                  />
                </div>
              </div>
              <hr className="mb-4"></hr>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.formData.sameShipping}
                  onChange={this.props.onCheck}
                ></input>
                Shipping Same as Billing
              </label>
              <hr className="mb-4"></hr>
              <h4 className="mb-3">Payment</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <TextInput
                    name="number"
                    label="Credit Card Number"
                    value={this.props.formData.number}
                    placeholder="4111111111111111"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <TextInput
                    name="securityCode"
                    label="Credit Card CVV"
                    value={this.props.formData.securityCode}
                    placeholder="123"
                    onChange={this.props.onFill}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <TextInput
                    name="expirationMonth"
                    label="Expiration Month"
                    value={this.props.formData.expirationMonth}
                    placeholder="01"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <TextInput
                    name="expirationYear"
                    label="Expiration Year"
                    value={this.props.formData.expirationYear}
                    placeholder="2023"
                    onChange={this.props.onFill}
                  />
                </div>
              </div>
              <hr className="mb-4"></hr>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PaymentForm.propTypes = {
  formData: PropTypes.object,
  onFill: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default PaymentForm;
