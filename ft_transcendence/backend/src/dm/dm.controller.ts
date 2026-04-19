import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { DmService } from './dm.http.service';
import { AuthGuard } from "src/auth/auth.guard";
import { RouteVisibility, RouteVisibilityType } from "src/common/decorators/route-visibility.decorator";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { IdDto } from "dto/id.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DirectMessage } from "datatype/direct-message.type";
import { DirectMessageSwagger } from "src/common/swagger/direct-message.type";

@ApiTags('Direct Messages')
@RouteVisibility(RouteVisibilityType.PRIVATE)
@UseGuards(AuthGuard)
@Controller('dm')
export class DmController {
  constructor(private dmService: DmService) {}

  @ApiResponse({ type:  [DirectMessageSwagger] })
  @Get('all')
  async getAllDirectMessages(@Req() req: RequestAndJwtUser): Promise<DirectMessage[]> {
    return await this.dmService.getAllDirectMessages(req.user.id);
  }

  @ApiResponse({ type: DirectMessageSwagger })
  @Post('new')
  async newDirectMessage(
    @Req() req: RequestAndJwtUser, @Body() other: IdDto, 
  ): Promise<DirectMessage> {
    return await this.dmService.newDirectMessage(req.user.id ,other.id);
  }

}
