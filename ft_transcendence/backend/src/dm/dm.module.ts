import { Module } from "@nestjs/common";
import { DmController } from "./dm.controller";
import { DmService } from "./dm.http.service";
import { WsDmCanReadGuard, WsDmCanSendGuard } from "./dm.ws.guard";
import { FriendshipModule } from "src/friendship/friendship.module";
import { DmWsService } from "./dm.ws.service";

@Module({
    imports: [FriendshipModule, ],
    controllers: [DmController, ],
    providers: [
        DmService,
        DmWsService,
        WsDmCanSendGuard,
        WsDmCanReadGuard,
    ],
    exports: [
        DmWsService,
    ],
})
export class DmModule {}
