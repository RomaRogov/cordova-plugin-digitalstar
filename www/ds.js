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
 * @param {InitResponse} errorCode
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
 * @param {AppStartResponse} errorCode
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
 * @param {string} data - JSON Response string
 */
/**
 * @callback getClusterDataErrorCallback
 * @param {GetClusterDataResponse} errorCode
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
 * @param {successCallback} doneCallback
 */
DigitalStar.setLocale = function (locale, country, doneCallback) {
    cordova.exec(doneCallback, function () { }, "DigitalStar", "setLocale", [locale, country]);
}

/**
 * @param {string} url
 * @param {successCallback} doneCallback
 */
DigitalStar.setActivateOfferCallBackUrl = function (url, doneCallback) {
    cordova.exec(doneCallback, function () { }, "DigitalStar", "setActivateOfferCallBackUrl", [url]);
}

/*
 * @param {successCallback} doneCallback
 */
DigitalStar.userSeeDSOffers = function (doneCallback) {
    cordova.exec(doneCallback, function () { }, "DigitalStar", "userSeeDSOffers", []);
}

/**
 * @callback checkDSCardsInstalledCallback
 * @param {boolean} isInstalled
 */
/**
 * @param {checkDSCardsInstalledCallback} doneCallback
 */
DigitalStar.checkDSCardsInstalled = function (doneCallback) {
    cordova.exec(doneCallback, function () { }, "DigitalStar", "checkDSCardsInstalled", []);
}

/**
 * @callback openOfferErrorCallback
 * @param OpenOfferResponse errorCode
 */
/**
 * @param {string} offerID
 * @param {successCallback} successCallback
 * @param {openOfferErrorCallback} errorCallback
 */
DigitalStar.openOffer = function (offerID, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DigitalStar", "openOffer", [offerID]);
}

/**
 * @callback openClusterErrorCallback
 * @param OpenClusterResponse errorCode
 */
/**
 * @param {successCallback} successCallback
 * @param {openClusterErrorCallback} errorCallback
 */
DigitalStar.openCluster = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DigitalStar", "openCluster", []);
}

/**
 * @param {successCallback} successCallback
 * @param {openClusterErrorCallback} errorCallback
 */
DigitalStar.openDSCards = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "DigitalStar", "openDSCards", []);
}

module.exports = DigitalStar;