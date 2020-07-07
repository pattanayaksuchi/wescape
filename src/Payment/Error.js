import React from "react";

const Error = (props) => {
  return (
    <>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        Error
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
            <h6 className="my-0">Reason</h6>
            <small className="text-muted">{props.reason}</small>
          </div>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Message</h6>
            <small className="text-muted">{props.message}</small>
          </div>
        </li>

        {props.reason ? (
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">Details</h6>
              <small className="text-muted">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Field</th>
                      <th scope="col">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.details.map((detail) => {
                      return (
                        <tr>
                          <th scope="row">.</th>
                          <td>{detail.field}</td>
                          <td>{detail.reason}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </small>
            </div>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};

export default Error;
