import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { Request, Response } from 'express';
import { JwtUser } from "datatype/jwt.user.dto";
import { JwtService } from "@nestjs/jwt";
import { setBearerCookie } from "../utils/response-utils";

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
    constructor(private jwt: JwtService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest<Request>();
        const response: Response = context.switchToHttp().getResponse<Response>();
        const jwtUser: JwtUser = request['user'];

        if (jwtUser && !jwtUser.twofa) {
            const token: string = this.jwt.sign(jwtUser);
            setBearerCookie(response, token);
        }

        return next.handle().pipe(map((data) => {
            return data;
        }));
    }
}
