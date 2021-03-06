//
//  JWTCoding+ResultTypes.m
//  JWT
//
//  Created by Lobanov Dmitry on 30.11.16.
//  Copyright © 2016 JWTIO. All rights reserved.
//

#import "JWTCoding+ResultTypes.h"

static NSString *JWTCodingResultHeaders = @"headers";
static NSString *JWTCodingResultPayload = @"payload";

@implementation JWT (ResultTypes) @end

@implementation JWTCodingResultComponents
+ (NSString *)headers {
    return JWTCodingResultHeaders;
}
+ (NSString *)payload {
    return JWTCodingResultPayload;
}
@end

// Protected?
@protocol JWTMutableCodingResultTypeSuccessEncodedProtocol <JWTCodingResultTypeSuccessEncodedProtocol>
@property (copy, nonatomic, readwrite) NSString *encoded;
@property (copy, nonatomic, readwrite) NSString *token;
@end

// Protected?
@protocol JWTMutableCodingResultTypeSuccessDecodedProtocol <JWTCodingResultTypeSuccessDecodedProtocol>
@property (copy, nonatomic, readwrite) NSDictionary *headers;
@property (copy, nonatomic, readwrite) NSDictionary *payload;
@property (copy, nonatomic, readwrite) id<JWTClaimsSetProtocol> claimsSetStorage;
@end

// Protected?
@protocol JWTMutableCodingResultTypeErrorProtocol <JWTCodingResultTypeErrorProtocol>
@property (copy, nonatomic, readwrite) NSError *error;
@end

@interface JWTCodingResultTypeSuccess () <JWTMutableCodingResultTypeSuccessEncodedProtocol, JWTMutableCodingResultTypeSuccessDecodedProtocol> @end

@implementation JWTCodingResultTypeSuccess
@synthesize encoded = _encoded;
@synthesize headers = _headers;
@synthesize payload = _payload;
@synthesize claimsSetStorage = _claimsSetStorage;
//Not used yet. Could be replacement for _encoded.
@synthesize token = _token;

- (NSDictionary *)headerAndPayloadDictionary {
    if (self.headers && self.payload) {
        return @{
                 JWTCodingResultComponents.headers: self.headers,
                 JWTCodingResultComponents.payload: self.payload
        };
    }
    return nil;
}
- (instancetype)initWithEncoded:(NSString *)encoded {
    if (self = [super init]) {
        self.encoded = encoded;
    }
    return self;
}
- (instancetype)initWithToken:(NSString *)token {
    if (self = [super init]) {
        self.token = token;
    }
    return self;
}
- (instancetype)initWithHeaders:(NSDictionary *)headers withPayload:(NSDictionary *)payload {
    if (self = [super init]) {
        self.headers = headers;
        self.payload = payload;
    }
    return self;
}

- (instancetype)initWithHeadersAndPayload:(NSDictionary *)headersAndPayloadDictionary {
    NSDictionary *headers = headersAndPayloadDictionary[JWTCodingResultComponents.headers];
    NSDictionary *payload = headersAndPayloadDictionary[JWTCodingResultComponents.payload];
    return [self initWithHeaders:headers withPayload:payload];
}

- (instancetype)initWithClaimsSetStorage:(id<JWTClaimsSetProtocol>)claimsSetStorage {
    if (self = [super init]) {
        self.claimsSetStorage = claimsSetStorage;
    }
    return self;
}
@end

@interface JWTCodingResultTypeError () <JWTMutableCodingResultTypeErrorProtocol> @end

@implementation JWTCodingResultTypeError
@synthesize error = _error;
- (instancetype)initWithError:(NSError *)error {
    if (self = [super init]) {
        self.error = error;
    }
    return self;
}
@end

@interface JWTCodingResultType ()
@property (strong, nonatomic, readwrite) JWTCodingResultTypeSuccess *successResult;
@property (strong, nonatomic, readwrite) JWTCodingResultTypeError *errorResult;
@end

@implementation JWTCodingResultType
- (instancetype)initWithSuccessResult:(JWTCodingResultTypeSuccess *)success {
    if (self = [super init]) {
        self.successResult = success;
    }
    return self;
}
- (instancetype)initWithErrorResult:(JWTCodingResultTypeError *)error {
    if (self = [super init]) {
        self.errorResult = error;
    }
    return self;
}

@end
