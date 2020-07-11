var cybersourceRestApi = require("cybersource-rest-client");
var path = require("path");
var filePath = path.resolve("Data/Configuration.js");
var configuration = require(filePath);

function basic_dm_transaction(data, callback) {
  try {
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    var requestObj = new cybersourceRestApi.CreateDecisionManagerCaseRequest();

    var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
    clientReferenceInformation.code = "54323007";
    requestObj.clientReferenceInformation = clientReferenceInformation;

    var deviceInformation = new cybersourceRestApi.Riskv1decisionsDeviceInformation();
    deviceInformation.fingerprintSessionId =
      data.deviceInformation.fingerprintSessionId;
    deviceInformation.cookiesAccepted = data.deviceInformation.cookiesAccepted;
    deviceInformation.ipAddress = data.deviceInformation.ipAddress;
    deviceInformation.userAgent = data.deviceInformation.userAgent;

    requestObj.deviceInformation = deviceInformation;

    var riskInformation = new cybersourceRestApi.Riskv1decisionsRiskInformation();
    riskInformation.eventType = data.riskInformation.eventType;

    requestObj.riskInformation = riskInformation;

    var instance = new cybersourceRestApi.DecisionManagerApi(
      configObject,
      apiClient
    );

    instance.createDecisionManagerCase(requestObj, function (
      error,
      data,
      response
    ) {
      if (error) {
        console.log("\nError : " + JSON.stringify(error));
      } else if (data) {
        console.log("\nData : " + JSON.stringify(data));
      }

      console.log("\nResponse : " + JSON.stringify(response));
      console.log(
        "\nResponse Code of Create Decision Manager Case : " +
          JSON.stringify(response["status"])
      );
      callback(error, data, response);
    });
  } catch (error) {
    console.log("\nException on calling the API : " + error);
  }
}
if (require.main === module) {
  basic_dm_transaction(function () {
    console.log("\nCreateDecisionManagerCase end.");
  });
}
module.exports.basic_dm_transaction = basic_dm_transaction;
