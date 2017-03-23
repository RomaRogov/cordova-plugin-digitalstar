package org.apache.cordova.plugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import static java.lang.System.*;
import android.content.Context;
import cards.digitalstar.digitalstarcards.*;
import cards.digitalstar.digitalstarcards.DSResponses.*;


class AppStartCallbackImp implements DSCards.AppStartCallback {
    
    private CallbackContext callbackContext;
    
    public AppStartCallbackImp(CallbackContext cc) {
        callbackContext = cc;
    }
    
    public void onCompleted(AppStartResponse result) {
        if(result == AppStartResponse.FinishedSuccessfully) {
            callbackContext.success();
        } else {
            callbackContext.error(result.getNumericType());
        }
    }
}

class GetClusterDataCallbackImp implements DSCards.GetClusterDataCallback {
    
    private CallbackContext callbackContext;
    
    public GetClusterDataCallbackImp(CallbackContext cc) {
        callbackContext = cc;
    }
    
    public void onCompleted(GetClusterDataResponse result) {
        if(result == GetClusterDataResponse.FinishedSuccessfully) {
            callbackContext.success(result.getJson());
        } else {
            callbackContext.error(result.getNumericType());
        }
    }
}

class OpenOfferCallbackImp implements DSCards.OpenOfferCallback {
    
    private CallbackContext callbackContext;
    
    public OpenOfferCallbackImp(CallbackContext cc) {
        callbackContext = cc;
    }
    
    public void onCompleted(OpenOfferResponse result) {
        if(result == OpenOfferResponse.FinishedSuccessfully) {
            callbackContext.success();
        } else {
            callbackContext.error(result.getNumericType());
        }
    }
}

class OpenClusterCallbackImp implements DSCards.OpenClusterCallback {
    
    private CallbackContext callbackContext;
    
    public OpenClusterCallbackImp(CallbackContext cc) {
        callbackContext = cc;
    }
    
    public void onCompleted(OpenClusterResponse result) {
        if(result == OpenClusterResponse.FinishedSuccessfully) {
            callbackContext.success();
        } else {
            callbackContext.error(result.getNumericType());
        }
    }
}

class CheckDSCardsInstalledCallbackImp implements DSCards.CheckDSCardsInstalledCallback {
 
    private CallbackContext callbackContext;
    
    public CheckDSCardsInstalledCallbackImp(CallbackContext cc) {
        callbackContext = cc;
    }
    
    public void onCompleted(CheckDSCardsInstalledResponse result) {
        callbackContext.success(result.getNumericType()); 
    } 
}


class ArgumentCountException extends Exception
{
      //Parameterless Constructor
      public ArgumentCountException() {}

      //Constructor that accepts a message
      public ArgumentCountException(String message)
      {
         super(message);
      }
 }


/**
* This class echoes a string called from JavaScript.
*/
public class DigitalStar extends CordovaPlugin {

private DSCards ds;
private String serviceId;
private String apiKey;
private String clusterId;
private Context context; 

@Override
public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    try {
        if (action.equals("init")) {
            return init(callbackContext);    
        }  else if (action.equals("setServer")) {
            assertArgs(args.length(), 1);
            return setServer(callbackContext, args.getInt(0));    
        } else if (action.equals("appStart")) {
            return appStart(callbackContext);
        } else if (action.equals("getClusterData")) {
            assertArgs(args.length(), 1);
            return getClusterData(callbackContext, args.getBoolean(0));
        } else if (action.equals("setLocale")) {
            assertArgs(args.length(), 2);
            return setLocale(callbackContext, args.getString(0), args.getString(1));
        } else if (action.equals("setActivateOfferCallBackUrl")) {
            assertArgs(args.length(), 1);
            return setActivateOfferCallBackUrl(callbackContext, args.getString(0));
        }  else if (action.equals("userSeeDSOffers")) {
            return userSeeDSOffers(callbackContext);
        } else if (action.equals("checkDSCardsInstalled")) {
            return checkDSCardsInstalled(callbackContext);
        } else if (action.equals("openOffer")) {
            assertArgs(args.length(), 1);
            return openOffer(callbackContext, args.getString(0));
        } else if (action.equals("openCluster")) {
            return openCluster(callbackContext);
        } else if (action.equals("openDSCards")) {
            return openDSCards(callbackContext);
        } else {
            return false;
        }
    } catch (ArgumentCountException e) {
        callbackContext.error(999);  
    } catch (Exception e) {
        callbackContext.error(998);  
    }
    return true;
}

private boolean init(CallbackContext callbackContext) {
    ds = DSFactory.getDSCards();
    context = this.cordova.getActivity().getApplicationContext(); 
    serviceId = getParameter("service_id");
    apiKey = getParameter("api_key");
    clusterId = getParameter("cluster_id");
    InitResponse response = ds.init(context, serviceId, apiKey, clusterId);
    if(response == InitResponse.FinishedSuccessfully) {
        callbackContext.success();
    } else {
        callbackContext.error(response.getNumericType());
    }
    return true;
}    

private boolean setServer(CallbackContext callbackContext, int type) {  
    ds.setServer(ServerType.fromValue(type));
    callbackContext.success();
    return true;
}
        
private boolean appStart (CallbackContext callbackContext) {
    ds.appStart(new AppStartCallbackImp(callbackContext));
    return true;
}

private boolean getClusterData (CallbackContext callbackContext, boolean isFirstStart) {
    ds.getClusterData(isFirstStart, new GetClusterDataCallbackImp(callbackContext));
    return true;
}

private boolean setLocale (CallbackContext callbackContext, String language, String country) {
    ds.setLocale(language, country);
    callbackContext.success();
    return true;
}

private boolean setActivateOfferCallBackUrl (CallbackContext callbackContext, String url) {
    ds.setActivateOfferCallBackUrl(url);
    callbackContext.success();
    return true;
}

private boolean userSeeDSOffers (CallbackContext callbackContext) {
    ds.userSeeDSOffers();
    callbackContext.success();
    return true;
}

private boolean checkDSCardsInstalled (CallbackContext callbackContext) {
    ds.checkDSCardsInstalled(new CheckDSCardsInstalledCallbackImp(callbackContext));
    return true;
}

private boolean openOffer(CallbackContext callbackContext, String offerID) {
    ds.openOffer(offerID, new OpenOfferCallbackImp(callbackContext));
    return true;
}

private boolean openCluster (CallbackContext callbackContext) {
    ds.openCluster(new OpenClusterCallbackImp(callbackContext));
    return true;
}

private boolean openDSCards (CallbackContext callbackContext) {
    ds.openDSCards(new OpenClusterCallbackImp(callbackContext));
    return true;
}

private String getParameter(String name) {
    int apiKeyFromParam = cordova.getActivity().getResources().getIdentifier(name + "_param", "string", cordova.getActivity().getPackageName());
    String ret = "";

    if (apiKeyFromParam > 0) {
        ret = cordova.getActivity().getString(apiKeyFromParam);
        if (ret.length() > 0) {
            return ret;
        }
    }

    int apiKey = cordova.getActivity().getResources().getIdentifier(name, "string", cordova.getActivity().getPackageName());
    return cordova.getActivity().getString(apiKey);
}
    
private void assertArgs(int count, int countTarget) throws ArgumentCountException {
    if (count < countTarget) {
        throw new ArgumentCountException();
    }
}
    
}