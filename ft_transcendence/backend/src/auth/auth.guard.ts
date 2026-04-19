import { Injectable, CanActivate, UnauthorizedException,
         ExecutionContext, BadRequestException,
    } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from 'datatype/jwt.user.dto';
import { Reflector } from '@nestjs/core';
import { ROUTE_VISIBILITY_KEY, 
         RouteVisibilityType, 
    } from 'src/common/decorators/route-visibility.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService, private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();
        const response: Response = context.switchToHttp().getResponse<Response>();
        /** if routeVisibility is empty: default PRIVATE */
        const routeVisibility = this.reflector.getAllAndOverride<RouteVisibilityType[]>(
            ROUTE_VISIBILITY_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        ) || [RouteVisibilityType.PRIVATE];
        /* if is a public route no need to verify jwt */
        if (routeVisibility.includes(RouteVisibilityType.PUBLIC)) {
            return true;
        }

        let waitingTwofa: boolean;
        let requireNotLogedIn: boolean = false;
        try {
            const token = request.cookies['Bearer'];
            const { id, twofa }: JwtUser = this.jwt.verify(token);
            waitingTwofa = twofa;
            request['user'] = { id, twofa };
            /* if route require no jwt (no login) */
            if (routeVisibility.includes(RouteVisibilityType.NOTLOGEDIN)) {
                requireNotLogedIn = true;
            }
        }
        catch {
            /* if route require no jwt (no login) */
            if (routeVisibility.includes(RouteVisibilityType.NOTLOGEDIN)) {
                return true;
            }
            /** else (require login) */
            // redirect(response, '/login');
            throw new UnauthorizedException('Go to login before access this data');
        }
        if (requireNotLogedIn) {
            // redirect(response, '/user/profile');
            // throw new BadRequestException('You are already loged-in');
        }
        /** route require login + twofa verified */
        if (waitingTwofa && routeVisibility.includes(RouteVisibilityType.PRIVATE)) {
            // redirect(response, '/login/verify');
            throw new UnauthorizedException('Verify Two Factor');
        }
        /** else: route require login, but no twofa enabled */
        return true;
    }
}
