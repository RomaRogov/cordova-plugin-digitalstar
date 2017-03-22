#import "CDVDigitalStar.h"
#import <DigitalStarCards/DSCards.h>

@implementation CDVDigitalStar

//Init DS
- (void)init:(CDVInvokedUrlCommand*)command
{
	NSString* serviceID = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"DigitalStarServiceID"];
	NSString* apiKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"DigitalStarApiKey"];
	NSString* clusterID = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"DigitalStarClusterID"];

    [DSCards initWithServiceID: serviceID apiKey: apiKey clusterID: clusterID 
    	success: ^{ [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId]; }
    	failure: ^(DSInitType dsInitType) {
    		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:dsInitType] callbackId:command.callbackId]; }
    ];
}

//Set server type
- (void)setServer:(CDVInvokedUrlCommand*)command
{
	if ([command.arguments count] < 1) {
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:998] callbackId:command.callbackId];
		return;
	}

	int serverTypeAsInt = [[command.arguments objectAtIndex:0] intValue];

	ServerType serverType = Production;
	switch (serverTypeAsInt) {
		case 0: serverType = Production; break;
		case 1: serverType = Development; break;
		default: 
			[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:999] callbackId:command.callbackId];
			return;
	}
    [self.commandDelegate runInBackground:^{
        [DSCards setServer:serverType];
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
    }];
}

//Register application start
- (void)appStart:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        [DSCards appStartWithSuccess: ^{
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
            } failure: ^(DSAppStatisticsType dsAppStatisticsType) {
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:dsAppStatisticsType] callbackId:command.callbackId];
            }
        ];
    }];
}

//Get JSON with cluster list
- (void)getClusterData:(CDVInvokedUrlCommand*)command
{
	if ([command.arguments count] < 1) {
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:998] callbackId:command.callbackId];
		return;
	}

	BOOL isFirstStart = [[command.arguments objectAtIndex:0] boolValue];
    
    [self.commandDelegate runInBackground:^{
        [DSCards getClusterDataWithFirstStart: isFirstStart success: ^(NSString* result) {
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: result] callbackId:command.callbackId];
            }
            failure: ^(DSClusterDataType dsClusterDataType) {
                [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:dsClusterDataType] callbackId:command.callbackId];
            }
         ];
    }];
}

//Set locale and country
- (void)setLocale:(CDVInvokedUrlCommand*)command
{
	if ([command.arguments count] < 2) {
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:998] callbackId:command.callbackId];
		return;
	}

	NSString* locale = [command.arguments objectAtIndex:0];
	NSString* country = [command.arguments objectAtIndex:1];

	[DSCards setLocale: locale country: country];

	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

//Set custom URL for offer activation
- (void)setActivateOfferCallBackUrl:(CDVInvokedUrlCommand*)command
{
	if ([command.arguments count] < 1) {
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:998] callbackId:command.callbackId];
		return;
	}

	NSString* url = [command.arguments objectAtIndex:0];

	[DSCards setActivateOfferCallBackUrl: url];

	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

//Calls when user see offers
- (void)userSeeDSOffers:(CDVInvokedUrlCommand*)command
{
	[DSCards userSeeDSOffers];
	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

//Checks if DS Cards app intalled
- (void)checkDSCardsInstalled:(CDVInvokedUrlCommand*)command
{
	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool: [DSCards checkInstalledDSCards]] callbackId:command.callbackId];
}

//Open offer in DS app
- (void)openOffer:(CDVInvokedUrlCommand*)command
{
	if ([command.arguments count] < 1) {
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:998] callbackId:command.callbackId];
		return;
	}

	NSString* offerID = [command.arguments objectAtIndex:0];

	[DSCards openOffer:offerID failure:^(DSOpenClusterOrOfferType dsOpenClusterOrOffer) {
		if (dsOpenClusterOrOffer == CO_InvalidOfferID) { dsOpenClusterOrOffer = 1; }
		if (dsOpenClusterOrOffer == CO_NotAddedURLSchemeActivateOffer) { dsOpenClusterOrOffer = 2; }
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:dsOpenClusterOrOffer] callbackId:command.callbackId];
	}];

	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

//Open DS app (with cluster ID)
- (void)openCluster:(CDVInvokedUrlCommand*)command
{
	if ([command.arguments count] < 1) {
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:998] callbackId:command.callbackId];
		return;
	}

	NSString* clusterID = [command.arguments objectAtIndex:0];

	[DSCards openCluster:clusterID failure:^(DSOpenClusterOrOfferType dsOpenClusterOrOffer) {
		if (dsOpenClusterOrOffer == CO_InvalidClusterID) { dsOpenClusterOrOffer = 1; }
		if (dsOpenClusterOrOffer == CO_NotAddedURLSchemeActivateOffer) { dsOpenClusterOrOffer = 3; }
		if (dsOpenClusterOrOffer == CO_InvalidInit) { dsOpenClusterOrOffer = 2; }
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:dsOpenClusterOrOffer] callbackId:command.callbackId];
	}];

	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

//Open DS app (without cluster ID)
- (void)openDSCards:(CDVInvokedUrlCommand*)command
{
	[DSCards openDSCards:^(DSOpenClusterOrOfferType dsOpenClusterOrOffer) {
		if (dsOpenClusterOrOffer == CO_NotAddedURLSchemeActivateOffer) { dsOpenClusterOrOffer = 3; }
		if (dsOpenClusterOrOffer == CO_InvalidInit) { dsOpenClusterOrOffer = 2; }
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsInt:dsOpenClusterOrOffer] callbackId:command.callbackId];
	}];

	[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}
@end