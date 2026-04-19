import { SetMetadata } from '@nestjs/common';

export const ROUTE_VISIBILITY_KEY = 'ROUTE_VISIBILITY_KEY';

export const RouteVisibilityType = {
    PUBLIC: 'Public',          // don't require jwt
    PROTECTED: 'Protected',    // require jwt, but not require twofa verified
    PRIVATE: 'Private',        // require both jwt and twofa verified
    NOTLOGEDIN: 'NotLogedIn',  // require no jwt
};
export type RouteVisibilityType = (typeof RouteVisibilityType)[keyof typeof RouteVisibilityType]

/*
** PUBLIC:     don't require jwt
** PROTECTED:  require jwt, but not require twofa verified
** PRIVATE:    require both jwt and twofa verified
** NOTLOGEDIN: require no jwt
*/
export const RouteVisibility = (...keys: RouteVisibilityType[]) => SetMetadata(ROUTE_VISIBILITY_KEY, keys);
