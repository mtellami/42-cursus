import {
        Body, Controller, Get, Param, Post, Query, Req,
        UploadedFile, UseGuards, UseInterceptors,
    } from "@nestjs/common";
import { ChatService } from "./chat.http.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateChatDto } from "dto/create-chat.dto";
import { ChangeChatPrivacyDto } from "dto/change-chat-privacy.dto";
import { ChangeChatPasswordDto } from "dto/change-chat-password.dto";
import { IdDto } from "dto/id.dto";
import { ChatRoles } from "src/common/decorators/chat-roles.decorator";
import { ChatMemberRole } from "@prisma/client";
import { ChatRoleGuard } from "./roles.http.guard";
import { MuteUserChatDto } from "dto/mute-user-chat.dto";
import { JoinChatDto } from "dto/join-chat.dto";
import { ChangeChatNameDto } from "dto/change-chat-name.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { chatAvatarMulterOptions } from "src/common/utils/chat-avatar-multer-options";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { RouteVisibility, RouteVisibilityType } from "src/common/decorators/route-visibility.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ChatData, ChatMemberData } from "datatype/chat.type";
import { ChatDataSwagger, ChatMemberDataSwagger, ChatSwagger } from "src/common/swagger/chat.type"

@ApiTags('Chat Rooms')
@Controller('chat')
@UseGuards(AuthGuard, ChatRoleGuard)
@RouteVisibility(RouteVisibilityType.PRIVATE)
@ChatRoles(ChatMemberRole.OWNER, ChatMemberRole.ADMIN)
export class ChatController {
    constructor(private chatService: ChatService) {}

    @ApiResponse({ type: [ChatDataSwagger] })
    @Get('all')
    @ChatRoles()
    async getAllChat(@Req() req: RequestAndJwtUser): Promise<ChatData[]> {
        return await this.chatService.getAllChat(req.user.id);
    }

    @ApiResponse({ type: [ChatSwagger] })
    @ChatRoles()
    @Get('search/:tofind')
    async search(@Req() req: RequestAndJwtUser, @Param('tofind') tofind: string): Promise<any> {
        return await this.chatService.search(req.user.id, tofind);
    }

    @ApiResponse({ type: [ChatMemberDataSwagger] })
    @Get('members')
    @ChatRoles(ChatMemberRole.OWNER, ChatMemberRole.ADMIN, ChatMemberRole.MEMBER)
    async getAllChatMembers(@Query('chatid') chatid: string): Promise<ChatMemberData[]> {
        return await this.chatService.getAllChatMembers(chatid);
    }

    @ApiResponse({ type: [ChatDataSwagger] })
    @Post('create')
    @ChatRoles()
    async createChat(@Req() req: RequestAndJwtUser, @Body() options: CreateChatDto): Promise<ChatData> {
        return await this.chatService.createChat(req.user.id, options);
    }

    @Post('join')
    @ChatRoles()
    async joinChatRoom(@Req() req: RequestAndJwtUser, @Body() options: JoinChatDto): Promise<void> {
        return await this.chatService.joinChatRoom(req.user.id, options);
    }

    @Post('leave')
    @ChatRoles(ChatMemberRole.OWNER, ChatMemberRole.ADMIN, ChatMemberRole.MEMBER)
    async leaveChatRoom(@Req() req: RequestAndJwtUser, @Query('chatid') chatid: string): Promise<void> {
        return await this.chatService.leaveChatRoom(req.user.id, chatid);
    }

    @Post('change/privacy')
    @ChatRoles(ChatMemberRole.OWNER)
    async changeChatPrivacy(
        @Query('chatid') chatid: string, @Body() options: ChangeChatPrivacyDto,
        ): Promise<void> {
        return await this.chatService.changeChatPrivacy(chatid, options);
    }

    @Post('change/name')
    @ChatRoles(ChatMemberRole.OWNER)
    async changeChatName(
        @Query('chatid') chatid: string, @Body() name: ChangeChatNameDto,
        ): Promise<void> {
        return await this.chatService.changeChatName(chatid, name.name);
    }

    @Post('change/avatar')
    @ChatRoles(ChatMemberRole.OWNER)
    @UseInterceptors(FileInterceptor('file', chatAvatarMulterOptions))
    async changeChatAvatar(
        @Query('chatid') chatid: string, @UploadedFile() file: Express.Multer.File,
        ): Promise<void> {
        return await this.chatService.changeChatAvatar(chatid, file);
    }

    @Post('password/change')
    @ChatRoles(ChatMemberRole.OWNER)
    async changeChatPassword(
        @Query('chatid') chatid: string, @Body() options: ChangeChatPasswordDto,
        ): Promise<void> {
        return await this.chatService.changeChatPassword(chatid, options.password);
    }

    @Post('password/remove')
    @ChatRoles(ChatMemberRole.OWNER)
    async removeChatPassword(
        @Query('chatid') chatid: string,
        ): Promise<void> {
        return await this.chatService.removeChatPassword(chatid);
    }

    @Post('setadmin')
    async setUserAsChatAdmin(
        @Query('chatid') chatid: string, @Body() userid: IdDto,
        ): Promise<void> {
        return await this.chatService.setUserAsChatAdmin(chatid, userid.id);
    }

    @Post('unsetadmin')
    @ChatRoles(ChatMemberRole.OWNER)
    async unsetUserAsChatAdmin(
        @Query('chatid') chatid: string, @Body() userid: IdDto,
        ): Promise<void> {
        return await this.chatService.unsetUserAsChatAdmin(chatid, userid.id);
    }

    @ChatRoles(ChatMemberRole.OWNER)
    @Post('kickAdmin')
    async kickAdminFromChat(
        @Query('chatid') chatid: string, @Body() userid: IdDto,
        ): Promise<void> {
        return await this.chatService.kickAdminFromChat(chatid, userid.id);
    }

    @ChatRoles(ChatMemberRole.OWNER)
    @Post('banAdmin')
    async banAdminChat(
        @Query('chatid') chatid: string, @Body() userid: IdDto,
        ): Promise<void> {
        return await this.chatService.banAdminChat(chatid, userid.id);
    }

    @ChatRoles(ChatMemberRole.OWNER)
		@Post('muteAdmin')
    async muteAdminChat(
        @Query('chatid') chatid: string, @Body() options: MuteUserChatDto,
        ): Promise<void> {
        return await this.chatService.muteAdminChat(chatid, options);
    }
 
		@Post('kickMember')
    async kickUserFromChat(
        @Query('chatid') chatid: string, @Body() userid: IdDto,
        ): Promise<void> {
        return await this.chatService.kickUserFromChat(chatid, userid.id);
    }

    @Post('banMember')
    async banUserChat(
        @Query('chatid') chatid: string, @Body() userid: IdDto,
        ): Promise<void> {
        return await this.chatService.banUserChat(chatid, userid.id);
    }

		@Post('muteMember')
    async muteUserChat(
        @Query('chatid') chatid: string, @Body() options: MuteUserChatDto,
        ): Promise<void> {
        return await this.chatService.muteUserChat(chatid, options);
    }
}
