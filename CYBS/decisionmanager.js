var cybersourceRestApi = require("cybersource-rest-client");
var path = require("path");
var filePath = path.resolve("Data/Configuration.js");
var configuration = require(filePath);

function basic_dm_transaction(data, callback) {
  try {
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    var requestObj = new cybersourceRestApi.CreateBundledDecisionManagerCaseRequest();

    var clientReferenceInformation = new cybersourceRestApi.Riskv1decisionsClientReferenceInformation();
    clientReferenceInformation.code = "54323007";
    requestObj.clientReferenceInformation = clientReferenceInformation;

    var paymentInformation = new cybersourceRestApi.Riskv1decisionsPaymentInformation();
    var paymentInformationCard = new cybersourceRestApi.Riskv1decisionsPaymentInformationCard();
    paymentInformationCard.number = data.paymentInformation.card.number;
    paymentInformationCard.expirationMonth =
      data.paymentInformation.card.expirationMonth;
    paymentInformationCard.expirationYear =
      data.paymentInformation.card.expirationYear;
    paymentInformation.card = paymentInformationCard;

    requestObj.paymentInformation = paymentInformation;

    var orderInformation = new cybersourceRestApi.Riskv1decisionsOrderInformation();
    var orderInformationAmountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
    orderInformationAmountDetails.currency =
      data.orderInformation.amountDetails.currency;
    orderInformationAmountDetails.totalAmount =
      data.orderInformation.amountDetails.totalAmount;
    orderInformation.amountDetails = orderInformationAmountDetails;

    var orderInformationBillTo = new cybersourceRestApi.Riskv1decisionsOrderInformationBillTo();
    orderInformationBillTo.address1 = data.orderInformation.billTo.address1;
    orderInformationBillTo.administrativeArea =
      data.orderInformation.billTo.administrativeArea;
    orderInformationBillTo.country = data.orderInformation.billTo.country;
    orderInformationBillTo.locality = data.orderInformation.billTo.locality;
    orderInformationBillTo.firstName = data.orderInformation.billTo.firstName;
    orderInformationBillTo.lastName = data.orderInformation.billTo.lastName;
    orderInformationBillTo.phoneNumber =
      data.orderInformation.billTo.phoneNumber;
    orderInformationBillTo.email = data.orderInformation.billTo.email;
    orderInformationBillTo.postalCode = data.orderInformation.billTo.postalCode;
    orderInformation.billTo = orderInformationBillTo;

    requestObj.orderInformation = orderInformation;

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
        // console.log('\nError : ' + JSON.stringify(error));
      } else if (data) {
        // console.log('\nData : ' + JSON.stringify(data));
      }

      // console.log('\nResponse : ' + JSON.stringify(response));
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
