import {Module, forwardRef} from "@nestjs/common";
import {GameController} from "./game.controller";
import {GameHttpService} from "./game.http.service";
import { GameWSService } from "./game.ws.service";
import { MatchMakingSystem } from "./match.making-system";
import { GameInvitations } from "./game.invitations";
import { WSModule } from "src/websocket/websocket.module";

@Module({
    imports: [
        forwardRef(() => WSModule),
    ],
    controllers: [GameController,],
    providers: [
        GameHttpService,
        GameWSService,
        MatchMakingSystem,
        GameInvitations,
    ],
    exports: [GameWSService,],
})
export class GameModule {}
