const OrgUnitID = "5e446791031e7303005e7b1d";
const APIKey = "6a291dee-2a07-47de-87d2-41e0b6a0a639";
const APIIdentifier = "5e4de8ac6fe3d10fe05e5994";
const { v4: uuidv4 } = require("uuid");
const authorization_with_pa_enroll = require("./CYBS/authwithenroll");
const basic_dm_transaction = require("./CYBS/dm1");
const authorization_with_pa_validate = require("./CYBS/authwithvalidate");
const dme_transaction = require("./CYBS/decisionmanagerevent");

const express = require("express");
require("dotenv").config();
const jwtoken = require("jsonwebtoken");
const jwt = require("express-jwt"); //Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); //Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const uuid = uuidv4();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./Data/DBConfig").MongoDBURI;
const crypto = require("crypto");
const passport = require("passport");
let hash = crypto.createHash("sha256");
const users = require("./serverRoutes/api/users");
const products = require("./serverRoutes/api/products");

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

const reqObj = {
  clientData: {},
  cardinalData: {},
};
let authResp = "";

const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://wescape-checkout-page-dev.us.auth0.com/.well-known/jwks.json`,
  }),

  audience: "Yrih1XYrUbjMCKt3ZywtIlOnYazumLY0",
  issuer: `https://wescape-checkout-page-dev.us.auth0.com/`,
  algorithms: ["RS256"],
});

function createJWT(AccountNumber) {
  let data = {
    jti: uuid,
    iss: APIIdentifier,
    OrgUnitId: OrgUnitID,
    ReferenceId: uuidv4(),
    ReturnUrl: "http://localhost:3000/deviceData",
    Payload: {
      Consumer: {
        Account: {
          AccountNumber,
        },
      },
    },
    ObjectifyPayload: true,
  };
  let token = jwtoken.sign(data, APIKey, { algorithm: "HS256" });
  return token;
}

function createStepUpJWT(Payload) {
  let data = {
    jti: uuid,
    iss: APIIdentifier,
    OrgUnitId: OrgUnitID,
    ReferenceId: uuidv4(),
    ReturnUrl: "http://localhost:3000/stepUpData",
    Payload,
    ObjectifyPayload: true,
  };
  let token = jwtoken.sign(data, APIKey, { algorithm: "HS256" });
  return token;
}

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./Data/passport")(passport);
app.use("/api/users", users);
app.use("/api/products", products);

app.get("/public", (req, res) => {
  console.log(req.body);
  res.json({
    message: JSON.stringify("Request gotcha!"),
  });
});

app.post("/auth", (req, res) => {
  console.log("Data received" + JSON.stringify(req.body));
  reqObj.clientData = req.body;
});

app.use(express.static("public"));
app.use("/images", express.static(__dirname + "/src/images"));

app.post("/score", (req, res) => {
  console.log("Data received" + JSON.stringify(req.body));
  basic_dm_transaction.basic_dm_transaction(
    req.body,
    (error, response, data) => {
      console.log("Sending data back to client");
      res.json({
        data: JSON.stringify(data),
        response: JSON.stringify(response),
        error: JSON.stringify(error),
        message: "DM Response",
      });
    }
  );
  // console.log(res);
});
app.post("/deviceData", (req, res) => {
  if (req.body.number) {
    let token = createJWT(req.body.number);
    res.json({
      message: "Request Received",
      jwt: token,
    });
  } else if (req.body.Response) {
    // console.log(req.body.Response);
    var sessionId = jwtoken.verify(req.body.Response, APIKey).Payload.SessionId;
    console.log("Session Id from Cardinal - " + sessionId);
    reqObj.cardinalData = {
      sessionId,
    };
    // console.log("Final Object -" + JSON.stringify(reqObj));
    authorization_with_pa_enroll.authorization_with_pa_enroll_authentication_needed(
      reqObj,
      (error, data, response) => {
        console.log("Data - " + JSON.stringify(data));
        if (data) {
          if (data.consumerAuthenticationInformation.stepUpUrl) {
            let Payload = {
              ACSUrl: data.consumerAuthenticationInformation.acsUrl,
              Payload: data.consumerAuthenticationInformation.pareq,
              TransactionId:
                data.consumerAuthenticationInformation
                  .authenticationTransactionId,
            };
            let jwt = createStepUpJWT(Payload);
            res.redirect("/output?c" + jwt);
          } else {
            res.redirect(
              "/output?r" + encodeURIComponent(JSON.stringify(data))
            );
            console.log("Data sent to client - " + JSON.stringify(data));
          }
        } else {
          console.log("Error from Auth is - " + JSON.stringify(error));
          res.redirect("/output?e" + JSON.stringify(error));
        }
      }
    );
  }
});

app.post("/stepUpData", (req, res) => {
  // console.log("Step Up Response from Cardinal - " + JSON.stringify(req.body));
  reqObj.cardinalData.TransactionId = req.body.TransactionId;
  console.log(JSON.stringify(reqObj));
  authorization_with_pa_validate.authorization_with_payer_auth_validation(
    reqObj,
    (error, data, response) => {
      console.log("Auth Validate Response - " + JSON.stringify(data));
      console.log("Auth Validate Error - " + JSON.stringify(error));
      if (data) authResp = JSON.stringify(data);
      if (error) authResp = JSON.stringify(error);
      res.send("<h2>OTP submitted</h2>");
    }
  );
});

app.get("/getAuthResponse", (req, res) => {
  console.log("AuthResp is -" + authResp);
  res.send(JSON.stringify(authResp));
  authResp = "";
});

app.get("/private", checkJWT, (req, res) => {
  res.json({
    message: "Hello from Wanderer's Escape's private API!!!",
  });
});

app.post("/dmevent", (req, res) => {
  dme_transaction.basic_dm_transaction(req.body, (error, response, data) => {
    console.log("Sending data back to client");
    res.json({
      data: JSON.stringify(data),
      response: JSON.stringify(response),
      error: JSON.stringify(error),
      message: "DM Events Response",
    });
  });
});

app.listen(3001);
console.log("API Server listening on " + process.env.REACT_APP_PUBLIC_API_URL);
