import React, { Component } from "react";

class StepUpIFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 15,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      document
        .getElementById("stepup")
        .parentNode.removeChild(document.getElementById("stepup"));
      this.props.onClose();
    }, 15000);
    setInterval(() => {
      if (this.state.count >= 1) this.setState({ count: this.state.count - 1 });
    }, 1000);
    document
      .getElementById("ifrm1")
      .appendChild(document.getElementById("stepup"));
    document.getElementById("stepUpForm").submit();
  }
  render() {
    return (
      <>
        {this.state.count > 0 ? (
          <p>This window will close in {this.state.count} seconds</p>
        ) : (
          <></>
        )}
        <iframe
          title="StepUpFrame"
          name="stepup"
          id="stepup"
          height="250"
          width="400"
        >
          <form
            id="stepUpForm"
            method="POST"
            action="https://centinelapistag.cardinalcommerce.com/V2/Cruise/StepUp"
            target="stepup"
          >
            <input type="hidden" name="JWT" value={this.props.value}></input>
            <input type="hidden" name="MD" value="Wanderer's Escape"></input>
          </form>
        </iframe>
      </>
    );
  }
}

export default StepUpIFrame;
