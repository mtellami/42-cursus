import {Controller, Get, Param, ParseUUIDPipe, Req, UseGuards} from "@nestjs/common";
import {GameHttpService} from "./game.http.service";
import { LiveGameType } from "datatype/live-game.type";
import { RequestAndJwtUser } from "datatype/request-with-jwtuser.type";
import { GameHistoryType } from "datatype/game-history.type";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GameHistorySwagger } from "src/common/swagger/game-history";
import { LiveGameSwagger } from "src/common/swagger/live-game";

@ApiTags('Game')
@UseGuards(AuthGuard)
@Controller('game')
export class GameController {
    constructor(private game: GameHttpService) {}

    @ApiResponse({
        description: 'get all live games, ordered by ssender or receiver level',
        type: [LiveGameSwagger]
    })
    @Get('alllivegames')
    async getAllLiveGames(): Promise<LiveGameType[]> {
        return this.game.getAllLiveGames();
    }

    @ApiResponse({
        description: 'if there is Live Game returned, else empty reponse',
        type: LiveGameSwagger
    })
    @Get('live')
    async getLiveGame(
        @Req() req: RequestAndJwtUser
    ): Promise<LiveGameType|undefined> {
        return this.game.getLiveGame(req.user.id);
    }

    @ApiResponse({
        description: 'if there is Live Game returned, else empty reponse',
        type: LiveGameSwagger
    })
    @Get('live/:userid')
    async getUserLiveGame(
        @Param('userid', ParseUUIDPipe) userid: string
    ): Promise<LiveGameType|undefined> {
        return this.game.getLiveGame(userid);
    }

    @ApiResponse({type: [GameHistorySwagger]})
    @Get('all')
    async getAllGameHistory(
        @Req() req: RequestAndJwtUser
    ): Promise<GameHistoryType[]> {
        return this.game.getAllGameHistory(req.user.id);
    }

    @ApiResponse({type: [GameHistorySwagger]})
    @Get('all/:userid')
    async getUserAllGameHistory(
        @Param('userid', ParseUUIDPipe) userid: string
    ): Promise<GameHistoryType[]> {
        return this.game.getAllGameHistory(userid);
    }

    @ApiResponse({type: [GameHistorySwagger]})
    @Get('winned')
    async getWinnedGameHistory(
        @Req() req: RequestAndJwtUser
    ): Promise<GameHistoryType[]> {
        return this.game.getWinnedGameHistory(req.user.id);
    }

    @ApiResponse({type: [GameHistorySwagger]})
    @Get('winned/:userid')
    async getUserWinnedGameHistory(
        @Param('userid', ParseUUIDPipe) userid: string
    ): Promise<GameHistoryType[]> {
        return this.game.getWinnedGameHistory(userid);
    }

    @ApiResponse({type: [GameHistorySwagger]})
    @Get('losed')
    async getLosedGameHistory(
        @Req() req: RequestAndJwtUser
    ): Promise<GameHistoryType[]> {
        return this.game.getLosedGameHistory(req.user.id);
    }

    @ApiResponse({type: [GameHistorySwagger]})
    @Get('losed/:userid')
    async getUserLosedGameHistory(
        @Param('userid', ParseUUIDPipe) userid: string
    ): Promise<GameHistoryType[]> {
        return this.game.getLosedGameHistory(userid);
    }
}
