import React from "react";

const Button = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 order-md-1">
          <button
            type="submit"
            disabled={props.isSaving}
            className="btn btn-primary btn-lg btn-block"
            onClick={props.onSubmit}
          >
            {props.isSaving ? "Sending Data" : "Continue to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button;
