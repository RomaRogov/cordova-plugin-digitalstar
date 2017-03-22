DigitalStar = {};

//-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-ENUM AREA

/**
 * InitResponse
 * @readonly
 * @enum {number}
 */
DigitalStar.InitResponse = {
    FinishedSuccessfully: 0,
    InvalidServiceID: 1,
    InvalidApiKey: 2,
    InvalidContext: 3,
    InvalidClusterId: 4
}

/**
 * ServerType
 * @readonly
 * @enum {number}
 */
DigitalStar.ServerType = {
    Production: 0,
    Development: 1
}
 
/**
 * AppStartResponse
 * @readonly
 * @enum {number}
 */
DigitalStar.AppStartResponse = {
    FinishedSuccessfully: 0,
    InvalidInit: 1,
    InternetConnectionError: 2
}
 
/**
 * GetClusterDataResponse
 * @readonly
 * @enum {number}
 */
DigitalStar.GetClusterDataResponse = {
    FinishedSuccessfully: 0,
    InvalidInit: 1,
    InternetConnectionError: 2,
    EmptyClusterData: 3,
    MethodHasAlreadyBeenCalled: 4,
}
 
/**
 * OpenOfferResponse
 * @readonly
 * @enum {number}
 */
DigitalStar.OpenOfferResponse = {
    FinishedSuccessfully: 0,
    InvalidOfferID: 1,
    /** Throws on iOS when "dscards" not added to LSApplicationQueriesSchemes category in info.plist */
    NotAddedURLSchemeActivateOffer: 2
}
 
/**
 * OpenClusterResponse
 * @readonly
 * @enum {number}
 */
DigitalStar.OpenClusterResponse = {
    FinishedSuccessfully: 0,
    InvalidClusterID: 1,
    InvalidInit: 2,
    /** Throws on iOS when "dscards" not added to LSApplicationQueriesSchemes category in info.plist */
    NotAddedURLSchemeActivateOffer: 3
}
 
/**
 * CheckDSCardsInstalledResponse
 * @readonly
 * @enum {number}
 */
DigitalStar.CheckDSCardsInstalledResponse = {
    Installed: 0,
    Uninstalled: 1
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-METHODS AREA

/**
 * @callback successCallback
 */

/**
 * @callback initErrorCallback
 * @param InitResponse errorCode
 */
/**
 * @param {successCallback} successCallback
 * @param {initErrorCallback} errorCallback
 */
DigitalStar.init = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DigitalStar", "init", []);
}

/**
 * @param {ServerType} serverType - Server Type
 * @param {successCallback} successCallback
 */
DigitalStar.setServer = function (serverType, successCallback) {
    cordova.exec(successCallback, function () { }, "DigitalStar", "setServer", [serverType]);
}

/**
 * @callback appStartErrorCallback
 * @param AppStartResponse errorCode
 */
/**
 * @param {successCallback} successCallback
 * @param {appStartErrorCallback} errorCallback
 */
DigitalStar.appStart = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DigitalStar", "appStart", []);
}

/**
 * @callback getClusterDataSuccessCallback
 * @param string data - JSON Response string
 */
/**
 * @callback getClusterDataErrorCallback
 * @param GetClusterDataResponse errorCode
 */
/**
 * @param {boolean} isFirstStart - Defines is app just started or resumed from background
 * @param {getClusterDataSuccessCallback} successCallback - response callback with JSON data
 * @param {getClusterDataErrorCallback} errorCallback
 */
DigitalStar.getClusterData = function (isFirstStart, successCallback, errorCallback) {
    cordova.exec(function (data) { successCallback(JSON.parse(data)); }, errorCallback, "DigitalStar", "getClusterData", [isFirstStart]);
}

/**
 * @param {string} locale
 * @param {string} country
 */
DigitalStar.setLocale = function (locale, country) {
    cordova.exec(function () { }, function () { }, "DigitalStar", "setLocale", [locale, country]);
}

/**
 * @param {string} url
 */
DigitalStar.setActivateOfferCallBackUrl = function (url) {
    cordova.exec(function () { }, function () { }, "DigitalStar", "setActivateOfferCallBackUrl", [url]);
}

DigitalStar.userSeeDSOffers = function () {
    cordova.exec(function () { }, function () { }, "DigitalStar", "userSeeDSOffers", []);
}

/**
 * @callback openOfferErrorCallback
 * @param OpenOfferResponse errorCode
 */
/**
 * @param {string} offerID
 * @param {openOfferErrorCallback} errorCallback
 */
DigitalStar.openOffer = function (offerID, errorCallback) {
    cordova.exec(function () { }, errorCallback, "DigitalStar", "openOffer", [offerID]);
}

/**
 * @callback openClusterErrorCallback
 * @param OpenClusterResponse errorCode
 */
/**
 * @param {string} clusterID
 * @param {openClusterErrorCallback} errorCallback
 */
DigitalStar.openCluster = function (clusterID, errorCallback) {
    cordova.exec(function () { }, errorCallback, "DigitalStar", "openCluster", [clusterID]);
}

/**
 * @param {openClusterErrorCallback} errorCallback
 */
DigitalStar.openDSCards = function (errorCallback) {
    cordova.exec(function () { }, errorCallback, "DigitalStar", "openDSCards", []);
}

module.exports = DigitalStar;