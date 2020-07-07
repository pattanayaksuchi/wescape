import React, { useState, useEffect } from "react";
import StepUpIFrame from "../common/SteupUpIFrame";
import Output from "./Output";
import Error from "./Error";

function OutputView(props) {
  const [queryString, setqueryString] = useState(
    decodeURIComponent(props.location.search)
  );
  const [authResponse, setauthResponse] = useState("");
  const [errResp, setErrResp] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [ecommerceIndicator, setEcommerceIndicator] = useState("");
  const [eci, setEci] = useState("");
  const [authErrorReason, setAuthErrorReason] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [error, seterror] = useState("");
  const [threedsversion, setThreedsVersion] = useState("");
  useEffect(() => {
    if (queryString.charAt(1) === "r") {
      setErrResp("0");
      var response = JSON.parse(queryString.substring(2));
      setStatus(response.status);
      setId(response.id);
      setEcommerceIndicator(
        response.consumerAuthenticationInformation.ecommerceIndicator
      );
      setEci(response.consumerAuthenticationInformation.eciRaw);
      setThreedsVersion(
        response.consumerAuthenticationInformation.specificationVersion
      );
      if ("errorInformation" in response) {
        setAuthErrorReason(response.errorInformation.reason);
        setAuthErrorMessage(response.errorInformation.message);
      }
      setqueryString(JSON.stringify(response));
    } else if (queryString.charAt(1) === "e") {
      setErrResp("1");
      var errResponse = JSON.parse(queryString.substring(2));
      var subErrResponse = JSON.parse(errResponse.response.text);
      console.log(subErrResponse);
      setStatus(subErrResponse.status);
      setId(subErrResponse.reason);
      setEcommerceIndicator(subErrResponse.message);
      setEci(subErrResponse.details);
      setqueryString(JSON.stringify(errResponse));
    } else if (queryString.charAt(1) === "c") {
      setErrResp("2");
      var stepUpJWT = props.location.search.substring(2);
      setqueryString(stepUpJWT);
    }
    // console.log(JSON.parse(queryString));
    console.log("View rendered");
    if (authResponse.length > 0 && authResponse !== "null") {
      console.log("Length of auth response - " + authResponse.length);
      var x = JSON.parse(authResponse);
      console.log(typeof x);
      console.log(x);
      if (x.status !== 400) {
        setStatus(x.status);
        setId(x.id);
        setEcommerceIndicator(x.consumerAuthenticationInformation.indicator);
        setEci(x.consumerAuthenticationInformation.eciRaw);
        setThreedsVersion(
          x.consumerAuthenticationInformation.specificationVersion
        );
        setErrResp("0");
        setauthResponse("");
      } else {
        var y = JSON.parse(x.response.text);
        setStatus(y.status);
        setId(y.reason);
        setEcommerceIndicator(y.message);
        setEci(y.details);
        setErrResp("1");
        setauthResponse("");
      }
    }
  }, [props.location.search, authResponse, errResp, queryString]);

  function getAuthResponse() {
    console.log("Fetching auth response");
    fetch("/getAuthResponse")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Result is - " + JSON.stringify(result));
          if (result.length > 0) setauthResponse(result);
          else setauthResponse("");
        },
        (error) => {
          seterror(JSON.stringify(error) + "20");
        }
      );
  }
  return (
    <div>
      <h1>Output View</h1>
      {errResp === "2" ? (
        <div>
          <StepUpIFrame value={queryString} onClose={getAuthResponse} />
        </div>
      ) : errResp === "0" ? (
        <Output
          status={status}
          id={id}
          ecommerceIndicator={ecommerceIndicator}
          eci={eci}
          threedsversion={threedsversion}
          authErrorReason={authErrorReason}
          authErrorMessage={authErrorMessage}
        />
      ) : (
        <Error
          status={status}
          reason={id}
          message={ecommerceIndicator}
          details={eci ? eci : []}
        />
      )}
    </div>
  );
}

export default OutputView;
