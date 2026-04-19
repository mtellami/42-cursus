import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { TwofaService } from "./twofa.service";
import { AuthGuard } from "src/auth/auth.guard";
import { TwofaCodeDto } from "dto/twofa-code.dto";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { RouteVisibility, RouteVisibilityType } from "src/common/decorators/route-visibility.decorator";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Two Factor Authentication')
@RouteVisibility(RouteVisibilityType.PRIVATE)
@UseGuards(AuthGuard)
@Controller('twofa')
export class TwofaController {
    constructor(private readonly twofaService: TwofaService) {}

    @ApiResponse({ description: 'return qrcode image encoded base64' })
    @Post('enable')
    async enable(@Req() req: RequestAndJwtUser): Promise<string> {
        return await this.twofaService.enable(req.user.id);
    }

    @ApiOkResponse()
    @Post('enable/verify')
    async verifyEnableCode(@Req() req: RequestAndJwtUser, @Body() code: TwofaCodeDto): Promise<void> {
        return this.twofaService.verifyEnableCode(req.user.id, code.code);
    }

    @ApiOkResponse()
    @Post('disable')
    async verifyDisableCode(@Req() req: RequestAndJwtUser, @Body() code: TwofaCodeDto): Promise<void> {
        return await this.twofaService.disable(req.user.id, code.code);
    }
}
