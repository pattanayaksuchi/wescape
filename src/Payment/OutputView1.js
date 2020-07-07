import React, { useState, useEffect } from "react";
import StepUpIFrame from "../common/SteupUpIFrame";
import OutputView from "./OutputView";

function OutputView1(props) {
  return (
    <div>
      <h1>Outputasdsd View</h1>
      <p>Parsedasdsd Data - {props.location.search}</p>
      <OutputView validateData={props.location.search} />
    </div>
  );
}

export default OutputView1;
