var cybersourceRestApi = require("cybersource-rest-client");
var path = require("path");
var filePath = path.resolve("Data/Configuration.js");
var configuration = require(filePath);

var authResponse = {};

function authorization_with_pa_enroll_authentication_needed(data, callback) {
  try {
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    var requestObj = new cybersourceRestApi.CreatePaymentRequest();

    var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = "TC50171_3";
    requestObj.clientReferenceInformation = clientReferenceInformation;

    var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();

    var actionList = new Array();
    actionList.push("CONSUMER_AUTHENTICATION");
    processingInformation.actionList = actionList;

    processingInformation.capture = false;
    requestObj.processingInformation = processingInformation;

    var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
    var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
    paymentInformationCard.number =
      data.clientData.paymentInformation.card.number;
    paymentInformationCard.expirationMonth =
      data.clientData.paymentInformation.card.expirationMonth;
    paymentInformationCard.expirationYear =
      data.clientData.paymentInformation.card.expirationYear;
    paymentInformation.card = paymentInformationCard;

    requestObj.paymentInformation = paymentInformation;

    var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
    var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount =
      data.clientData.orderInformation.amountDetails.totalAmount;
    orderInformationAmountDetails.currency =
      data.clientData.orderInformation.amountDetails.currency;
    orderInformation.amountDetails = orderInformationAmountDetails;

    var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
    orderInformationBillTo.firstName =
      data.clientData.orderInformation.billTo.firstName;
    orderInformationBillTo.lastName =
      data.clientData.orderInformation.billTo.lastName;
    orderInformationBillTo.address1 =
      data.clientData.orderInformation.billTo.address1;
    orderInformationBillTo.address2 =
      data.clientData.orderInformation.billTo.address2;
    orderInformationBillTo.locality =
      data.clientData.orderInformation.billTo.locality;
    orderInformationBillTo.administrativeArea =
      data.clientData.orderInformation.billTo.administrativeArea;
    orderInformationBillTo.postalCode =
      data.clientData.orderInformation.billTo.postalCode;
    orderInformationBillTo.country =
      data.clientData.orderInformation.billTo.country;
    orderInformationBillTo.email =
      data.clientData.orderInformation.billTo.email;
    orderInformationBillTo.phoneNumber =
      data.clientData.orderInformation.billTo.phoneNumber;
    orderInformation.billTo = orderInformationBillTo;

    var orderInformationShipTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationShipTo();
    orderInformationShipTo.firstName =
      data.clientData.orderInformation.shipTo.firstName;
    orderInformationShipTo.lastName =
      data.clientData.orderInformation.shipTo.lastName;
    orderInformationShipTo.address1 =
      data.clientData.orderInformation.shipTo.address1;
    orderInformationShipTo.address2 =
      data.clientData.orderInformation.shipTo.address2;
    orderInformationShipTo.locality =
      data.clientData.orderInformation.shipTo.locality;
    orderInformationShipTo.administrativeArea =
      data.clientData.orderInformation.shipTo.administrativeArea;
    orderInformationShipTo.postalCode =
      data.clientData.orderInformation.shipTo.postalCode;
    orderInformationShipTo.country =
      data.clientData.orderInformation.shipTo.country;
    orderInformationShipTo.email =
      data.clientData.orderInformation.shipTo.email;
    orderInformationShipTo.phoneNumber =
      data.clientData.orderInformation.shipTo.phoneNumber;
    orderInformation.shipTo = orderInformationShipTo;

    requestObj.orderInformation = orderInformation;

    var consumerAuthenticationInformation = new cybersourceRestApi.Ptsv2paymentsConsumerAuthenticationInformation();
    consumerAuthenticationInformation.requestorId = "123123197675";
    consumerAuthenticationInformation.referenceId = data.cardinalData.sessionId;
    requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;

    var deviceInformation = new cybersourceRestApi.Ptsv2paymentsDeviceInformation();
    deviceInformation.fingerprintSessionId =
      data.clientData.deviceInformation.fingerprintSessionId;
    requestObj.deviceInformation = deviceInformation;

    var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

    instance.createPayment(requestObj, function (error, data, response) {
      if (error) {
        // console.log("\nError : " + JSON.stringify(error));
      } else if (data) {
        // console.log("\nData : " + JSON.stringify(data));
        // authResponse = data;
      }

      // console.log("\nResponse : " + JSON.stringify(response));
      console.log(
        "\nResponse Code of Process a Payment : " +
          JSON.stringify(response["status"])
      );

      callback(error, data, response);
    });
  } catch (error) {
    console.log("\nException on calling the API : " + error);
  }
}
if (require.main === module) {
  authorization_with_pa_enroll_authentication_needed(function () {
    console.log("\nCreatePayment end.");
  });
}

module.exports.authorization_with_pa_enroll_authentication_needed = authorization_with_pa_enroll_authentication_needed;
