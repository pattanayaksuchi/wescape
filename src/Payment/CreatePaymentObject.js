export default function createPaymentObject({
  service,
  firstName,
  lastName,
  email,
  address1,
  locality,
  country,
  administrativeArea,
  postalCode,
  number,
  expirationMonth,
  expirationYear,
  securityCode,
  totalAmount,
  currency,
  phoneNumber,
  shipfirstName,
  shiplastName,
  shipemail,
  shipaddress1,
  shipaddress2,
  shipcountry,
  shipstate,
  shipzipCode,
  shipLocality,
  shipPhoneNumber,
  fingerprintSessionId,
  ipAddress,
}) {
  switch (service) {
    case "auth":
      return {
        paymentObject: {
          processingInformation: {
            actionList: ["CONSUMER_AUTHENTICATION"],
            commerceIndicator: "internet",
          },
          paymentInformation: {
            card: {
              number,
              expirationMonth,
              expirationYear,
              securityCode,
            },
          },
          orderInformation: {
            amountDetails: {
              totalAmount,
              currency,
            },
            billTo: {
              firstName,
              lastName,
              address1,
              locality,
              administrativeArea,
              postalCode,
              country,
              email,
              phoneNumber,
            },
            shipTo: {
              firstName: shipfirstName,
              lastName: shiplastName,
              address1: shipaddress1,
              address2: shipaddress2,
              locality: shipLocality,
              administrativeArea: shipstate,
              postalCode: shipzipCode,
              country: shipcountry,
              phoneNumber: shipPhoneNumber,
            },
          },
          deviceInformation: {
            fingerprintSessionId,
          },
        },
        route: "/auth",
      };
    case "score":
      console.log("Running Decision Manager");
      return {
        paymentObject: {
          paymentInformation: {
            card: {
              number,
              expirationMonth,
              expirationYear,
            },
          },
          orderInformation: {
            amountDetails: {
              currency,
              totalAmount,
            },
            billTo: {
              address1,
              administrativeArea,
              country,
              locality,
              firstName,
              lastName,
              phoneNumber,
              email,
              postalCode,
            },
          },
          deviceInformation: {
            fingerprintSessionId,
            cookiesAccepted: navigator.cookieEnabled,
            ipAddress,
            userAgent: navigator.userAgent,
          },
        },
        route: "/score",
      };
    default:
      console.log("Running Default Case");
      return {
        paymentObject: {},
        route: {},
      };
  }
}
