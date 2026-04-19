import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { TwofaCodeDto } from "dto/twofa-code.dto";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { AuthGuard } from "./auth.guard";
import { RouteVisibility, RouteVisibilityType } from "src/common/decorators/route-visibility.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { setBearerCookie } from "src/common/utils/response-utils";

@ApiTags('Authentication')
@RouteVisibility(RouteVisibilityType.NOTLOGEDIN)
@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({ description: 'return { token: string, twofa: bool, signup: bool }'})
    @RouteVisibility(RouteVisibilityType.NOTLOGEDIN)
    @Get('login')
    async login(@Query('code') code: string, @Res({passthrough: true}) res: Response): Promise<any> {
        const data = await this.authService.login(code);
        setBearerCookie(res, data.token);
        return data;
    }

    @ApiResponse({ description: 'jwt token: { token: string }'})
    @RouteVisibility(RouteVisibilityType.PROTECTED)
    @Post('login/verify')
    async verifyTwofaLogin(
        @Res({passthrough: true}) res: Response, @Req() req: RequestAndJwtUser,
        @Body() twofaCode: TwofaCodeDto): Promise<{token: string}>
    {
        const token = await this.authService.verifyTwofaLogin(req.user.id, twofaCode.code);
        setBearerCookie(res, token);
        return { token };
    }

    @RouteVisibility(RouteVisibilityType.PROTECTED)
		@Get('token')
		token(@Req() req: RequestAndJwtUser) {
			return req.cookies['Bearer'];
		}
}
