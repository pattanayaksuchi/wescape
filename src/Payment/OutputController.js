import React, { Component } from "react";
import Output from "./Output";
import Error from "./Error";

class OutputController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseStatus: "",
      responseId: "",
      responseECommerceIndicator: "",
      responseECI: "",
      response3DSversion: "",
      errorStatus: "",
      errorReason: "",
      errorMessage: "",
      errorDetails: "",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Updating Output Controller Component");
    if (
      JSON.stringify(this.props.error) !== JSON.stringify(prevProps.error) &&
      this.props.error
    ) {
      console.log("Updating Error State");
      this.updateErrorState();
    } else if (
      JSON.stringify(this.props.response) !==
        JSON.stringify(prevProps.response) &&
      this.props.response
    ) {
      console.log("Updating Response State");
      this.updateResponseState();
    }
  }

  componentDidMount(prevProps, prevState) {
    console.log("Updating Output Controller Component");
    debugger;
    if (this.props.error) {
      console.log("Updating Error State");
      this.updateErrorState();
    } else if (this.props.response) {
      console.log("Updating Response State");
      this.updateResponseState();
    }
  }

  updateErrorState() {
    let parsedData = JSON.parse(this.props.error.response.text);
    console.log(parsedData);
    this.setState({
      errorStatus: this.props.error.status,
      errorReason: parsedData.reason,
      errorMessage: parsedData.message,
      errorDetails: parsedData.details,
    });
  }

  updateResponseState() {
    this.setState({
      responseStatus: this.props.response.status,
      responseId: this.props.response.id,
      // responseECommerceIndicator: this.props.response
      //   .consumerAuthenticationInformation.ecommerceIndicator,
      // responseECI: this.props.response.consumerAuthenticationInformation.eci,
      // response3DSversion: this.props.response.consumerAuthenticationInformation
      //   .specificationVersion,
    });
  }

  render() {
    if (!this.state.errorStatus) {
      return (
        <Output
          status={this.state.responseStatus}
          id={this.state.responseId}
          ecommerceIndicator={this.state.responseECommerceIndicator}
          eci={this.state.responseECI}
          threedsversion={this.state.response3DSversion}
        />
      );
    } else {
      return (
        <Error
          status={this.state.errorStatus}
          reason={this.state.errorReason}
          message={this.state.errorMessage}
          details={
            this.state.errorReason === "INVALID_ACCOUNT"
              ? []
              : this.state.errorDetails
          }
        />
      );
    }
  }
}

export default OutputController;
