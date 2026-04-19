import { Body, Controller, Get, Param, 
         ParseUUIDPipe, Post, Req, UploadedFile, 
         UseGuards, UseInterceptors, 
    } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { userAvatarMulterOptions } from "src/common/utils/user-avatar-multer-options";
import { UserNameDto } from "dto/user-name.dto";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  UserData, UserProfile,
} from "datatype/user-profile.type";
import { UserProfileSwagger, UserDataSwagger } from "src/common/swagger/user-profile";
import { UserSearchData } from "datatype/user-search-data.type";
import { UserSearchDataSwagger } from "src/common/swagger/user-search-data";

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiResponse({
      status: 200,
      description: 'get users they names start with: ....',
      type:  [UserSearchDataSwagger]
    })
    @Get('search/:tofind')
    async searchUsers(@Req() req: RequestAndJwtUser, @Param('tofind') tofind: string): Promise<UserSearchData[]> {
        return await this.userService.searchUsers(req.user.id, tofind);
    }

    @ApiResponse({
      status: 200,
      description: 'get first 10 most ranked',
      type:  [UserDataSwagger]
    })
    @Get('leaders')
    async getAllLeaders(): Promise<UserData[]> {
        return await this.userService.getAllLeaders();
    }

    @ApiResponse({ type:  UserDataSwagger})
    @Get('profile')
    async myInfo(@Req() req: RequestAndJwtUser): Promise<UserData> {
        return await this.userService.myInfo(req.user.id);
    }

    @ApiResponse({ type:  UserProfileSwagger})
    @Get('profile/:id')
    async userInfo(
      @Req() req: RequestAndJwtUser, @Param('id', ParseUUIDPipe) userId: string
      ): Promise<UserProfile> {
        return await this.userService.userInfo(req.user.id, userId);
    }

    @ApiResponse({ type:  UserDataSwagger})
    @Post('avatar')
    @UseInterceptors(FileInterceptor('file', userAvatarMulterOptions))
    async upadateAvatar(
      @Req() req: RequestAndJwtUser, @UploadedFile() file: Express.Multer.File
      ): Promise<UserData> {
        return await this.userService.updateAvatar(file, req.user.id);
    }

    @ApiResponse({ type:  UserDataSwagger})
    @Post('name')
    async updateName(@Req() req: RequestAndJwtUser, @Body() name: UserNameDto): Promise<UserData> {
        return await this.userService.updateName(req.user.id, name.name) ;
    }
}
