import React, { Component } from "react";
import IFrame from "../common/IFrame";

class CollectDeviceData extends Component {
  render() {
    return (
      <>
        <IFrame value={this.props.jwt} />
        {/* <input readOnly="true" value={this.props.jwt}></input> */}
      </>
    );
  }
}

export default CollectDeviceData;
