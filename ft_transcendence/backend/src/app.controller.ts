import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { RouteVisibility, RouteVisibilityType } from './common/decorators/route-visibility.decorator';

@ApiTags('Main: Login, Logout')
@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RouteVisibility(RouteVisibilityType.PROTECTED)
  @Post('logout')
  logout(@Res({passthrough: true}) res: Response) {
    res.clearCookie('Bearer');
    return { status: 200, message: 'logout success'};
  }
}
