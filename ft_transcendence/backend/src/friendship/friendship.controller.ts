import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { AuthGuard } from "src/auth/auth.guard";
import { IdDto } from "dto/id.dto";
import { BlockedFriendship } from "datatype/blocked-friendship.type";
import { SentFriendship } from "datatype/sent-friendship.type";
import { ReceivedFriendship } from "datatype/received-friendship.type";
import { AcceptedFriendship } from "datatype/accepted-friendship.type";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { RouteVisibility, RouteVisibilityType } from "src/common/decorators/route-visibility.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AcceptedFriendshipSwagger } from "src/common/swagger/accepted-friendship";
import { BlockedFriendshipSwagger } from "src/common/swagger/blocked-friendship";
import { SentFriendshipSwagger } from "src/common/swagger/sent-friendship";
import { ReceivedFriendshipSwagger } from "src/common/swagger/received-friendship";

@ApiTags('Friendship')
@RouteVisibility(RouteVisibilityType.PRIVATE)
@UseGuards(AuthGuard)
@Controller('friendship')
export class FriendshipController {
    constructor(private friendship: FriendshipService) {}

    @ApiResponse({ description: 'number of' })
    @Get('accept/count')
    async countAllFriends(@Req() req: RequestAndJwtUser): Promise<number> {
        return await this.friendship.countAllFriends(req.user.id);
    }

    @ApiResponse({ type: [AcceptedFriendshipSwagger] })
    @Get('accept/all')
    async allFriends(@Req() req: RequestAndJwtUser): Promise<AcceptedFriendship[]> {
        return await this.friendship.allFriends(req.user.id);
    }

    @ApiResponse({ type: [AcceptedFriendshipSwagger] })
    @Get('accept/:part')
    async allFriendsByParts(
        @Req() req: RequestAndJwtUser, @Param('part', ParseIntPipe) part: number
        ): Promise<AcceptedFriendship[]> {
        return await this.friendship.allFriendsByParts(req.user.id, part);
    }

    @ApiResponse({ description: 'number of' })
    @Get('block/count')
    async countAllBlockedUsers(@Req() req: RequestAndJwtUser): Promise<number> {
        return this.friendship.countAllBlockedUsers(req.user.id);
    }

    @ApiResponse({ type: [BlockedFriendshipSwagger] })
    @Get('block/all')
    async allBlockedUsers(@Req() req: RequestAndJwtUser): Promise<BlockedFriendship[]> {
        return this.friendship.allBlockedUsers(req.user.id);
    }

    @ApiResponse({ type: [BlockedFriendshipSwagger] })
    @Get('block/:part')
    async allBlockedUsersByParts(
        @Req() req: RequestAndJwtUser, @Param('part', ParseIntPipe) part: number
        ): Promise<BlockedFriendship[]> {
        return this.friendship.allBlockedUsersByParts(req.user.id, part);
    }

    @ApiResponse({ description: 'number of' })
    @Get('request/sent/count')
    async countAllSentRequests(@Req() req: RequestAndJwtUser): Promise<number> {
        return await this.friendship.countAllSentRequests(req.user.id);
    }

    @ApiResponse({ type: [SentFriendshipSwagger] })
    @Get('request/sent/all')
    async allSentRequests(@Req() req: RequestAndJwtUser): Promise<SentFriendship[]> {
        return await this.friendship.allSentRequests(req.user.id);
    }

    @ApiResponse({ type: [SentFriendshipSwagger] })
    @Get('request/sent/:part')
    async allSentRequestsByParts(
        @Req() req: RequestAndJwtUser, @Param('part', ParseIntPipe) part: number
        ): Promise<SentFriendship[]> {
        return this.friendship.allSentRequestsByParts(req.user.id, part);
    }

    @ApiResponse({ description: 'number of' })
    @Get('request/received/count')
    async countAllReceivedRequests(@Req() req: RequestAndJwtUser): Promise<number> {
        return await this.friendship.countAllReceivedRequests(req.user.id);
    }

    @ApiResponse({ type: [ReceivedFriendshipSwagger] })
    @Get('request/received/all')
    async allReceivedRequests(@Req() req: RequestAndJwtUser): Promise<ReceivedFriendship[]> {
        return await this.friendship.allReceivedRequests(req.user.id);
    }

    @ApiResponse({ type: [ReceivedFriendshipSwagger] })
    @Get('request/received/:part')
    async allReceivedRequestsByParts(
        @Req() req: RequestAndJwtUser, @Param('part', ParseIntPipe) part: number
        ): Promise<ReceivedFriendship[]> {
        return this.friendship.allReceivedRequestsByParts(req.user.id, part);
    }

    @Post('request')
    async requestFriendship(@Req() req: RequestAndJwtUser, @Body() friend: IdDto): Promise<void> {
        return await this.friendship.requestFriendship(req.user.id, friend.id);
    }

    @Post('block')
    async blockUser(@Req() req: RequestAndJwtUser, @Body() user: IdDto): Promise<void> {
        return this.friendship.blockUser(req.user.id, user.id);
    }
    
    @Post('unblock')
    async unblockUser(@Req() req: RequestAndJwtUser, @Body() friendship: IdDto): Promise<void> {
        return this.friendship.unblockUser(req.user.id, friendship.id);
    }
    
    @Post('cancel')
    async cancelFriendshipRequest(@Req() req: RequestAndJwtUser, @Body() friendship: IdDto): Promise<void> {
        return await this.friendship.cancelFriendshipRequest(req.user.id, friendship.id);
    }

    @Post('accept')
    async acceptFriendship(@Req() req: RequestAndJwtUser, @Body() friendship: IdDto):Promise<void> {
        return await this.friendship.acceptFriendship(req.user.id, friendship.id);
    }

    @Post('reject')
    async rejectFriendship(@Req() req: RequestAndJwtUser, @Body() friendship: IdDto):Promise<void> {
        return await this.friendship.rejectFriendship(req.user.id, friendship.id);
    }

    @Post('remove')
    async removeFriendship(@Req() req: RequestAndJwtUser, @Body() friendship: IdDto):Promise<void> {
        return await this.friendship.removeFriendship(req.user.id, friendship.id);
    }
}
