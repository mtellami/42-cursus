import { Module, forwardRef } from "@nestjs/common";
import { ChatService } from "./chat.http.service";
import { ChatController } from "./chat.controller";
import { ChatRoleGuard } from "./roles.http.guard";
import { ChatWsService } from "./chat.ws.service";
import { WsChatRoomCanSendGuard, WsChatRoomCanReadGuard } from "./chat.ws.guard";
import { WSModule } from "src/websocket/websocket.module";
import { FriendshipModule } from "src/friendship/friendship.module";

@Module({
    imports: [
        FriendshipModule,
        forwardRef(() => WSModule),
    ],
    exports: [ChatWsService,],
    controllers: [
        ChatController,
    ],
    providers: [
        ChatService,
        ChatRoleGuard,
        WsChatRoomCanSendGuard,
        WsChatRoomCanReadGuard,
        ChatWsService,
    ]
})
export class ChatModule {}
