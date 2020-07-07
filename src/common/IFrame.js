import React, { Component } from "react";

class IFrame extends Component {
  handleSubmit() {
    document.getElementById("collectionForm").submit();
  }
  render() {
    return (
      <>
        <iframe
          title="deviceDataFrame"
          height="1"
          width="1"
          style={{ display: "none" }}
        >
          <form
            id="collectionForm"
            name="devicedata"
            method="POST"
            action="https://centinelapistag.cardinalcommerce.com/V2/Cruise/Collect"
          >
            <input type="hidden" name="JWT" value={this.props.value}></input>
          </form>
        </iframe>
      </>
    );
  }
}

export default IFrame;
