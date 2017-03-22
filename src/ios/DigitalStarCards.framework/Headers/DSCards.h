//
//  DSCards.h
//  DigitalStarCards
//
//  Created by Ivashkov Rodion on 23.05.16.
//  Copyright © 2016 Ivashkov Rodion. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DSCards : NSObject


typedef enum {
    I_FinishedSuccessfully = 0,
    I_InvalidServiceID = 1, // Service ID не String или пустой
    I_InvalidApiKey = 2, // Api Key не String или пустой
    I_InvalidContext = 3, // Необходимо давть "dscards" в LSApplicationQueriesSchemes в info.plist
    I_InvalidClusterID = 4 // Cluster ID не String или пустой
} DSInitType;

typedef enum {
    Production = 0,
    Development = 1
} ServerType;

typedef enum {
    AS_FinishedSuccessfully = 0,
    AS_InvalidInit = 1,
    AS_InternetConnectionError = 2
} DSAppStatisticsType;

typedef enum {
    CL_FinishedSuccessfully = 0,
    CL_InvalidInit = 1,
    CL_InternetConnectionError = 2,
    CL_EmptyClusterData = 3,
    CL_MethodHasAlreadyBeenCalled = 4
} DSClusterListType;

typedef enum {
    CD_FinishedSuccessfully = 0,
    CD_InvalidInit = 1,
    CD_InternetConnectionError = 2,
    CD_EmptyClusterData = 3,
    CD_MethodHasAlreadyBeenCalled = 4
} DSClusterDataType;

typedef enum {
    CO_InvalidOfferID, // offer ID не String или пустой
    CO_InvalidClusterID, // cluster ID не String или пустой
    CO_NotAddedURLSchemeActivateOffer, // Необходимо давть "dscards" в LSApplicationQueriesSchemes в info.plist
    CO_InvalidInit
} DSOpenClusterOrOfferType;

typedef void(^DSCardsInitWithServiceIDSuccess)();
typedef void(^DSCardsInitFailure)(DSInitType dsInitType);

typedef void(^DSCardsAppStartSuccess)();
typedef void(^DSCardsAppStartFailure)(DSAppStatisticsType dsAppStatisticsType);

typedef void(^DSCardsGetClusterListSuccess)(NSArray *result);
typedef void(^DSCardsGetClusterListFailure)(DSClusterListType dsClusterListType);

typedef void(^DSCardsGetClusterDataSuccess)(NSString *result);
typedef void(^DSCardsGetClusterDataFailure)(DSClusterDataType dsClusterDataType);

typedef void(^DSCardsOpenClusterOrOfferFailure)(DSOpenClusterOrOfferType dsOpenClusterOrOffer);




#pragma mark - Initialization

+ (void)initWithServiceID:(NSString *)serviceID
         apiKey:(NSString *)apiKey
                clusterID:(NSString *)clusterID
                  success:(DSCardsInitWithServiceIDSuccess)success
                  failure:(DSCardsInitFailure)failure;

+ (DSInitType)initWithServiceIDSync:(NSString *)serviceID
                   apiKey:(NSString *)apiKey
                          clusterID:(NSString *)clusterID;

#pragma mark - Server installation

+ (void)setServer:(ServerType)serverType;

+ (void)setServerSync:(ServerType)serverType;

#pragma mark - Application start

+ (void)appStartWithSuccess:(DSCardsAppStartSuccess)success
                    failure:(DSCardsAppStartFailure)failure;

+ (DSAppStatisticsType)appStartSync;

#pragma mark - Get Cluster Array

+ (void)getClusterListWithFirstStart:(BOOL)isFirstStart
                             success:(DSCardsGetClusterListSuccess)success
                             failure:(DSCardsGetClusterListFailure)failure;

#pragma mark - Get Cluster String

+ (void)getClusterDataWithFirstStart:(BOOL)isFirstStart
                             success:(DSCardsGetClusterDataSuccess)success
                             failure:(DSCardsGetClusterDataFailure)failure;

+ (NSString *)getClusterDataWithFirstStartSync:(BOOL)isFirstStart;

#pragma mark - Set Locale

+ (void)setLocale:(NSString *)language
          country:(NSString *)country;

+ (void)setLocaleSync:(NSString *)language
              country:(NSString *)country;

#pragma mark - CallBackURL

+ (void)setActivateOfferCallBackUrl:(NSString *)callBackUrl;
+ (void)setActivateOfferCallBackUrlSync:(NSString *)callBackUrl;

#pragma mark - User See DS Offers

+ (void)userSeeDSOffers;

#pragma mark - Check DS

+ (BOOL)checkInstalledDSCards;

#pragma mark - Send user To DigitalStar

+ (void)openDSCards:(DSCardsOpenClusterOrOfferFailure)failure;

#pragma mark - Open Offer in DigitalStar(if DS not installed send to AppStore)

+ (void)openOffer:(NSString *)offerID
          failure:(DSCardsOpenClusterOrOfferFailure)failure;

#pragma mark - Open Cluster in DigitalStar(if DS not installed send to AppStore)

+ (void)openCluster:(NSString *)clusterID
            failure:(DSCardsOpenClusterOrOfferFailure)failure;


@end

