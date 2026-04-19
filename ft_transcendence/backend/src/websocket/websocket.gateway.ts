import { 
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection, OnGatewayDisconnect, 
    OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, 
    } from "@nestjs/websockets";
import { Server } from "socket.io";
import { WSService } from "./websocket.service";
import { SocketUser } from "datatype/socket-ws.type";
import { JwtService } from "@nestjs/jwt";
import { WSJwtAuthMiddleware } from "./jwt-auth-ws.middleware";
import { DmWsService } from "src/dm/dm.ws.service";
import { ChatWsService } from "src/chat/chat.ws.service";
import { Inject, ParseBoolPipe, UseFilters, UseGuards, UsePipes, ValidationPipe, forwardRef } from "@nestjs/common";
import { WsExceptionFilter } from "src/common/filters/ws-catch-exception.filter";
import { WsChatRoomCanReadGuard, WsChatRoomCanSendGuard } from "src/chat/chat.ws.guard";
import * as EVENTS from "src/common/constants/constants";
import { WsChatMessageDto, WsChatMessageHistoryDto } from "dto/chat-message.dto";
import { WsDmCanSendGuard, WsDmCanReadGuard } from "src/dm/dm.ws.guard";
import { ChatidDto } from "dto/chatid.dto";
import { GameWSService } from "src/game/game.ws.service";
import { IdDto } from "dto/id.dto";
import { ResInvitGameDto } from "dto/response-to-invit-game.dto";

@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@WebSocketGateway({
        cors: {
            credentials: true,
            origin: process.env.HOST_URI,
        },
    })
export class WSGateway implements  OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private wsService: WSService, private jwt: JwtService, private dm: DmWsService, 
        @Inject(forwardRef(() => GameWSService)) private game: GameWSService,
        @Inject(forwardRef(() => ChatWsService)) private chat: ChatWsService,
        ) {}

    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        server.use(WSJwtAuthMiddleware(this.jwt));
        this.game.onServerInit(server);
    }

    handleConnection(socket: SocketUser) {
        this.wsService.onConnect(socket);
        this.chat.onConnect(socket);
    }

    handleDisconnect(socket: SocketUser) {
        this.wsService.onDisconnect(socket);
        this.chat.onDisconnect(socket);
    }

    /** --- BEGIN: chat websocket --- */
    @UseGuards(WsChatRoomCanSendGuard)
    @SubscribeMessage(EVENTS.WS_CHAT_EVENT_MESSAGE)
    async wsChatNewMessage(
        @ConnectedSocket() socket: SocketUser, @MessageBody() message: WsChatMessageDto,
    ): Promise<void> {
        await this.chat.chatNewMessage(socket, message);
    }

    @UseGuards(WsChatRoomCanReadGuard)
    @SubscribeMessage(EVENTS.WS_CHAT_EVENT_MESSAGE_HISTORY)
    async wsChatMessageHistory(
        @ConnectedSocket() socket: SocketUser, @MessageBody() options: WsChatMessageHistoryDto,
        ): Promise<void> {
        const data = await this.chat.chatMessageHistory(options);
        socket.emit(EVENTS.WS_CHAT_EVENT_MESSAGE_HISTORY, data);
    }

    @UseGuards(WsChatRoomCanReadGuard)
    @SubscribeMessage(EVENTS.WS_CHAT_EVENT_JOIN)
    async wsChatJoinRoom(
            @ConnectedSocket() socket: SocketUser, @MessageBody() chat: ChatidDto,
        ): Promise<void> {
        const data = await this.chat.joinChatRoom(socket, chat.chatid);
        socket.emit(EVENTS.WS_CHAT_EVENT_JOIN, data);
    }

    /** ---- BEGIN: dm websocket ---- */
    @UseGuards(WsDmCanSendGuard)
    @SubscribeMessage(EVENTS.WS_DM_EVENT_MESSAGE)
    async wsDmMessage(
            @ConnectedSocket() socket: SocketUser, @MessageBody() message: WsChatMessageDto
        ): Promise<void> {
        const data = await this.dm.newWsMessage(socket, message);
        socket.to(message.chatid).emit(EVENTS.WS_DM_EVENT_MESSAGE, data);
        socket.emit(EVENTS.WS_DM_EVENT_MESSAGE, data);
    }

    @UseGuards(WsDmCanReadGuard)
    @SubscribeMessage(EVENTS.WS_DM_EVENT_MESSAGE_HISTORY)
    async wsDmMessageHistory(
            @ConnectedSocket() socket: SocketUser, @MessageBody() options: WsChatMessageHistoryDto,
        ): Promise<void> {
        const data = await this.dm.wsMessageHoistory(options);
        socket.emit(EVENTS.WS_DM_EVENT_MESSAGE_HISTORY, data);
    }

    @UseGuards(WsDmCanReadGuard)
    @SubscribeMessage(EVENTS.WS_DM_EVENT_JOIN)
    async wsDmMessageJoin(
            @ConnectedSocket() socket: SocketUser, @MessageBody() chat: ChatidDto,
        ): Promise<void> {
        const data = await this.dm.joinDmRoom(socket, chat.chatid);
        socket.emit(EVENTS.WS_DM_EVENT_JOIN, data);
    }

    /** ---- BEGIN: game websocket ---- */
    @SubscribeMessage(EVENTS.WS_GAME_EVENT_FIND_PEER)
    findPeer(@ConnectedSocket() socket: SocketUser): void {
        this.game.findPeer(socket);
    }

    @SubscribeMessage(EVENTS.WS_GAME_EVENT_CANCEL_FIND_PEER)
    cancelFindPeer(@ConnectedSocket() socket: SocketUser): void {
        this.game.cancelFindPeer(socket);
    }

    @SubscribeMessage(EVENTS.WS_GAME_EVENT_INVITE_GAME)
    async inviteToGame(@ConnectedSocket() socket: SocketUser, @MessageBody() id: IdDto): Promise<void> {
        await this.game.inviteToGame(socket, id.id);
    }

    @SubscribeMessage(EVENTS.WS_GAME_EVENT_INVITE_GAME_RESPONSE)
    async responseToInviteGame(@ConnectedSocket() socket: SocketUser, @MessageBody() res: ResInvitGameDto): Promise<void> {
        await this.game.responseToInviteGame(socket, res);
    }

    @SubscribeMessage(EVENTS.WS_GAME_EVENT_JOIN_GAME)
    async joinGame(@ConnectedSocket() socket: SocketUser, @MessageBody() id: IdDto): Promise<void> {
        await this.game.joinGame(socket, id.id);
    }

    @SubscribeMessage(EVENTS.WS_GAME_EVENT_LEAVE_GAME)
    leaveGame(@ConnectedSocket() socket: SocketUser, @MessageBody() id: IdDto): void {
        this.game.leaveGame(socket, id.id);
    }

    @SubscribeMessage(EVENTS.WS_GAME_EVENT_PADDEL)
    movePaddel(@ConnectedSocket() socket: SocketUser, @MessageBody() paddel: any): void {
        this.game.movePaddel(socket, paddel);
    }
}
