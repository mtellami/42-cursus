import { Module, forwardRef } from "@nestjs/common";
import { ChatModule } from "src/chat/chat.module";
import { DmModule } from "src/dm/dm.module";
import { GameModule } from "src/game/game.module";
import { WSGateway } from "./websocket.gateway";
import { WSService } from "./websocket.service";

@Module({
    imports: [
        forwardRef(() => ChatModule),
        forwardRef(() => GameModule),
        DmModule,
    ],
    exports: [WSService,],
    providers: [
        WSService,
        WSGateway,
    ],
})
export class WSModule {}
