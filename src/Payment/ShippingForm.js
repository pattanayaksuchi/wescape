import React, { Component } from "react";
import TextInput from "../common/TextInput";

class ShippingForm extends Component {
  render() {
    return (
      <>
        {!this.props.formData.sameShipping && (
          <div className="container">
            <div className="row">
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Shipping Address</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <TextInput
                      name="shipfirstName"
                      label="First Name"
                      value={this.props.formData.shipfirstName}
                      placeholder="Suchi"
                      onChange={this.props.onFill}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextInput
                      name="shiplastName"
                      label="Last Name"
                      value={this.props.formData.shiplastName}
                      placeholder="Pattanayak"
                      onChange={this.props.onFill}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <TextInput
                    name="shipemail"
                    label="Email Address"
                    value={this.props.formData.shipemail}
                    placeholder="pattanayaksuchi@gmail.com"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    name="shipaddress1"
                    label="Address 1"
                    value={this.props.formData.shipaddress1}
                    placeholder="D101, The Five Summits Address"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    name="shipaddress2"
                    label="Address 2"
                    value={this.props.formData.shipaddress2}
                    placeholder="Road No 10, EPIP Zone"
                    onChange={this.props.onFill}
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <TextInput
                      name="shipcountry"
                      label="Country"
                      value={this.props.formData.shipcountry}
                      placeholder="India"
                      onChange={this.props.onFill}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <TextInput
                      name="shipstate"
                      label="State"
                      value={this.props.formData.shipstate}
                      placeholder="Karnataka"
                      onChange={this.props.onFill}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <TextInput
                      name="shipzipCode"
                      label="Postal Code"
                      value={this.props.formData.shipzipCode}
                      placeholder="560066"
                      onChange={this.props.onFill}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ShippingForm;
