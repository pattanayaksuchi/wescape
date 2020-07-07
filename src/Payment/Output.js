import React from "react";

const Output = (props) => {
  return (
    <>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        Output
      </h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Status</h6>
            <small className="text-muted">{props.status}</small>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Cybersource ID</h6>
            <small className="text-muted">{props.id}</small>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">E Commerce Indicator</h6>
            <small className="text-muted">{props.ecommerceIndicator}</small>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">ECI</h6>
            <small className="text-muted">{props.eci}</small>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">3DS version</h6>
            <small className="text-muted">{props.threedsversion}</small>
          </div>
        </li>
        {props.authErrorReason ? (
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Error Reason</h6>
              <small className="text-muted">{props.authErrorReason}</small>
            </div>
          </li>
        ) : (
          ""
        )}
        {props.authErrorMessage ? (
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Error Message</h6>
              <small className="text-muted">{props.authErrorMessage}</small>
            </div>
          </li>
        ) : (
          ""
        )}
      </ul>
    </>
  );
};

export default Output;
