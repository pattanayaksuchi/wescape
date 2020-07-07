const AuthenticationType = "http_signature";
const RunEnvironment = "cybersource.environment.SANDBOX";
const MerchantId = "wescaper";

// http_signature parameters
const MerchantKeyId = "c965d017-c84f-4868-8f70-42b438ea6ca2";
const MerchantSecretKey = "WOtpwwlQkqcUb8Gvt9bALCRu9DL80H5/qv8ZkBYPsZw=";

// jwt parameters
const KeysDirectory = "Resource";
const KeyFileName = "testrest";
const KeyAlias = "testrest";
const KeyPass = "testrest";

// logging parameters
const EnableLog = true;
const LogFileName = "cybs";
const LogDirectory = "../log";
const LogfileMaxSize = "5242880"; //10 MB In Bytes

// Constructor for Configuration
function Configuration() {
  var configObj = {
    authenticationType: AuthenticationType,
    runEnvironment: RunEnvironment,

    merchantID: MerchantId,
    merchantKeyId: MerchantKeyId,
    merchantsecretKey: MerchantSecretKey,

    keyAlias: KeyAlias,
    keyPass: KeyPass,
    keyFileName: KeyFileName,
    keysDirectory: KeysDirectory,

    enableLog: EnableLog,
    logFilename: LogFileName,
    logDirectory: LogDirectory,
    logFileMaxSize: LogfileMaxSize,
  };
  return configObj;
}

module.exports = Configuration;
