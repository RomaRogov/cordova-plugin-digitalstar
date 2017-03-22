#import <Cordova/CDV.h>
#import <DigitalStarCards/DSCards.h>

@interface CDVDigitalStar : CDVPlugin

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)setServer:(CDVInvokedUrlCommand*)command;
- (void)appStart:(CDVInvokedUrlCommand*)command;
- (void)getClusterData:(CDVInvokedUrlCommand*)command;
- (void)setLocale:(CDVInvokedUrlCommand*)command;
- (void)setActivateOfferCallBackUrl:(CDVInvokedUrlCommand*)command;
- (void)userSeeDSOffers:(CDVInvokedUrlCommand*)command;
- (void)openOffer:(CDVInvokedUrlCommand*)command;
- (void)openCluster:(CDVInvokedUrlCommand*)command;
- (void)openDSCards:(CDVInvokedUrlCommand*)command;

@end